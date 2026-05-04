import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useColors } from "@/hooks/useColors";

export default function NewsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const isWeb = Platform.OS === "web";

  if (isWeb) {
    return (
      <View style={[styles.webFallback, { paddingTop: isWeb ? 67 : insets.top }]}>
        <View style={[styles.webInner, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.webTitle, { color: "#1877F2", fontFamily: "Cairo_700Bold" }]}>Facebook | فيسبوك</Text>
          <Text style={[styles.webDesc, { color: colors.mutedForeground }]}>
            Open the app on your device to view our Facebook page and latest travel news.
          </Text>
          <Text style={[styles.webUrl, { color: "#1877F2" }]}>
            facebook.com/fdianatravel
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loadingOverlay, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color="#1877F2" />
          <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>
            Loading Facebook feed...
          </Text>
        </View>
      )}
      <WebView
        source={{ uri: "https://www.facebook.com/fdianatravel" }}
        style={{ flex: 1 }}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        testID="webview-news"
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
