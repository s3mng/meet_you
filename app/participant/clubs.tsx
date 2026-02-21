import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { apiFetch } from '../../utils/api';
import { formatDate } from '../../utils/date';

export default function ParticipantClubsScreen() {
    const router = useRouter();
    const [clubs, setClubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchClubs = async () => {
        try {
            setLoading(true);
            const myTeams = await apiFetch('/teams/me');

            // Filter out the ones where user is admin
            const joinedClubs = myTeams.filter((team: any) => team.my_role !== 'admin');
            setClubs(joinedClubs);
        } catch (error) {
            console.error('Failed to fetch user clubs:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchClubs();
        }, [])
    );

    const handleJoinClub = () => {
        router.push('/participant/join-club' as any);
    };

    const handleClubPress = (club: any) => {
        router.push({ pathname: '/participant/club-details' as any, params: { id: club.id, name: club.name } });
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
                <Ionicons name="school-outline" size={48} color="#c084fc" />
            </View>
            <Text style={styles.emptyText}>참여 중인 팀이 없습니다</Text>
            <Text style={styles.emptySubText}>오른쪽 상단의 + 버튼을 눌러서{'\n'}인증코드로 새로운 팀에 가입해보세요!</Text>
        </View>
    );

    const renderClubItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.clubCard}
            activeOpacity={0.7}
            onPress={() => handleClubPress(item)}
        >
            <View style={styles.clubIcon}>
                <Ionicons name="people" size={24} color="#8b5cf6" />
            </View>
            <View style={styles.clubInfo}>
                <Text style={styles.clubName}>{item.name}</Text>
                <Text style={styles.clubMeta}>가입일: {formatDate(item.created_at)}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.heroHeader}>
                <View style={styles.heroTopRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.heroButton}>
                        <Ionicons name="arrow-back" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleJoinClub} style={styles.heroButtonAdd}>
                        <Ionicons name="add" size={26} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.heroContent}>
                    <Text style={styles.heroSubtitle}>bobyak • 참여자 모드</Text>
                    <Text style={styles.heroTitle}>환영합니다! 👋</Text>
                    <Text style={styles.heroDescription}>내 클럽 미션과 활동을 확인해보세요</Text>
                </View>
            </View>

            <View style={styles.container}>
                <FlatList
                    data={clubs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderClubItem}
                    contentContainerStyle={[
                        styles.listContent,
                        clubs.length === 0 && styles.listEmpty
                    ]}
                    ListEmptyComponent={!loading ? renderEmptyState : null}
                    refreshing={loading}
                    onRefresh={fetchClubs}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9fafb', // gray-50
    },
    heroHeader: {
        backgroundColor: '#9333ea', // purple-600 (approximating the gradient look from Home.tsx)
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#9333ea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
        position: 'relative',
        zIndex: 10,
    },
    heroTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    heroButton: {
        padding: 8,
        marginLeft: -8,
    },
    heroButtonAdd: {
        padding: 8,
        marginRight: -8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        overflow: 'hidden',
    },
    heroContent: {
        paddingHorizontal: 24,
        marginTop: 16,
    },
    heroSubtitle: {
        color: '#e9d5ff', // purple-200
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    heroTitle: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '700',
    },
    heroDescription: {
        color: '#f3e8ff', // purple-100
        fontSize: 14,
        marginTop: 6,
        opacity: 0.9,
    },
    container: {
        flex: 1,
    },
    listContent: {
        padding: 20,
        gap: 16,
        paddingTop: 24,
    },
    listEmpty: {
        flex: 1,
        justifyContent: 'center',
    },
    clubCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    clubIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#f3e8ff', // purple-100
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    clubInfo: {
        flex: 1,
    },
    clubName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 4,
    },
    clubMeta: {
        fontSize: 13,
        color: '#6b7280',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: -40, // offset hero header height conceptually
    },
    emptyIconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f3e8ff', // purple-100
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 8,
    },
    emptySubText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 22,
    },
});
