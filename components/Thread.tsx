import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Doc } from "@/convex/_generated/dataModel";

type ThreadProps = {
  thread: Doc<"messages"> & {
    creator: Doc<"users">;
  };
};

const Thread = ({ thread }: ThreadProps) => {
  const {
    content,
    mediaFiles,
    likeCount,
    commentCount,
    retweetCount,
    creator,
  } = thread;

  return (
    <View style={styles.container}>
      <Image source={{ uri: thread.creator.imageUrl }} style={styles.avatar} />
    </View>
  );
};

export default Thread;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
