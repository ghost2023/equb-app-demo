import React from "react";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].primary,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
