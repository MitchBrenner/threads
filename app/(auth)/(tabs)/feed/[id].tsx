import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import Thread from "@/components/Thread";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Colors } from "@/constants/Colors";
import Comments from "@/components/Comments";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const thread = useQuery(api.messages.getThreadById, {
    messageId: id as Id<"messages">,
  });
  const { userProfile } = useUserProfile();
  return (
    <View style={{ flexGrow: 1 }}>
      <ScrollView>
        {thread ? (
          <Thread
            thread={thread as Doc<"messages"> & { creator: Doc<"users"> }}
          />
        ) : (
          <ActivityIndicator />
        )}
        <Comments messageId={id as Id<"messages">} />
      </ScrollView>
      <View style={styles.border} />
      <Link
        href={`/(auth)/(modal)/reply/${id}`}
        asChild
        style={styles.replyButton}
      >
        <TouchableOpacity>
          <Image
            source={{ uri: userProfile?.imageUrl as string }}
            style={styles.profileImage}
          />
          <Text>Reply to {thread?.creator?.first_name}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  replyButton: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    margin: 10,
    gap: 10,
    backgroundColor: Colors.itemBackground,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
});
