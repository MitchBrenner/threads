import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics";

const styles = StyleSheet.create({
  createIconContainer: {
    backgroundColor: Colors.itemBackground,
    padding: 6,
    borderRadius: 8,
  },
});

const CreateTabIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => {
  return (
    <View style={styles.createIconContainer}>
      <Ionicons name="add" color={color} size={size} />
    </View>
  );
};

const Layout = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Home",
          tabBarIcon: ({
            color,
            size,
            focused,
          }: {
            color: any;
            size: any;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({
            color,
            size,
            focused,
          }: {
            color: any;
            size: any;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({
            color,
            size,
            focused,
          }: {
            color: string;
            size: number;
            focused: boolean;
          }) => <CreateTabIcon color={color} size={size} focused={focused} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            // Haptics.selectionAsync();
            router.push("/(modal)/create");
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({
            color,
            size,
            focused,
          }: {
            color: any;
            size: any;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          tabBarIcon: ({
            color,
            size,
            focused,
          }: {
            color: any;
            size: any;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()}>
              <Ionicons name="log-out" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
