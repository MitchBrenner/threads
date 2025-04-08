import { Colors } from "@/constants/Colors";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { startSSOFlow } = useSSO();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.loginImage}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>How would you like to use Threads?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <View style={styles.loginButtonContent}>
              <Image
                source={require("@/assets/images/instagram-icon.webp")}
                style={styles.loginButtonIcon}
              />
              <Text style={styles.loginButtonText}>
                Continue with Instagram
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.border}
                style={{ marginLeft: "auto" }}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              Log in or create a Threads profile with your instagram account.
              With a profile you can post, interact, and get personalized
              recommendations.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Continue with Google</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.border}
                style={{ marginLeft: "auto" }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Use without a profile</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.border}
                style={{ marginLeft: "auto" }}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              You can browse Threads without a profile, but you won't be able to
              post, interact, or get personalized recommendations.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.switchAccountsButtonText}>Switch accounts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loginImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 17,
  },
  loginButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 20,
  },
  loginButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loginButtonIcon: {
    width: 50,
    height: 50,
  },
  loginButtonText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 15,
  },
  loginButtonSubtitle: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    marginTop: 5,
    color: "#acacac",
  },
  switchAccountsButtonText: {
    fontSize: 14,
    color: Colors.border,
    alignSelf: "center",
  },
});
