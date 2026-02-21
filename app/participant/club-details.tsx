import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { apiFetch } from '../../utils/api';

export default function ClubDetailsScreen() {
    const router = useRouter();
    const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

    const [teamMissions, setTeamMissions] = useState<any[]>([]);
    const [groupMissions, setGroupMissions] = useState<any[]>([]);
    const [rankInfo, setRankInfo] = useState<{ rank: number; points: number; groupName: string } | null>(null);
    const [groupId, setGroupId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchClubDetails = async () => {
        if (!id) return;
        let currentStep = 'init';
        try {
            setLoading(true);
            setErrorMsg('');

            currentStep = 'groups/me';
            const myGroups = await apiFetch('/groups/me');
            const myGroup = myGroups.find((g: any) => g.team_id === Number(id));

            if (!myGroup) {
                setErrorMsg('해당 팀에 아직 소속된 조(그룹)가 없습니다.');
                setLoading(false);
                return;
            }

            const groupId = myGroup.id;
            const groupName = myGroup.name;
            setGroupId(groupId);

            // Fetch base team missions (content)
            currentStep = `teams/${id}/missions`;
            const teamMissionsData = await apiFetch(`/teams/${id}/missions`);
            setTeamMissions(teamMissionsData);

            // Fetch group missions (status wrapper)
            currentStep = `groups/${groupId}/missions`;
            let groupMissionsData: any[] = [];
            try {
                groupMissionsData = await apiFetch(`/groups/${groupId}/missions`);
                // If it returns an object with detail, it might not throw but we should handle it
                if (!Array.isArray(groupMissionsData) && (groupMissionsData as any).detail) {
                    throw new Error((groupMissionsData as any).detail);
                }
            } catch (e) {
                console.warn('Failed to fetch group missions, proceeding with empty array', e);
            }
            setGroupMissions(Array.isArray(groupMissionsData) ? groupMissionsData : []);

            currentStep = `leaderboard/${id}`;
            const leaderboardData = await apiFetch(`/leaderboard/${id}`);

            if (Array.isArray(leaderboardData)) {
                leaderboardData.sort((a: any, b: any) => b.points - a.points);

                const myRankIndex = leaderboardData.findIndex((entry: any) => entry.group_id === groupId);
                if (myRankIndex !== -1) {
                    setRankInfo({
                        rank: myRankIndex + 1,
                        points: leaderboardData[myRankIndex].points,
                        groupName: groupName
                    });
                } else {
                    setRankInfo({
                        rank: leaderboardData.length > 0 ? leaderboardData.length + 1 : 1,
                        points: 0,
                        groupName: groupName
                    });
                }
            } else {
                setRankInfo({
                    rank: 1,
                    points: 0,
                    groupName: groupName
                });
            }

        } catch (error: any) {
            console.error(`Failed to fetch club details at step [${currentStep}]:`, error);
            const detail = error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
            setErrorMsg(`정보를 불러오는데 실패했습니다.\n\n[진행 단계: ${currentStep}]\n[상세 오류]\n${detail}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClubDetails();
    }, [id]);

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="list-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>아직 등록된 미션이 없습니다.</Text>
            <Text style={styles.emptySubText}>운영자가 미션을 추가하면 이곳에 표시됩니다.</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.pageHeader}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1f2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{name || '클럽 미션'}</Text>
                    <View style={{ width: 40 }} />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.pageTitle}>미션</Text>
                    <Text style={styles.pageSubtitle}>조 미션을 수행하고 점수를 획득하세요</Text>
                </View>
            </View>

            {errorMsg ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    {/* Mission List */}
                    <FlatList
                        data={teamMissions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            // Find corresponding group mission to determine status
                            const groupMission = groupMissions.find(gm => (gm.mission_id ?? gm.id) === item.id);
                            // If not found or status not success, consider it ongoing/pending
                            const isSuccess = groupMission?.status === 'success';

                            return (
                                <TouchableOpacity
                                    style={[styles.missionCard, isSuccess ? styles.missionCardSuccess : styles.missionCardOngoing]}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        if (!isSuccess && groupId !== null) {
                                            router.push(`/participant/mission-submit?missionId=${item.id}&groupId=${groupId}` as any);
                                        }
                                    }}
                                >
                                    <View style={styles.missionHeader}>
                                        <Text style={styles.missionTitle}>
                                            {item.title}
                                        </Text>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                isSuccess ? styles.statusBadgeSuccess : styles.statusBadgePending,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.statusText,
                                                    isSuccess ? styles.statusTextSuccess : styles.statusTextPending,
                                                ]}
                                            >
                                                {isSuccess ? '완료' : '진행중'}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.categoryRow}>
                                        <View style={styles.categoryTag}>
                                            <Text style={styles.categoryTagText}>팀 미션</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.missionDescription} numberOfLines={2}>{item.description}</Text>

                                    {item.model_url && (
                                        <TouchableOpacity
                                            style={styles.modelButton}
                                            activeOpacity={0.8}
                                            onPress={() => router.push(`/participant/model-viewer?url=${item.model_url}`)}
                                        >
                                            <Ionicons name="cube-outline" size={18} color="#ffffff" />
                                            <Text style={styles.modelButtonText}>3D 모델 보기</Text>
                                        </TouchableOpacity>
                                    )}

                                    <View style={styles.missionFooter}>
                                        <View style={styles.deadlineContainer}>
                                            <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                                            <Text style={styles.deadlineText}>
                                                등록일: {new Date(item.created_at).toLocaleDateString()}
                                            </Text>
                                        </View>
                                        {isSuccess && (
                                            <Text style={styles.successMarker}>✓ 승인완료</Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        contentContainerStyle={[
                            styles.listContent,
                            teamMissions.length === 0 && !loading && styles.listEmpty,
                        ]}
                        ListEmptyComponent={!loading ? renderEmptyState : null}
                        refreshing={loading}
                        onRefresh={fetchClubDetails}
                    />

                    {/* Bottom Score Box imitating example/MissionList.tsx */}
                    {rankInfo && (
                        <View style={styles.bottomScoreContainer}>
                            <View style={styles.scoreBox}>
                                <View style={styles.scoreRow}>
                                    <View>
                                        <Text style={styles.scoreTitle}>내 조 ({rankInfo.groupName}) 점수</Text>
                                        <Text style={styles.scoreValue}>{rankInfo.points}점</Text>
                                    </View>
                                    <View style={styles.scoreRight}>
                                        <Text style={styles.scoreTitle}>현재 순위</Text>
                                        <Text style={styles.scoreValue}>{rankInfo.rank}등</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9fafb', // gray-50
    },
    pageHeader: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4b5563',
    },
    headerTextContainer: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
    },
    pageSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        gap: 12,
        paddingBottom: 24,
    },
    listEmpty: {
        flex: 1,
        justifyContent: 'center',
    },
    errorContainer: {
        margin: 16,
        padding: 16,
        backgroundColor: '#fee2e2',
        borderRadius: 12,
        alignItems: 'center',
    },
    errorText: {
        color: '#b91c1c',
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: '600',
        color: '#4b5563',
    },
    emptySubText: {
        marginTop: 8,
        fontSize: 14,
        color: '#9ca3af',
        textAlign: 'center',
    },
    // Mission Card matched to example
    missionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
    },
    missionCardOngoing: {
        borderWidth: 2,
        borderColor: '#e9d5ff', // purple-200
    },
    missionCardSuccess: {
        backgroundColor: '#f0fdf4', // green-50
        borderWidth: 1,
        borderColor: '#bbf7d0', // green-200
    },
    missionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    missionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        flex: 1,
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    categoryTag: {
        backgroundColor: '#f3e8ff', // purple-100
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    categoryTagText: {
        fontSize: 12,
        color: '#7e22ce', // purple-700
    },
    missionDescription: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 12,
        lineHeight: 20,
    },
    missionFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    deadlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    deadlineText: {
        fontSize: 12,
        color: '#6b7280',
    },
    successMarker: {
        fontSize: 12,
        color: '#16a34a', // green-600
        fontWeight: '500',
    },
    // Status Badges matched to example
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginLeft: 8,
    },
    statusBadgePending: {
        backgroundColor: '#ffedd5', // orange-100
    },
    statusBadgeSuccess: {
        backgroundColor: '#dcfce7', // green-100
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    statusTextPending: {
        color: '#c2410c', // orange-700
    },
    statusTextSuccess: {
        color: '#15803d', // green-700
    },

    // Bottom Score Box matched to example
    bottomScoreContainer: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    scoreBox: {
        backgroundColor: '#faf5ff', // purple-50
        borderWidth: 1,
        borderColor: '#e9d5ff', // purple-200
        borderRadius: 12,
        padding: 16,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    scoreRight: {
        alignItems: 'flex-end',
    },
    scoreTitle: {
        fontSize: 14,
        color: '#4c1d95', // purple-900
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#9333ea', // purple-600
    },
    modelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4f46e5', // indigo-600
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 4,
        marginBottom: 12,
        gap: 8,
    },
    modelButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
});
