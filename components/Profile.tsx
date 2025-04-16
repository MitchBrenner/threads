import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import UserProfile from "./UserProfile";
import { User } from "@/convex/schema";
import Tabs from "./Tabs";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import Thread from "./Thread";

type ProfileProps = {
  userId?: Id<"users">;
  showBackButton?: boolean;
};

const Profile = ({ userId, showBackButton }: ProfileProps) => {
  const { userProfile } = useUserProfile();

  const { top } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const router = useRouter();

  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    { userId: userId || userProfile?._id },
    {
      initialNumItems: 5,
    }
  );

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <Link href={`/(auth)/(tabs)/feed/${item._id}`} asChild>
            <TouchableOpacity>
              <Thread
                thread={item as Doc<"messages"> & { creator: Doc<"users"> }}
              />
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={styles.tabContentText}>
            You haven't posted anything yet
          </Text>
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: Colors.border }} />
        )}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              {showBackButton ? (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name="chevron-back" size={24} color="black" />
                  <Text>Back</Text>
                </TouchableOpacity>
              ) : (
                <MaterialCommunityIcons name="web" size={24} color="black" />
              )}
              <View style={styles.headerIcons}>
                <Ionicons name="logo-instagram" size={24} color="black" />
                <TouchableOpacity onPress={() => signOut()}>
                  <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            {userId && <UserProfile userId={userId} />}
            {!userId && userProfile && <UserProfile userId={userProfile._id} />}
            <Tabs onTabChange={() => {}} />
          </>
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabContentText: {
    fontSize: 18,
    color: Colors.border,
    textAlign: "center",
    marginVertical: 16,
  },
});
