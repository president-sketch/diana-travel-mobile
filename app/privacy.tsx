import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const SECTIONS = [
  {
    title: "Information We Collect",
    ar: "المعلومات التي نجمعها",
    body:
      "When you use the Contact form in our app, we collect your name, email address, and message content. This information is used solely to respond to your inquiry.\n\nWe do not collect any financial information, passwords, or government-issued identification through this app.",
  },
  {
    title: "How We Use Your Information",
    ar: "كيف نستخدم معلوماتك",
    body:
      "We use the information you provide to:\n• Respond to your travel inquiries\n• Send booking confirmations and travel updates\n• Improve our customer service\n\nWe do not sell, trade, or share your personal information with third parties for marketing purposes.",
  },
  {
    title: "Third-Party Booking Portal",
    ar: "بوابة الحجز الخارجية",
    body:
      "The booking portal accessible via this app (fdianatravel.onlineota.com) is operated by our IATA-certified booking system partner. When you use the booking portal, any information you enter is governed by that portal's own privacy policy. We recommend reviewing it before creating an account.",
  },
  {
    title: "Data Security",
    ar: "أمان البيانات",
    body:
      "We take reasonable measures to protect your personal information. Contact form submissions are transmitted over encrypted HTTPS connections and stored securely on our servers.",
  },
  {
    title: "Data Retention",
    ar: "الاحتفاظ بالبيانات",
    body:
      "We retain contact form submissions for up to 12 months to allow us to follow up on travel inquiries. You may request deletion of your data at any time by contacting us.",
  },
  {
    title: "Your Rights",
    ar: "حقوقك",
    body:
      "You have the right to:\n• Access the personal information we hold about you\n• Request correction of inaccurate information\n• Request deletion of your information\n• Withdraw consent at any time\n\nTo exercise these rights, contact us at info@fdianatravel.com.",
  },
  {
    title: "Contact Us",
    ar: "اتصل بنا",
    body:
      "If you have any questions about this Privacy Policy, please contact:\n\nDiana Travel\nJdydeh High Way, Afco Center\nBeirut, Lebanon\nEmail: info@fdianatravel.com\nPhone: 01900596",
  },
];

export default function PrivacyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8, backgroundColor: "#D13434" }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} testID="button-back">
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <Text style={[styles.headerAr, { fontFamily: "Cairo_700Bold" }]}>سياسة الخصوصية</Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.updateBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="calendar" size={13} color={colors.mutedForeground} />
          <Text style={[styles.updateText, { color: colors.mutedForeground }]}>
            Last updated: May 2025
          </Text>
        </View>

        <Text style={[styles.intro, { color: colors.foreground }]}>
          Diana Travel ("we", "our", or "us") is committed to protecting your privacy.
          This Privacy Policy explains how we handle information when you use the Diana Travel mobile application.
        </Text>

        {SECTIONS.map((section, i) => (
          <View key={i} style={[styles.section, { borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionNum, { color: "#D13434" }]}>{i + 1}</Text>
              <View>
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{section.title}</Text>
                <Text style={[styles.sectionAr, { fontFamily: "Cairo_700Bold" }]}>{section.ar}</Text>
              </View>
            </View>
            <Text style={[styles.sectionBody, { color: colors.foreground }]}>{section.body}</Text>
          </View>
        ))}

        <View style={[styles.footer, { backgroundColor: "#D13434" }]}>
          <Feather name="shield" size={18} color="#fff" />
          <Text style={styles.footerText}>
            Diana Travel — IATA Accredited Agency{"\n"}
            Beirut, Lebanon
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  headerAr: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  updateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  updateText: {
    fontSize: 12,
    fontWeight: "500",
  },
  intro: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
    opacity: 0.8,
  },
  section: {
    borderTopWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 10,
  },
  sectionNum: {
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 22,
    width: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  sectionAr: {
    fontSize: 13,
    color: "#D13434",
  },
  sectionBody: {
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 36,
    opacity: 0.85,
  },
  footer: {
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },
});
