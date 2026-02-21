import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { apiFetch } from '../../utils/api';

export default function JoinClubScreen() {
    const router = useRouter();
    const [authCode, setAuthCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleJoinClub = async () => {
        if (!authCode.trim()) {
            Alert.alert('알림', '인증 코드를 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            await apiFetch('/teams/join', {
                method: 'POST',
                body: JSON.stringify({ auth_code: authCode }),
            });

            Alert.alert('성공', '클럽에 가입되었습니다!', [
                {
                    text: '확인',
                    onPress: () => {
                        router.back();
                    },
                },
            ]);
        } catch (error: any) {
            console.error('Failed to join club:', error);
            // In a real app we might parse specific 400 error codes
            Alert.alert('오류', '클럽 가입에 실패했습니다. 코드를 다시 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>팀에 가입하기</Text>
                <View style={{ width: 44 }} />
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <View style={[styles.iconBadge]}>
                                <Ionicons name="link" size={40} color="white" />
                            </View>
                            <Text style={styles.subtitle}>관리자에게 받은 인증코드를 입력하세요</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.inputLabel}>인증코드</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="예: ABC123"
                                value={authCode}
                                onChangeText={setAuthCode}
                                placeholderTextColor="#9ca3af"
                                autoCapitalize="characters"
                                autoCorrect={false}
                            />

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleJoinClub}
                                disabled={loading}
                                activeOpacity={0.8}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.submitButtonText}>확인</Text>
                                )}
                            </TouchableOpacity>

                            <View style={styles.guideContainer}>
                                <Text style={styles.guideTitle}>💡 안내</Text>
                                <Text style={styles.guideText}>• 인증코드는 대소문자를 구분합니다</Text>
                                <Text style={styles.guideText}>• 관리자 승인 없이 가입이 완료됩니다</Text>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
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
    },
    content: {
        flex: 1,
        padding: 24,
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 40,
    },
    iconBadge: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: '#ec4899', // pink-500 equivalent visually
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#ec4899',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#4b5563',
        textAlign: 'center',
    },
    formContainer: {
        gap: 12,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    input: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 4,
        textAlign: 'center',
        color: '#1f2937',
    },
    submitButton: {
        backgroundColor: '#ec4899',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#ec4899',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    guideContainer: {
        marginTop: 24,
        backgroundColor: '#fefce8', // yellow-50
        borderWidth: 1,
        borderColor: '#fef08a', // yellow-200
        borderRadius: 12,
        padding: 16,
    },
    guideTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#713f12', // yellow-900
        marginBottom: 8,
    },
    guideText: {
        fontSize: 13,
        color: '#713f12',
        marginBottom: 4,
    },
});
