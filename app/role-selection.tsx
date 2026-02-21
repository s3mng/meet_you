import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { apiFetch } from '../utils/api';

export default function RoleSelectionScreen() {
    const router = useRouter();
    const [loadingAdmin, setLoadingAdmin] = React.useState(false);

    const handleAdminSelect = async () => {
        try {
            setLoadingAdmin(true);
            const myTeams = await apiFetch('/teams/me');

            // Find a team where the user is an admin
            const adminTeam = myTeams.find((team: any) => team.my_role === 'admin');

            if (adminTeam) {
                // Navigate to admin dashboard with the team details
                router.push({
                    pathname: '/admin/dashboard',
                    params: { teamId: adminTeam.id, authCode: adminTeam.auth_code, name: adminTeam.name },
                } as any);
            } else {
                // User is not an admin of any team, go to create club screen
                router.push('/admin/create-club' as any);
            }
        } catch (error) {
            console.error('Error checking admin status', error);
            Alert.alert('오류', '관리자 정보를 불러오는데 실패했습니다.');
        } finally {
            setLoadingAdmin(false);
        }
    };

    const handleParticipantSelect = () => {
        router.push('/participant/clubs' as any);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>환영합니다! 👋</Text>
                    <Text style={styles.subtitle}>역할을 선택해주세요</Text>
                </View>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={[styles.card, styles.adminCard]}
                        onPress={handleAdminSelect}
                        disabled={loadingAdmin}
                        activeOpacity={0.8}
                    >
                        <View style={styles.cardContent}>
                            <View style={[styles.iconContainer, styles.adminIconBg]}>
                                {loadingAdmin ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Ionicons name="key-outline" size={24} color="white" />
                                )}
                            </View>
                            <View style={styles.textContent}>
                                <Text style={styles.cardTitle}>관리자</Text>
                                <Text style={styles.cardDesc}>팀을 만들고 멤버를 관리합니다</Text>
                                <View style={styles.bulletList}>
                                    <Text style={styles.bulletText}>• 팀 생성 및 인증코드 발급</Text>
                                    <Text style={styles.bulletText}>• 멤버 승인 및 관리</Text>
                                    <Text style={styles.bulletText}>• 미션 등록 및 채점</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.card, styles.participantCard]}
                        onPress={handleParticipantSelect}
                        disabled={loadingAdmin} // prevent tapping while admin is fetching
                        activeOpacity={0.8}
                    >
                        <View style={styles.cardContent}>
                            <View style={[styles.iconContainer, styles.participantIconBg]}>
                                <Ionicons name="people-outline" size={24} color="white" />
                            </View>
                            <View style={styles.textContent}>
                                <Text style={styles.cardTitle}>참여자</Text>
                                <Text style={styles.cardDesc}>인증코드로 팀에 가입합니다</Text>
                                <View style={styles.bulletList}>
                                    <Text style={styles.bulletText}>• 인증코드로 팀 가입</Text>
                                    <Text style={styles.bulletText}>• 밥약 매칭 참여</Text>
                                    <Text style={styles.bulletText}>• 미션 수행 및 제출</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={async () => {
                        try {
                            // Clear token from SecureStore or AsyncStorage
                            // Assuming we can just import from expo-secure-store directly or clear AsyncStorage
                            const SecureStore = require('expo-secure-store');
                            await SecureStore.deleteItemAsync('jwt_token');
                        } catch (e) {
                            console.error('Logout error', e);
                        }
                        router.replace('/login');
                    }}
                >
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#4b5563',
    },
    optionsContainer: {
        gap: 16,
    },
    card: {
        borderWidth: 2,
        borderRadius: 16,
        padding: 24,
        backgroundColor: '#ffffff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    adminCard: {
        borderColor: '#a855f7', // purple-500
    },
    participantCard: {
        borderColor: '#ec4899', // pink-500
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    adminIconBg: {
        backgroundColor: '#a855f7',
    },
    participantIconBg: {
        backgroundColor: '#ec4899',
    },
    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 12,
    },
    bulletList: {
        gap: 4,
    },
    bulletText: {
        fontSize: 12,
        color: '#6b7280', // gray-500
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 8,
    },
    logoutText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ef4444',
    }
});
