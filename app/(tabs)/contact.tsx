import { Feather } from "@expo/vector-icons";
import { useSubmitContact } from "@workspace/api-client-react";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

interface ContactItemProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  value: string;
  onPress?: () => void;
  color?: string;
}

function ContactItem({ icon, label, value, onPress, color }: ContactItemProps) {
  const colors = useColors();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.contactItem,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed && onPress ? 0.75 : 1 }
      ]}
      onPress={onPress}
      disabled={!onPress}
      testID={`contact-${label.toLowerCase()}`}
    >
      <View style={[styles.contactIcon, { backgroundColor: "#fff0f0" }]}>
        <Feather name={icon} size={22} color={color || colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.contactLabel, { color: colors.mutedForeground }]}>{label}</Text>
        <Text style={[styles.contactValue, { color: colors.foreground }]}>{value}</Text>
      </View>
      {onPress && <Feather name="chevron-right" size={18} color={colors.mutedForeground} />}
    </Pressable>
  );
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: submitContact, isPending } = useSubmitContact();

  const call = (number: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(`tel:${number}`);
  };

  const openWhatsApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL("https://wa.me/96176626252");
  };

  const openEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL("mailto:info@fdianatravel.com");
  };

  const openMap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL("https://www.google.com/maps/search/Jdydeh+High+Way+Afco+Center");
  };

  const handleSend = () => {
    Keyboard.dismiss();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setSubmitStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setSubmitStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    submitContact(
      {
        data: {
          name: trimmedName,
          email: trimmedEmail,
          subject: "App Inquiry",
          message: trimmedMessage,
        },
      },
      {
        onSuccess: () => {
          setSubmitStatus("success");
          setForm({ name: "", email: "", message: "" });
        },
        onError: (err) => {
          setSubmitStatus("error");
          setErrorMessage(
            (err as { data?: { error?: string } })?.data?.error ||
              "Something went wrong. Please try again."
          );
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.container,
          { paddingTop: isWeb ? 67 + 16 : insets.top + 16, paddingBottom: isWeb ? 100 : insets.bottom + 100 }
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Card */}
        <View style={[styles.heroCard, { backgroundColor: "#D13434" }]}>
          <Text style={styles.heroTitle}>Contact Us</Text>
          <Text style={[styles.heroAr, { fontFamily: "Cairo_700Bold" }]}>اتصل بنا</Text>
          <Text style={styles.heroDesc}>We're here to help plan your perfect journey.</Text>
        </View>

        {/* Office Info */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Office</Text>
        <ContactItem
          icon="map-pin"
          label="Address"
          value={"Jdydeh High Way, Afco Center\nGround Floor — IATA 4321093"}
          onPress={openMap}
        />

        {/* Phone */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Phone</Text>
        <ContactItem
          icon="phone"
          label="Line 1"
          value="01900596"
          onPress={() => call("01900596")}
        />
        <ContactItem
          icon="phone"
          label="Line 2"
          value="01900597"
          onPress={() => call("01900597")}
        />

        {/* WhatsApp */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>WhatsApp</Text>
        <ContactItem
          icon="message-circle"
          label="WhatsApp"
          value="+961 76 626 252"
          onPress={openWhatsApp}
          color="#25D366"
        />

        {/* Email */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Email</Text>
        <ContactItem
          icon="mail"
          label="Email"
          value="info@fdianatravel.com"
          onPress={openEmail}
        />

        {/* Social */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Social</Text>
        <ContactItem
          icon="facebook"
          label="Facebook"
          value="facebook.com/fdianatravel"
          onPress={() => Linking.openURL("https://www.facebook.com/fdianatravel")}
          color="#1877F2"
        />

        {/* Send Message Form */}
        <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 16 }]}>
          Send Message
        </Text>
        <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.formField}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Name</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }]}
              placeholder="Your full name"
              placeholderTextColor={colors.mutedForeground}
              value={form.name}
              onChangeText={(text) => {
                setForm((prev) => ({ ...prev, name: text }));
                if (submitStatus !== "idle") setSubmitStatus("idle");
              }}
              autoCapitalize="words"
              returnKeyType="next"
              testID="input-name"
            />
          </View>

          <View style={styles.formField}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Email</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }]}
              placeholder="your@email.com"
              placeholderTextColor={colors.mutedForeground}
              value={form.email}
              onChangeText={(text) => {
                setForm((prev) => ({ ...prev, email: text }));
                if (submitStatus !== "idle") setSubmitStatus("idle");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              testID="input-email"
            />
          </View>

          <View style={styles.formField}>
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Message</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }
              ]}
              placeholder="How can we help you?"
              placeholderTextColor={colors.mutedForeground}
              value={form.message}
              onChangeText={(text) => {
                setForm((prev) => ({ ...prev, message: text }));
                if (submitStatus !== "idle") setSubmitStatus("idle");
              }}
              multiline
              numberOfLines={4}
              returnKeyType="done"
              blurOnSubmit
              testID="input-message"
            />
          </View>

          {submitStatus === "success" && (
            <View style={styles.feedbackRow}>
              <Feather name="check-circle" size={16} color="#16a34a" />
              <Text style={[styles.feedbackText, { color: "#16a34a" }]}>
                Message sent! We'll get back to you within 24 hours.
              </Text>
            </View>
          )}

          {submitStatus === "error" && (
            <View style={styles.feedbackRow}>
              <Feather name="alert-circle" size={16} color="#dc2626" />
              <Text style={[styles.feedbackText, { color: "#dc2626" }]}>{errorMessage}</Text>
            </View>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.sendBtn,
              { backgroundColor: "#D13434", opacity: pressed || isPending ? 0.8 : 1 }
            ]}
            onPress={handleSend}
            disabled={isPending}
            testID="button-send-message"
          >
            {isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Feather name="send" size={18} color="#fff" />
                <Text style={styles.sendBtnText}>Send Message</Text>
              </>
            )}
          </Pressable>
        </View>

        {/* CTA */}
        <Pressable
          style={({ pressed }) => [
            styles.ctaBtn,
            { backgroundColor: "#25D366", opacity: pressed ? 0.85 : 1 }
          ]}
          onPress={openWhatsApp}
          testID="button-contact-whatsapp"
        >
          <Feather name="message-circle" size={20} color="#fff" />
          <Text style={styles.ctaBtnText}>Chat on WhatsApp | واتساب</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  heroCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  heroAr: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
    fontFamily: "Cairo_700Bold",
  },
  heroDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 4,
    opacity: 0.5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 14,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  contactIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  formCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
    gap: 12,
  },
  formField: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 11,
  },
  feedbackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  feedbackText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  sendBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 4,
  },
  sendBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 20,
  },
  ctaBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Cairo_700Bold",
  },
});
