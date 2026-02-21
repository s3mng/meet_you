import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
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
import { apiFetch, setToken } from '../utils/api';

export default function LoginScreen() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!id || !password) {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            const data = await apiFetch('/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    login_id: id,
                    password: password,
                }),
            });

            if (data.access_token) {
                setToken(data.access_token);
                router.replace('/role-selection');
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            let errorMessage = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
            try {
                const parsedError = JSON.parse(error.message);
                if (parsedError.detail) {
                    if (typeof parsedError.detail === 'string') {
                        errorMessage = parsedError.detail;
                    } else if (Array.isArray(parsedError.detail) && parsedError.detail.length > 0) {
                        errorMessage = parsedError.detail[0].msg || errorMessage;
                    }
                }
            } catch (e) {
                // Ignore parse errors, use fallback message
            }
            alert(`로그인 실패: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View style={styles.iconContainer}>
                                {/* Example used an svg, using Ionicons for native parity */}
                                <Ionicons name="people" size={40} color="white" />
                            </View>
                            <Text style={styles.title}>bobyak</Text>
                            <Text style={styles.subtitle}>함께 만들어가는 우리들의 추억</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="아이디"
                                value={id}
                                onChangeText={setId}
                                autoCapitalize="none"
                                placeholderTextColor="#9ca3af" // Tailwind gray-400
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                placeholderTextColor="#9ca3af"
                            />
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={handleLogin}
                                disabled={loading}
                                activeOpacity={0.8}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.loginButtonText}>로그인</Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>아직 계정이 없으신가요?</Text>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => router.push('/signup')}>
                                <Text style={styles.signupText}>회원가입</Text>
                            </TouchableOpacity>
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
        backgroundColor: '#ffffff', // Clean white background like example
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: '#b548c6', // Simulating gradient from-purple-500 to-pink-500 centrally
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#a855f7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8, // For Android shadow
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        color: '#1f2937', // Tailwind gray-800
    },
    subtitle: {
        fontSize: 14,
        color: '#4b5563', // Tailwind gray-600
    },
    formContainer: {
        width: '100%',
        gap: 12, // Native margin/spacing between elements
    },
    input: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb', // Tailwind gray-200
        borderRadius: 12, // Slightly more rounded for modern look
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#1f2937',
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#a855f7', // Tailwind purple-500 solid fallback
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#a855f7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        marginTop: 32,
        alignItems: 'center',
        gap: 8,
    },
    footerText: {
        fontSize: 14,
        color: '#4b5563',
    },
    signupText: {
        fontSize: 14,
        color: '#9333ea', // Tailwind purple-600
        fontWeight: '600',
    },
});
