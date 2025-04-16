import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import Thread from "./Thread";

type CommentProps = {
  messageId: Id<"messages">;
};

const Page = ({ messageId }: CommentProps) => {
  const comments = useQuery(api.messages.getThreadComments, {
    messageId: messageId as Id<"messages">,
  });
  return (
    <View>
      {comments?.map((comment) => (
        <Thread
          key={comment._id.toString()}
          thread={comment as Doc<"messages"> & { creator: Doc<"users"> }}
        />
      ))}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
