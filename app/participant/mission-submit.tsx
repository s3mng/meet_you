import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { apiFetch } from '../../utils/api';

export default function MissionSubmitScreen() {
    const router = useRouter();
    const { missionId, groupId } = useLocalSearchParams<{ missionId: string; groupId: string }>();
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.permissionContainer}>
                <Text style={styles.permissionText}>이 기능을 사용하려면 카메라 접근 권한이 필요합니다.</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
                    <Text style={styles.permissionButtonText}>권한 요청</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.back()} style={[styles.permissionButton, { backgroundColor: '#6b7280', marginTop: 12 }]}>
                    <Text style={styles.permissionButtonText}>뒤로 가기</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const handleTakePicture = async () => {
        if (!cameraRef.current || isProcessing) return;

        try {
            setIsProcessing(true);

            // Generate locally compressed image around 1MB natively 
            // `exif: true` is provided to ensure full metadata remains intact 
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.5,
                exif: true,
            });

            if (!photo || !photo.uri) {
                throw new Error("사진 캡쳐에 실패했습니다.");
            }

            // Create payload for backend exactly as documented matching the OpenAPI definition.
            const formData = new FormData();
            formData.append('file', {
                uri: photo.uri,
                name: `mission_${missionId}_${Date.now()}.jpg`,
                type: 'image/jpeg'
            } as any);

            // Fetch to backend endpoint
            await apiFetch(`/missions/${missionId}/submit?group_id=${groupId}`, {
                method: 'POST',
                body: formData,
            });

            Alert.alert("성공", "미션이 성공적으로 제출되었습니다.", [
                { text: "확인", onPress: () => router.back() }
            ]);

        } catch (error: any) {
            console.error("Mission Submit Error:", error);
            const detail = error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
            Alert.alert("오류", `미션 제출 중 문제가 발생했습니다.\n\n[상세 오류]\n${detail}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close" size={28} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>미션 제출</Text>
            </View>

            <CameraView style={styles.camera} facing="back" ref={cameraRef}>
                <View style={styles.cameraOverlay}>
                    {isProcessing ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#ffffff" />
                            <Text style={styles.loadingText}>사진을 제출하는 중입니다...</Text>
                        </View>
                    ) : (
                        <View style={styles.bottomControls}>
                            <TouchableOpacity style={styles.captureButton} onPress={handleTakePicture}>
                                <View style={styles.captureInner} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </CameraView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    permissionText: {
        fontSize: 16,
        color: '#4b5563',
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 24,
    },
    permissionButton: {
        backgroundColor: '#7e22ce',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    permissionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    camera: {
        flex: 1,
        marginTop: 60, // approximate safe area top
    },
    cameraOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    bottomControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ffffff',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
