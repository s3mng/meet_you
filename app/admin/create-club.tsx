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

export default function CreateClubScreen() {
    const router = useRouter();
    const [clubName, setClubName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateClub = async () => {
        if (!clubName.trim()) {
            Alert.alert('알림', '클럽 이름을 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            const data = await apiFetch('/teams/', {
                method: 'POST',
                body: JSON.stringify({ name: clubName }),
            });

            Alert.alert('성공', '클럽이 생성되었습니다.', [
                {
                    text: '확인',
                    onPress: () => {
                        router.replace({
                            pathname: '/admin/dashboard',
                            params: { teamId: data.id, authCode: data.auth_code, name: data.name },
                        } as any);
                    },
                },
            ]);
        } catch (error: any) {
            console.error('Failed to create club:', error);
            Alert.alert('오류', '클럽 생성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>클럽 만들기</Text>
                <View style={{ width: 44 }} />
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.content}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>새로운 클럽을 시작해보세요!</Text>
                            <Text style={styles.subtitle}>
                                클럽을 만들고 인증 코드를 공유하여 멤버들을 초대할 수 있습니다.
                            </Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.inputLabel}>클럽 이름</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="예) 와플"
                                value={clubName}
                                onChangeText={setClubName}
                                placeholderTextColor="#9ca3af"
                            />

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleCreateClub}
                                disabled={loading}
                                activeOpacity={0.8}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.submitButtonText}>클럽 만들기</Text>
                                )}
                            </TouchableOpacity>

                            <View style={styles.guideContainer}>
                                <Text style={styles.guideTitle}>💡 안내</Text>
                                <Text style={styles.guideText}>클럽을 만들면 가입용 인증코드가 자동으로 생성됩니다.</Text>
                                <Text style={styles.guideText}>조원들에게 코드를 공유하여 우리 조로 초대해보세요!</Text>
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
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            }
        })
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
    textContainer: {
        marginTop: 32,
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#4b5563',
        lineHeight: 22,
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
        fontSize: 16,
        color: '#1f2937',
    },
    submitButton: {
        backgroundColor: '#a855f7',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 12,
        shadowColor: '#a855f7',
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
        marginTop: 20,
        backgroundColor: '#eff6ff', // blue-50
        borderWidth: 1,
        borderColor: '#bfdbfe', // blue-200
        borderRadius: 12,
        padding: 16,
    },
    guideTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1e3a8a', // blue-900
        marginBottom: 8,
    },
    guideText: {
        fontSize: 13,
        color: '#1e3a8a', // blue-900
        lineHeight: 20,
        marginBottom: 2,
    },
});
