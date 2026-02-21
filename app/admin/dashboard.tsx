import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminDashboardScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Fallback if accessed directly
    const teamName = params.name || '알 수 없는 클럽';
    const authCode = params.authCode || '----';

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>관리자 대시보드</Text>
                <View style={{ width: 44 }} /> {/* placeholder for flex balance */}
            </View>

            <View style={styles.container}>
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
                            <Text style={styles.actionDesc}>팀 미션을 추가하고 관리하세요</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </TouchableOpacity>

                {/* Additional dashboard features can go here later */}
                <View style={styles.card}>
                    <View style={styles.placeholderContainer}>
                        <Ionicons name="construct-outline" size={32} color="#9ca3af" />
                        <Text style={styles.placeholderText}>더 많은 관리 기능은 곧 추가됩니다!</Text>
                    </View>
                </View>
            </View>
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
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
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
    placeholderContainer: {
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 32,
        backgroundColor: '#f9fafb', // gray-50
        borderRadius: 16,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#d1d5db',
    },
    placeholderText: {
        color: '#6b7280',
        fontSize: 15,
        fontWeight: '500',
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        marginTop: 16,
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
    }
});
