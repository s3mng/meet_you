import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ModelViewerScreen() {
    const router = useRouter();
    const { url } = useLocalSearchParams<{ url: string }>();

    // Prefix the domain if missing (API typically serves /api/missions/downloads/...glb)
    let fullUrl = url;
    if (url && url.startsWith('/')) {
        fullUrl = `https://ctsyftybpwjrscsq.tunnel.elice.io${url}`;
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
      body { margin: 0; padding: 0; width: 100vw; height: 100vh; background-color: #0f172a; overflow: hidden; }
      model-viewer { 
        width: 100%; 
        height: 100%; 
        background-color: #0f172a; 
      }
    </style>
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
  </head>
  <body>
    <model-viewer 
      src="${fullUrl}" 
      auto-rotate 
      camera-controls 
      shadow-intensity="1"
      exposure="1"
    ></model-viewer>
  </body>
</html>
    `;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <Ionicons name="close" size={28} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={styles.webViewContainer}>
                {fullUrl ? (
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: htmlContent }}
                        style={styles.webview}
                        scrollEnabled={false}
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderLoading={() => (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#ffffff" />
                            </View>
                        )}
                        startInLoadingState={true}
                    />
                ) : (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle-outline" size={48} color="#ffffff" />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // dark blue/slate
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 22,
    },
    webViewContainer: {
        flex: 1,
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
