import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { apiFetch } from '../utils/api';

export default function SignupScreen() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [studentId, setStudentId] = useState('');
    const [mbti, setMbti] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male'); // default to male as per schema enum
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSignup = async () => {
        if (!id || !password || !username || !studentId || !mbti) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            await apiFetch('/users/register', {
                method: 'POST',
                body: JSON.stringify({
                    login_id: id,
                    password: password,
                    username: username,
                    student_id: studentId,
                    mbti: mbti,
                    gender: gender,
                }),
            });
            alert('회원가입이 완료되었습니다. 로그인해주세요.');
            router.replace('/login');
        } catch (error: any) {
            console.error('Signup failed:', error);
            let errorMessage = '회원가입에 실패했습니다. 입력값을 다시 확인해주세요.';
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
            alert(`회원가입 실패: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={24} color="#1f2937" />
                            </TouchableOpacity>
                            <View style={styles.iconContainer}>
                                <Ionicons name="person-add" size={40} color="white" />
                            </View>
                            <Text style={styles.title}>bobyak</Text>
                            <Text style={styles.subtitle}>새로운 계정을 만들어보세요</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="아이디"
                                value={id}
                                onChangeText={setId}
                                autoCapitalize="none"
                                placeholderTextColor="#9ca3af"
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
                            <TextInput
                                style={styles.input}
                                placeholder="이름"
                                value={username}
                                onChangeText={setUsername}
                                placeholderTextColor="#9ca3af"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="학번"
                                value={studentId}
                                onChangeText={setStudentId}
                                keyboardType="default" // Replaced numeric with default string keyboard as requested
                                placeholderTextColor="#9ca3af"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="MBTI (예: ENFP)"
                                value={mbti}
                                onChangeText={setMbti}
                                autoCapitalize="characters"
                                maxLength={4}
                                placeholderTextColor="#9ca3af"
                            />

                            {/* Gender Toggle */}
                            <View style={styles.genderContainer}>
                                <Text style={styles.genderLabel}>성별</Text>
                                <View style={styles.genderToggle}>
                                    <TouchableOpacity
                                        style={[styles.genderOption, gender === 'male' && styles.genderSelected]}
                                        onPress={() => setGender('male')}
                                    >
                                        <Text style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>남성</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.genderOption, gender === 'female' && styles.genderSelected]}
                                        onPress={() => setGender('female')}
                                    >
                                        <Text style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>여성</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.signupButton}
                                onPress={handleSignup}
                                disabled={loading}
                                activeOpacity={0.8}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.signupButtonText}>가입하기</Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>이미 계정이 있으신가요?</Text>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => router.replace('/login')}>
                                <Text style={styles.loginText}>로그인</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 8,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: '#b548c6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 16,
        shadowColor: '#a855f7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 14,
        color: '#4b5563',
    },
    formContainer: {
        width: '100%',
        gap: 12,
    },
    input: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#1f2937',
    },
    genderContainer: {
        marginTop: 4,
        marginBottom: 8,
    },
    genderLabel: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 8,
        marginLeft: 4,
    },
    genderToggle: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6', // Tailwind gray-100
        borderRadius: 12,
        padding: 4,
    },
    genderOption: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    genderSelected: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    genderText: {
        color: '#6b7280', // Tailwind gray-500
        fontWeight: '500',
    },
    genderTextSelected: {
        color: '#1f2937',
        fontWeight: '600',
    },
    signupButton: {
        width: '100%',
        backgroundColor: '#a855f7',
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
    signupButtonText: {
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
    loginText: {
        fontSize: 14,
        color: '#9333ea',
        fontWeight: '600',
    },
});
