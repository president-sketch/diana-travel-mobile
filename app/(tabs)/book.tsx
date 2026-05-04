import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useColors } from "@/hooks/useColors";

export default function BookScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const isWeb = Platform.OS === "web";

  if (isWeb) {
    return (
      <View style={[styles.webFallback, { paddingTop: isWeb ? 67 : insets.top }]}>
        <View style={[styles.webInner, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.webTitle, { color: colors.primary, fontFamily: "Cairo_700Bold" }]}>Book Now | احجز الآن</Text>
          <Text style={[styles.webDesc, { color: colors.mutedForeground }]}>
            Open the app on your iOS or Android device to use the full booking experience.
          </Text>
          <Text style={[styles.webUrl, { color: colors.primary }]}>
            fdianatravel.onlineota.com
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loadingOverlay, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>
            Loading booking portal...
          </Text>
        </View>
      )}
      <WebView
        source={{ uri: "https://fdianatravel.onlineota.com" }}
        style={{ flex: 1 }}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        allowsInlineMediaPlayback
        testID="webview-booking"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: "500",
  },
  webFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff5f5",
  },
  webInner: {
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    width: "100%",
    maxWidth: 400,
  },
  webTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  webDesc: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  webUrl: {
    fontSize: 14,
    fontWeight: "600",
  },
});
