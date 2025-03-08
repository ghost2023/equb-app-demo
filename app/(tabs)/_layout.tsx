import React from "react";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/Text";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].primary,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "medium",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="my-equbs"
        options={{
          title: "My Equbs",
          headerStyle: {
            backgroundColor: Colors["light"].background,
          },
          headerTitle() {
            return (
              <Text
                style={{
                  color: Colors["light"].text,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                My Equbs
              </Text>
            );
          },
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <Feather name="bookmark" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="browse"
        options={{
          title: "Equbs",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
