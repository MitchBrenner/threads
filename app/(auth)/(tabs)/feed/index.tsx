import {
  Button,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThreadComposer from "@/components/ThreadComposer";
import Thread from "@/components/Thread";

const Page = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    {
      initialNumItems: 5,
    }
  );
  const [refreshing, setRefreshing] = useState(false);

  const { top } = useSafeAreaInsets();

  const onLoadMore = () => {
    loadMore(5);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <Thread thread={item} />}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.border,
          }}
        />
      )}
      contentContainerStyle={{
        paddingVertical: top,
      }}
      ListHeaderComponent={
        <View style={{ paddingBottom: 16 }}>
          <Image
            source={require("@/assets/images/threads-logo-black.png")}
            style={{
              width: 40,
              height: 40,
              alignSelf: "center",
            }}
          />
          <ThreadComposer isPreview />
        </View>
      }
    />
  );
};

export default Page;

const styles = StyleSheet.create({});
