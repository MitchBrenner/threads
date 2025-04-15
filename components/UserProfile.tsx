import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Link } from "expo-router";

type userProfileProps = {
  userId?: string;
};

const UserProfile = ({ userId }: userProfileProps) => {
  const profile = useQuery(api.users.getUserById, {
    userId: userId as Id<"users">,
  });

  const { userProfile } = useUserProfile();
  const isSelf = userId === userProfile?._id;

  console.log("profile", profile);
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>
            {profile?.first_name} {profile?.last_name}
          </Text>
          <Text style={styles.username}>@{profile?.username}</Text>
        </View>
        <Image
          source={{
            uri: profile?.imageUrl,
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.bio}>{profile?.bio || "No bio"}</Text>
      <Text>
        {profile?.followersCount} followers ⸱{" "}
        {profile?.websiteUrl || "No website"}
      </Text>
      <View style={styles.buttonRow}>
        {isSelf && (
          <>
            <Link
              href={`/(modal)/edit-profile?biostring=${
                profile?.bio ? encodeURIComponent(profile?.bio) : ""
              }&linkstring=${
                profile?.websiteUrl
                  ? encodeURIComponent(profile?.websiteUrl)
                  : ""
              }&userId=${
                profile?._id
              }&imageUrl=${profile?.imageUrl ? encodeURIComponent(profile?.imageUrl) : ""}`}
              asChild
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Share Profile</Text>
            </TouchableOpacity>
          </>
        )}
        {!isSelf && (
          <>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>Mention</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileTextContainer: {
    gap: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "gray",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bio: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    marginTop: 16,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  fullButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  fullButtonText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
});
