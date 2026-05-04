import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "react-native";
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const ARABIC_FONT = "Cairo_700Bold";
const ARABIC_FONT_REGULAR = "Cairo_400Regular";

const STATS = [
  { value: "180+", label: "Airlines", ar: "شركة طيران" },
  { value: "500K+", label: "Hotels", ar: "فنادق" },
  { value: "15+", label: "Years", ar: "سنة خبرة" },
  { value: "24/7", label: "Support", ar: "دعم" },
];

const SERVICES = [
  { icon: "send" as const, title: "Flights", ar: "طيران", desc: "Book flights across 180+ airlines" },
  { icon: "home" as const, title: "Hotels", ar: "فنادق", desc: "500K+ hotels worldwide" },
  { icon: "file-text" as const, title: "Visa", ar: "تأشيرة", desc: "Fast visa processing" },
  { icon: "truck" as const, title: "Transfers", ar: "نقل", desc: "Airport transfers & more" },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const openWhatsApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL("https://wa.me/96176626252");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: isWeb ? 100 : 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.hero, { paddingTop: isWeb ? 67 + 24 : insets.top + 20 }]}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "#D13434" }]} />
          <View style={[StyleSheet.absoluteFill, styles.heroDarkOverlay]} />

          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>✈  ديانا للسياحة والسفر</Text>
          </View>

          <Image
            source={require("@/assets/diana-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.heroTitle}>Discover The World</Text>
          <Text style={styles.heroSubtitle}>With Confidence</Text>
          <Text style={styles.heroDesc}>
            Book flights, hotels & packages with real-time search from 180+ airlines.
          </Text>

          <Pressable
            style={({ pressed }) => [styles.whatsappBtn, { opacity: pressed ? 0.85 : 1 }]}
            onPress={openWhatsApp}
            testID="button-whatsapp"
          >
            <Feather name="message-circle" size={20} color="#25D366" />
            <Text style={styles.whatsappBtnText}>WhatsApp Us</Text>
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statsCard, { borderColor: colors.border }]}>
            {STATS.map((stat, i) => (
              <View key={i} style={[styles.statItem, i < STATS.length - 1 && styles.statDivider]}>
                <Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statAr, { color: colors.mutedForeground }]}>{stat.ar}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={[styles.sectionTag, { color: colors.primary }]}>Our Services | خدماتنا</Text>
          <Text style={styles.sectionTitle}>Everything You Need</Text>

          <View style={styles.servicesGrid}>
            {SERVICES.map((svc, i) => (
              <View key={i} style={[styles.serviceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.serviceIcon, { backgroundColor: "#fff0f0" }]}>
                  <Feather name={svc.icon} size={24} color={colors.primary} />
                </View>
                <Text style={[styles.serviceTitle, { color: colors.foreground }]}>{svc.title}</Text>
                <Text style={[styles.serviceAr, { color: colors.primary }]}>{svc.ar}</Text>
                <Text style={[styles.serviceDesc, { color: colors.mutedForeground }]}>{svc.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Why Diana */}
        <View style={[styles.whySection, { backgroundColor: "#1a0505" }]}>
          <Text style={styles.whyTitle}>Why Diana Travel?</Text>
          <Text style={styles.whyAr}>لماذا ديانا للسياحة؟</Text>
          {[
            { icon: "shield" as const, title: "Secure & Reliable", desc: "IATA certified agency with real-time booking." },
            { icon: "zap" as const, title: "Fast Processing", desc: "Instant confirmations for flights & hotels." },
            { icon: "headphones" as const, title: "24/7 Support", desc: "Our team is always here to help you." },
          ].map((item, i) => (
            <View key={i} style={styles.whyItem}>
              <View style={[styles.whyIconBox, { backgroundColor: "#D13434" }]}>
                <Feather name={item.icon} size={20} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.whyItemTitle}>{item.title}</Text>
                <Text style={styles.whyItemDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating WhatsApp */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          { bottom: isWeb ? 100 : insets.bottom + 90, opacity: pressed ? 0.9 : 1 }
        ]}
        onPress={openWhatsApp}
        testID="fab-whatsapp"
      >
        <Feather name="message-circle" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 420,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 36,
    overflow: "hidden",
  },
  heroDarkOverlay: {
    backgroundColor: "transparent",
    opacity: 0.3,
  },
  heroBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  heroBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
    fontFamily: ARABIC_FONT_REGULAR,
  },
  logo: {
    width: 130,
    height: 70,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  heroDesc: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    maxWidth: 280,
  },
  whatsappBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  whatsappBtnText: {
    color: "#1a0505",
    fontWeight: "700",
    fontSize: 15,
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginTop: -20,
    marginBottom: 8,
  },
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    paddingVertical: 20,
    shadowColor: "#D13434",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: "#fce8e8",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
  },
  statAr: {
    fontSize: 10,
    marginTop: 2,
    fontFamily: ARABIC_FONT_REGULAR,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 8,
  },
  sectionTag: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1a0505",
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  serviceCard: {
    width: "47%",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  serviceAr: {
    fontSize: 12,
    marginBottom: 6,
    fontFamily: ARABIC_FONT,
  },
  serviceDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  whySection: {
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  whyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  whyAr: {
    fontSize: 14,
    color: "#e6557c",
    marginBottom: 20,
    fontFamily: ARABIC_FONT,
  },
  whyItem: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  whyIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  whyItemTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 2,
  },
  whyItemDesc: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    lineHeight: 18,
  },
  fab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#25D366",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
