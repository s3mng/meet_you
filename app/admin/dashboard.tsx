import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { apiFetch, GroupItem, TeamMember } from '../../utils/api';

export default function AdminDashboardScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Fallback if accessed directly
    const teamId = params.teamId ? Number(params.teamId) : null;
    const teamName = params.name || '알 수 없는 클럽';
    const authCode = params.authCode || '----';

    const [groups, setGroups] = useState<GroupItem[]>([]);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [creatingGroup, setCreatingGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const fetchData = async () => {
        if (!teamId) return;
        try {
            setLoading(true);

            // Fetch groups for the team
            const teamGroups: GroupItem[] = await apiFetch(`/teams/${teamId}/groups`);
            setGroups(teamGroups);

            // Fetch members from /teams/{team_id}/members
            const teamMembers: TeamMember[] = await apiFetch(`/teams/${teamId}/members`);
            setMembers(teamMembers);

        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            Alert.alert('오류', '데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [teamId])
    );

    const handleCreateGroup = async () => {
        if (!teamId) return;

        try {
            setCreatingGroup(true);
            // Create group API -> returns an array of groups, or just success
            // To support custom names, the current API spec only takes team_id
            // Let's check openapi again... GroupCreateRequest takes team_id.
            // Oh, the GroupCreateRequest schema only has: {"team_id": integer}
            // So we can't send a name. It likely auto-generates it (e.g., "1조", "2조").

            await apiFetch('/groups/', {
                method: 'POST',
                body: JSON.stringify({ team_id: teamId })
            });

            Alert.alert('성공', '새로운 조가 생성되었습니다.');
            fetchData(); // Refresh groups
        } catch (error) {
            console.error('Failed to create group:', error);
            Alert.alert('오류', '조 생성에 실패했습니다.');
        } finally {
            setCreatingGroup(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    const renderMember = ({ item }: { item: TeamMember }) => (
        <View style={styles.memberRow}>
            <View style={styles.memberAvatar}>
                <Ionicons name="person" size={20} color="#6b7280" />
            </View>
            <View style={styles.memberInfo}>
                <View style={styles.memberNameRow}>
                    <Text style={styles.memberName}>{item.user_name}</Text>
                    {item.role === 'admin' && (
                        <View style={styles.adminBadge}>
                            <Text style={styles.adminBadgeText}>관리자</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.memberDesc}>
                    {item.user_hakbun}학번
                </Text>
            </View>
        </View>
    );

    const renderGroup = ({ item, index }: { item: GroupItem, index: number }) => (
        <View style={styles.groupCard}>
            <View style={styles.groupHeader}>
                <Text style={styles.groupName}>{item.name || `${index + 1}조`}</Text>
                <Ionicons name="people" size={20} color="#8b5cf6" />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>관리자 대시보드</Text>
                <View style={{ width: 44 }} /> {/* placeholder for flex balance */}
            </View>

            <FlatList
                data={[{ key: 'dashboard' }]}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.container}
                renderItem={() => (
                    <>
                        {/* Club Info Section */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="shield-checkmark" size={24} color="#a855f7" />
                                <Text style={styles.cardTitle}>내 클럽 정보</Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>클럽 이름</Text>
                                <Text style={styles.infoValue}>{teamName}</Text>
                            </View>

                            <View style={styles.infoRowBlock}>
                                <Text style={styles.infoLabel}>가입 코드</Text>
                                <View style={styles.codeContainer}>
                                    <Text style={styles.codeValue}>{authCode}</Text>
                                </View>
                            </View>

                            <Text style={styles.helperText}>
                                회원들에게 이 가입 코드를 전달하여 클럽에 가입하도록 안내해주세요.
                            </Text>
                        </View>

                        {/* Actions Section */}
                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push({ pathname: '/admin/team-missions' as any, params: { teamId: params.teamId, name: teamName, authCode } })}
                            activeOpacity={0.8}
                        >
                            <View style={styles.actionCardLeft}>
                                <View style={[styles.iconContainer, { backgroundColor: '#f3e8ff' }]}>
                                    <Ionicons name="list" size={24} color="#a855f7" />
                                </View>
                                <View>
                                    <Text style={styles.actionTitle}>미션 관리</Text>
                                    <Text style={styles.actionDesc}>팀 미션을 추가하고 배점을 설정하세요</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                        </TouchableOpacity>

                        {/* Groups Management Section */}
                        <View style={styles.card}>
                            <View style={styles.cardHeaderSpaceBetween}>
                                <View style={styles.cardHeaderLeft}>
                                    <Ionicons name="grid-outline" size={24} color="#a855f7" />
                                    <Text style={styles.cardTitle}>조 관리 [{groups.length}]</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.createGroupBtn}
                                    onPress={handleCreateGroup}
                                    disabled={creatingGroup}
                                >
                                    {creatingGroup ? (
                                        <ActivityIndicator size="small" color="#ffffff" />
                                    ) : (
                                        <>
                                            <Ionicons name="add" size={16} color="#ffffff" />
                                            <Text style={styles.createGroupBtnText}>조 생성</Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>

                            {loading ? (
                                <ActivityIndicator size="small" color="#a855f7" style={{ marginVertical: 20 }} />
                            ) : groups.length === 0 ? (
                                <View style={styles.emptyBox}>
                                    <Text style={styles.emptyBoxText}>아직 생성된 조가 없습니다.</Text>
                                </View>
                            ) : (
                                <View style={styles.groupsGrid}>
                                    {groups.map((group, index) => (
                                        <View key={group.id} style={styles.groupCardWrapper}>
                                            <View style={styles.groupCard}>
                                                <View style={styles.groupHeader}>
                                                    <Text style={styles.groupName}>{group.name || `${index + 1}조`}</Text>
                                                    <Ionicons name="people" size={20} color="#8b5cf6" />
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Members Section */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="people-circle-outline" size={24} color="#a855f7" />
                                <Text style={styles.cardTitle}>회원 목록 [{members.length}]</Text>
                            </View>

                            {loading ? (
                                <ActivityIndicator size="small" color="#a855f7" style={{ marginVertical: 20 }} />
                            ) : members.length === 0 ? (
                                <View style={styles.emptyBox}>
                                    <Text style={styles.emptyBoxText}>참여중인 회원이 없습니다.</Text>
                                </View>
                            ) : (
                                <View style={styles.membersList}>
                                    {members.map(member => (
                                        <View key={member.id} style={styles.memberRow}>
                                            <View style={styles.memberAvatar}>
                                                <Ionicons name="person" size={20} color="#6b7280" />
                                            </View>
                                            <View style={styles.memberInfo}>
                                                <View style={styles.memberNameRow}>
                                                    <Text style={styles.memberName}>{member.user_name}</Text>
                                                    {member.role === 'admin' && (
                                                        <View style={styles.adminBadge}>
                                                            <Text style={styles.adminBadgeText}>관리자</Text>
                                                        </View>
                                                    )}
                                                </View>
                                                <Text style={styles.memberDesc}>
                                                    {member.user_hakbun}학번
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                        <View style={{ height: 40 }} />
                    </>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f3f4f6', // gray-100
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    container: {
        padding: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    cardHeaderSpaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
    },
    infoRow: {
        marginBottom: 16,
    },
    infoRowBlock: {
        marginBottom: 16,
    },
    infoLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 8,
    },
    infoValue: {
        fontSize: 18,
        color: '#1f2937',
        fontWeight: '600',
    },
    codeContainer: {
        backgroundColor: '#f5f3ff', // violet-50
        padding: 20,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ddd6fe', // violet-200
        alignItems: 'center',
    },
    codeValue: {
        fontSize: 32,
        fontWeight: '900',
        color: '#8b5cf6', // violet-500
        letterSpacing: 4,
    },
    helperText: {
        fontSize: 13,
        color: '#6b7280',
        lineHeight: 20,
        marginTop: 8,
        textAlign: 'center',
        paddingHorizontal: 8,
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    actionCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 4,
    },
    actionDesc: {
        fontSize: 14,
        color: '#6b7280',
    },
    createGroupBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8b5cf6', // violet-500
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 4,
    },
    createGroupBtnText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14,
    },
    emptyBox: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#d1d5db',
    },
    emptyBoxText: {
        color: '#9ca3af',
        fontSize: 14,
    },
    groupsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
    },
    groupCardWrapper: {
        width: '50%',
        paddingHorizontal: 6,
        marginBottom: 12,
    },
    groupCard: {
        backgroundColor: '#fdf4ff', // fuchsia-50
        borderWidth: 1,
        borderColor: '#f5d0fe', // fuchsia-200
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    groupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    groupName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#86198f', // fuchsia-800
    },
    membersList: {
        gap: 12,
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    memberInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    memberNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 2,
    },
    memberName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    adminBadge: {
        backgroundColor: '#fee2e2', // red-100
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    adminBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#b91c1c', // red-700
    },
    memberDesc: {
        fontSize: 13,
        color: '#6b7280',
    }
});

