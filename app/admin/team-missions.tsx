import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { apiFetch } from '../../utils/api';
import { formatDate } from '../../utils/date';

export default function AdminTeamMissionsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const teamId = params.teamId as string;
    const teamName = params.name as string;

    const [missions, setMissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchMissions = async () => {
        if (!teamId) return;
        try {
            setLoading(true);
            setErrorMsg('');
            // GET /api/teams/{team_id}/missions
            const data = await apiFetch(`/teams/${teamId}/missions`);
            setMissions(data);
        } catch (error) {
            console.error('Failed to fetch team missions:', error);
            setErrorMsg('미션을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchMissions();
        }, [teamId])
    );

    const handleBack = () => {
        router.back();
    };

    const handleCreateMission = () => {
        router.push({ pathname: '/admin/edit-mission' as any, params: { teamId } });
    };

    const handleEditMission = (missionId: number) => {
        router.push({ pathname: '/admin/edit-mission' as any, params: { teamId, missionId } });
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>등록된 미션이 없습니다.</Text>
            <Text style={styles.emptySubText}>미션을 추가하고 팀원들에게 공유해보세요!</Text>
        </View>
    );

    const renderMissionItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                style={styles.missionCard}
                activeOpacity={0.7}
                onPress={() => router.push({
                    pathname: '/admin/mission-status' as any,
                    params: {
                        teamId,
                        missionId: item.id.toString(),
                        title: item.title,
                        description: item.description,
                        createdAt: item.created_at
                    }
                })}
            >
                <View style={styles.missionHeader}>
                    <Text style={styles.missionTitle} numberOfLines={1}>{item.title}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </View>

                <View style={styles.categoryRow}>
                    <View style={styles.categoryTag}>
                        <Text style={styles.categoryTagText}>팀 미션</Text>
                    </View>
                    {item.points ? (
                        <View style={styles.pointsTag}>
                            <Ionicons name="star" size={12} color="#ca8a04" />
                            <Text style={styles.pointsTagText}>{item.points}점</Text>
                        </View>
                    ) : null}
                </View>

                <Text style={styles.missionDescription} numberOfLines={2}>{item.description}</Text>

                <View style={styles.missionFooter}>
                    <View style={styles.deadlineContainer}>
                        <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                        <Text style={styles.deadlineText}>
                            작성일: {formatDate(item.created_at)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.pageHeader}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1f2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{teamName || '팀 미션'}</Text>
                    <View style={{ width: 40 }} />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.pageTitle}>미션 관리</Text>
                    <Text style={styles.pageSubtitle}>모든 조가 수행할 팀 전체 미션을 생성하세요</Text>
                </View>
            </View>

            {errorMsg ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <FlatList
                        data={missions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderMissionItem}
                        contentContainerStyle={[
                            styles.listContent,
                            missions.length === 0 && !loading && styles.listEmpty,
                        ]}
                        ListEmptyComponent={!loading ? renderEmptyState : null}
                        refreshing={loading}
                        onRefresh={fetchMissions}
                    />

                    <View style={styles.bottomContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={handleCreateMission}>
                            <Ionicons name="add-circle-outline" size={20} color="#ffffff" style={{ marginRight: 8 }} />
                            <Text style={styles.addButtonText}>미션 추가하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
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
    missionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    missionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    pointsTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fef3c7', // amber-100
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    pointsTagText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#b45309', // amber-700
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
    bottomContainer: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#a855f7', // purple-500
        paddingVertical: 14,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    }
});
