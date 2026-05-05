import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import { Image } from "react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const BOOKING_URL = "https://fdianatravel.onlineota.com";

const FEATURES = [
  { icon: "send" as const, title: "Flights", ar: "طيران", desc: "180+ airlines, best fares guaranteed" },
  { icon: "home" as const, title: "Hotels", ar: "فنادق", desc: "500,000+ hotels worldwide" },
  { icon: "file-text" as const, title: "Packages", ar: "باقات", desc: "All-inclusive travel packages" },
  { icon: "truck" as const, title: "Transfers", ar: "نقل", desc: "Airport & city transfers" },
];

export default function BookScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const openBooking = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await WebBrowser.openBrowserAsync(BOOKING_URL, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
      toolbarColor: "#D13434",
      controlsColor: "#ffffff",
      enableBarCollapsing: true,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[styles.container, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <Image
          source={require("@/assets/diana-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.heroTitle}>Book Your Trip</Text>
        <Text style={[styles.heroAr, { fontFamily: "Cairo_700Bold" }]}>احجز رحلتك</Text>
        <Text style={styles.heroDesc}>
          Search and book flights, hotels, and travel packages through our IATA-certified booking portal.
        </Text>
      </View>

      {/* Open Button */}
      <Pressable
        style={({ pressed }) => [styles.bookBtn, { opacity: pressed ? 0.85 : 1 }]}
        onPress={openBooking}
        testID="button-open-booking"
      >
        <Feather name="external-link" size={22} color="#fff" />
        <Text style={styles.bookBtnText}>Open Booking Portal</Text>
        <Text style={[styles.bookBtnAr, { fontFamily: "Cairo_700Bold" }]}>فتح بوابة الحجز</Text>
      </Pressable>

      <Text style={[styles.hint, { color: colors.mutedForeground }]}>
        Opens securely in your browser
      </Text>

      {/* Features Grid */}
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>What You Can Book</Text>
      <View style={styles.grid}>
        {FEATURES.map((f, i) => (
          <View key={i} style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.featureIconBox}>
              <Feather name={f.icon} size={22} color="#D13434" />
            </View>
            <Text style={[styles.featureTitle, { color: colors.foreground }]}>{f.title}</Text>
            <Text style={[styles.featureAr, { fontFamily: "Cairo_700Bold" }]}>{f.ar}</Text>
            <Text style={[styles.featureDesc, { color: colors.mutedForeground }]}>{f.desc}</Text>
          </View>
        ))}
      </View>

      {/* IATA badge */}
      <View style={[styles.iataBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Feather name="shield" size={18} color="#D13434" />
        <View style={{ flex: 1 }}>
          <Text style={[styles.iataTitle, { color: colors.foreground }]}>IATA Certified Agency</Text>
          <Text style={[styles.iataDesc, { color: colors.mutedForeground }]}>
            Diana Travel is IATA accredited. Your booking is safe and protected.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  hero: {
    alignItems: "center",
    backgroundColor: "#D13434",
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  logo: {
    width: 110,
    height: 60,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  heroAr: {
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 12,
  },
  heroDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 20,
  },
  bookBtn: {
    backgroundColor: "#D13434",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
    shadowColor: "#D13434",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  bookBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  bookBtnAr: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
  },
  hint: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  featureCard: {
    width: "47.5%",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
  },
  featureIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#fff0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  featureAr: {
    fontSize: 12,
    color: "#D13434",
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 11,
    lineHeight: 16,
  },
  iataBadge: {
    flexDirection: "row",
    gap: 12,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    alignItems: "flex-start",
  },
  iataTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  iataDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
});
