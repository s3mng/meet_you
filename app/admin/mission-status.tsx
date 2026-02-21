import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { apiFetch } from '../../utils/api';
import { formatDate } from '../../utils/date';

export default function MissionStatusScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const teamId = params.teamId as string;
    const missionId = params.missionId as string;
    const title = params.title as string;
    const description = params.description as string;
    const createdAt = params.createdAt as string;

    const [groupStatuses, setGroupStatuses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchStatuses = async () => {
        if (!missionId || !teamId) return;
        try {
            setLoading(true);
            setErrorMsg('');

            // 1. Fetch group missions for this specific mission_id
            const missionGroupsData = await apiFetch(`/missions/${missionId}/groups`);

            // 2. We need group names. The leaderboard endpoint provides group names easily for the team.
            // (Alternatively we could fetch /teams/{team_id}/groups if it existed, or just map them from leaderboard)
            const leaderboardData = await apiFetch(`/leaderboard/${teamId}`);

            // 3. Map status data with group names
            const joinedData = missionGroupsData.map((mg: any) => {
                const lbEntry = leaderboardData.find((lb: any) => lb.group_id === mg.group_id);
                return {
                    ...mg,
                    group_name: lbEntry ? lbEntry.group_name : `조 #${mg.group_id}`,
                };
            });

            // Optional: Sort so that 'success' status shows up first or just sort by group_id
            joinedData.sort((a: any, b: any) => a.group_id - b.group_id);

            setGroupStatuses(joinedData);
        } catch (error) {
            console.error('Failed to fetch group mission statuses:', error);
            setErrorMsg('조별 수행 현황을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchStatuses();
        }, [missionId, teamId])
    );

    const handleEditMission = () => {
        router.push({ pathname: '/admin/edit-mission' as any, params: { teamId, missionId } });
    };

    const renderGroupItem = ({ item }: { item: any }) => {
        const isSuccess = item.status === 'success';

        return (
            <View style={styles.groupCard}>
                <View style={styles.groupInfo}>
                    <View style={styles.groupIconWrapper}>
                        <Ionicons name="people-outline" size={20} color="#6b7280" />
                    </View>
                    <Text style={styles.groupName}>{item.group_name}</Text>
                </View>
                <View style={[styles.statusBadge, isSuccess ? styles.statusBadgeSuccess : styles.statusBadgePending]}>
                    <Text style={[styles.statusText, isSuccess ? styles.statusTextSuccess : styles.statusTextPending]}>
                        {isSuccess ? '승인완료' : '대기중 / 진행중'}
                    </Text>
                </View>
            </View>
        );
    };

    const successCount = groupStatuses.filter(s => s.status === 'success').length;
    const totalCount = groupStatuses.length;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.pageHeader}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1f2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>미션 현황 조회</Text>
                    <TouchableOpacity onPress={handleEditMission} style={styles.rightButton}>
                        <Text style={styles.headerRightText}>수정</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#a855f7" />
                </View>
            ) : errorMsg ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    {/* Mission Overview */}
                    <View style={styles.missionOverview}>
                        <View style={styles.missionHeaderRow}>
                            <Text style={styles.missionTitle}>{title}</Text>
                        </View>
                        <Text style={styles.missionDescription}>{description}</Text>
                        <View style={styles.missionFooter}>
                            <Text style={styles.missionDate}>
                                등록일: {formatDate(createdAt)}
                            </Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.statBox}>
                                <Text style={styles.statValue}>{totalCount}</Text>
                                <Text style={styles.statLabel}>전체 조</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statBox}>
                                <Text style={[styles.statValue, { color: '#16a34a' }]}>{successCount}</Text>
                                <Text style={styles.statLabel}>완료 조</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statBox}>
                                <Text style={[styles.statValue, { color: '#ca8a04' }]}>{totalCount - successCount}</Text>
                                <Text style={styles.statLabel}>미완료/진행중</Text>
                            </View>
                        </View>
                    </View>

                    {/* Group Status List */}
                    <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>조별 수행 현황</Text>
                    </View>

                    <FlatList
                        data={groupStatuses}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderGroupItem}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>팀에 아직 조가 없거나 배정된 현황이 없습니다.</Text>
                            </View>
                        }
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f3f4f6', // gray-100
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
        paddingBottom: 12,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    rightButton: {
        padding: 8,
        marginRight: -8,
    },
    headerRightText: {
        color: '#a855f7', // purple-500
        fontWeight: '600',
        fontSize: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    container: {
        flex: 1,
    },
    missionOverview: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        marginBottom: 8,
    },
    missionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    missionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
        flex: 1,
    },
    missionDescription: {
        fontSize: 15,
        color: '#4b5563',
        lineHeight: 22,
        marginBottom: 12,
    },
    missionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    missionDate: {
        fontSize: 13,
        color: '#9ca3af',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#e5e7eb',
        marginHorizontal: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#6b7280',
    },
    listHeader: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#f9fafb',
    },
    listTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6b7280',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        gap: 8,
    },
    groupCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    groupInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    groupIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    statusBadgeSuccess: {
        backgroundColor: '#dcfce7', // green-100
    },
    statusBadgePending: {
        backgroundColor: '#f3f4f6', // gray-100
    },
    statusText: {
        fontSize: 13,
        fontWeight: '600',
    },
    statusTextSuccess: {
        color: '#16a34a', // green-600
    },
    statusTextPending: {
        color: '#6b7280', // gray-500
    },
    emptyContainer: {
        padding: 32,
        alignItems: 'center',
    },
    emptyText: {
        color: '#6b7280',
        fontSize: 14,
    }
});
