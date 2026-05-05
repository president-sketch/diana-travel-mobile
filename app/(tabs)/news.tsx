import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const FACEBOOK_URL = "https://www.facebook.com/fdianatravel";
const WEBSITE_URL = "https://www.fdianatravel.com";

const NEWS_ITEMS = [
  {
    title: "Summer 2025 Packages",
    ar: "باقات صيف 2025",
    desc: "Exclusive deals on Mediterranean cruises, Turkey tours, and European city breaks.",
    date: "May 2025",
    icon: "sun" as const,
  },
  {
    title: "Hajj & Umrah Services",
    ar: "خدمات الحج والعمرة",
    desc: "Full Hajj and Umrah packages with premium accommodation in Mecca and Medina.",
    date: "April 2025",
    icon: "star" as const,
  },
  {
    title: "Group Travel Discounts",
    ar: "خصومات السفر الجماعي",
    desc: "Special rates for groups of 10 or more. Contact us for a custom quote.",
    date: "March 2025",
    icon: "users" as const,
  },
  {
    title: "Visa Services Now Available",
    ar: "خدمات التأشيرة متاحة الآن",
    desc: "Fast visa processing for Schengen, UK, USA, Canada and Gulf countries.",
    date: "February 2025",
    icon: "file-text" as const,
  },
];

export default function NewsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const openFacebook = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const fbAppUrl = "fb://page/fdianatravel";
    const canOpen = await Linking.canOpenURL(fbAppUrl);
    if (canOpen) {
      await Linking.openURL(fbAppUrl);
    } else {
      await WebBrowser.openBrowserAsync(FACEBOOK_URL, {
        toolbarColor: "#1877F2",
        controlsColor: "#ffffff",
      });
    }
  };

  const openWebsite = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await WebBrowser.openBrowserAsync(WEBSITE_URL, {
      toolbarColor: "#D13434",
      controlsColor: "#ffffff",
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[styles.container, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News & Offers</Text>
        <Text style={[styles.headerAr, { fontFamily: "Cairo_700Bold" }]}>أخبار وعروض</Text>
        <Text style={styles.headerDesc}>
          Latest travel deals and updates from Diana Travel
        </Text>
      </View>

      {/* Facebook CTA */}
      <Pressable
        style={({ pressed }) => [styles.fbBtn, { opacity: pressed ? 0.85 : 1 }]}
        onPress={openFacebook}
        testID="button-open-facebook"
      >
        <Feather name="facebook" size={22} color="#fff" />
        <View style={{ flex: 1 }}>
          <Text style={styles.fbBtnText}>Follow us on Facebook</Text>
          <Text style={[styles.fbBtnAr, { fontFamily: "Cairo_700Bold" }]}>تابعنا على فيسبوك</Text>
        </View>
        <Feather name="external-link" size={18} color="rgba(255,255,255,0.7)" />
      </Pressable>

      {/* News Cards */}
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Latest Updates</Text>
      {NEWS_ITEMS.map((item, i) => (
        <View key={i} style={[styles.newsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.newsCardTop}>
            <View style={styles.newsIconBox}>
              <Feather name={item.icon} size={20} color="#D13434" />
            </View>
            <Text style={[styles.newsDate, { color: colors.mutedForeground }]}>{item.date}</Text>
          </View>
          <Text style={[styles.newsTitle, { color: colors.foreground }]}>{item.title}</Text>
          <Text style={[styles.newsAr, { fontFamily: "Cairo_700Bold" }]}>{item.ar}</Text>
          <Text style={[styles.newsDesc, { color: colors.mutedForeground }]}>{item.desc}</Text>
        </View>
      ))}

      {/* Website CTA */}
      <Pressable
        style={({ pressed }) => [styles.webBtn, { borderColor: "#D13434", opacity: pressed ? 0.85 : 1 }]}
        onPress={openWebsite}
        testID="button-open-website"
      >
        <Feather name="globe" size={18} color="#D13434" />
        <Text style={styles.webBtnText}>Visit Our Website</Text>
        <Feather name="external-link" size={15} color="#D13434" />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: "#1a0505",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  headerAr: {
    fontSize: 15,
    color: "#e6557c",
    marginBottom: 8,
  },
  headerDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 18,
  },
  fbBtn: {
    backgroundColor: "#1877F2",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  fbBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  fbBtnAr: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  newsCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  newsCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  newsIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#fff0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  newsDate: {
    fontSize: 12,
    fontWeight: "500",
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  newsAr: {
    fontSize: 13,
    color: "#D13434",
    marginBottom: 6,
  },
  newsDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  webBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingVertical: 14,
    marginTop: 8,
  },
  webBtnText: {
    color: "#D13434",
    fontSize: 14,
    fontWeight: "700",
  },
});
