import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { apiFetch } from '../../utils/api';

export default function EditMissionScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const teamId = params.teamId as string;
    const missionId = params.missionId as string; // if exists, edit mode
    const isEditMode = !!missionId;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchMissionDetails();
        }
    }, [missionId]);

    const fetchMissionDetails = async () => {
        try {
            setLoading(true);
            const data = await apiFetch(`/missions/${missionId}`);
            setTitle(data.title || '');
            setDescription(data.description || '');
        } catch (error) {
            console.error('Failed to fetch mission:', error);
            Alert.alert('오류', '미션 정보를 불러오지 못했습니다.');
            router.back();
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!title.trim() || !description.trim()) {
            Alert.alert('알림', '미션 제목과 설명을 모두 입력해주세요.');
            return;
        }

        try {
            setSubmitting(true);
            if (isEditMode) {
                // PATCH request
                await apiFetch(`/missions/${missionId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: title.trim(),
                        description: description.trim(),
                    }),
                });
                Alert.alert('성공', '미션이 수정되었습니다.', [{ text: '확인', onPress: () => router.back() }]);
            } else {
                // POST request
                await apiFetch('/missions/', {
                    method: 'POST',
                    body: JSON.stringify({
                        team_id: Number(teamId),
                        title: title.trim(),
                        description: description.trim(),
                    }),
                });
                Alert.alert('성공', '미션이 추가되었습니다.', [{ text: '확인', onPress: () => router.back() }]);
            }
        } catch (error) {
            console.error('Failed to save mission:', error);
            Alert.alert('오류', `미션을 ${isEditMode ? '수정' : '추가'}하는 중 문제가 발생했습니다.`);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            '미션 삭제',
            '이 미션을 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '삭제',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setSubmitting(true);
                            await apiFetch(`/missions/${missionId}`, {
                                method: 'DELETE',
                            });
                            router.back();
                        } catch (error) {
                            console.error('Failed to delete mission:', error);
                            Alert.alert('오류', '미션 삭제에 실패했습니다.');
                            setSubmitting(false); // only toggle false if error, on success we go back
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingArea}>
                <ActivityIndicator size="large" color="#a855f7" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1f2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{isEditMode ? '미션 수정' : '미션 추가'}</Text>
                    {isEditMode ? (
                        <TouchableOpacity onPress={handleDelete} style={styles.rightButton}>
                            <Ionicons name="trash-outline" size={24} color="#ef4444" />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: 40 }} />
                    )}
                </View>

                {/* Form Content */}
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>미션 제목</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="미션 제목을 입력하세요 (예: 모두 함께 점심 먹기)"
                            value={title}
                            onChangeText={setTitle}
                            placeholderTextColor="#9ca3af"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>미션 설명</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="미션의 상세 내용과 수행 방법을 적어주세요."
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={6}
                            textAlignVertical="top"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </ScrollView>

                {/* Bottom Save Button */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            (!title.trim() || !description.trim() || submitting) && styles.saveButtonDisabled
                        ]}
                        onPress={handleSave}
                        disabled={!title.trim() || !description.trim() || submitting}
                    >
                        {submitting ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.saveButtonText}>{isEditMode ? '수정 완료' : '미션 추가'}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    loadingArea: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    rightButton: {
        padding: 8,
        marginRight: -8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    scrollContent: {
        padding: 24,
        gap: 24,
    },
    formGroup: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4b5563',
    },
    input: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1f2937',
    },
    textArea: {
        minHeight: 120,
        paddingTop: 12, // For iOS multiline
    },
    bottomContainer: {
        padding: 16,
        paddingBottom: Platform.OS === 'ios' ? 32 : 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        backgroundColor: '#ffffff',
    },
    saveButton: {
        backgroundColor: '#a855f7',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonDisabled: {
        backgroundColor: '#d8b4fe', // lighter purple
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});
