import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from "react-native";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link, useNavigation } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from "react-native-reanimated";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Thread from "@/components/Thread";
import { Doc } from "@/convex/_generated/dataModel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThreadComposer from "@/components/ThreadComposer";
import { useCallback, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

const Page = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    { initialNumItems: 5 }
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

  const navigation = useNavigation();
  const scrollOffset = useSharedValue(0);
  const tabBarHeight = useBottomTabBarHeight();
  const isFocused = useIsFocused();

  const updateTabbar = () => {
    let newMarginBottom = 0;
    if (scrollOffset.value >= 0 && scrollOffset.value <= tabBarHeight) {
      newMarginBottom = -scrollOffset.value;
    } else if (scrollOffset.value > tabBarHeight) {
      newMarginBottom = -tabBarHeight;
    }

    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { marginBottom: newMarginBottom } });
  };

  // Create an animated scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (isFocused) {
        scrollOffset.value = event.contentOffset.y;
        runOnJS(updateTabbar)();
      }
    },
  });

  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
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
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <View style={{ paddingBottom: 16 }}>
          <Image
            source={require("@/assets/images/threads-logo-black.png")}
            style={{ width: 40, height: 40, alignSelf: "center" }}
          />
          <ThreadComposer isPreview />
        </View>
      }
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.border,
          }}
        />
      )}
      contentContainerStyle={{ paddingVertical: top }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default Page;

const styles = StyleSheet.create({});
