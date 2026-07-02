import { router, Tabs } from "expo-router";

import { BottomNavigation } from "@/features/home";
import { useHomeStore } from "@/store/use-home-store";

export default function TabsLayout() {
  const setSelectedTab = useHomeStore((state) => state.setSelectedTab);

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <BottomNavigation
          activeIndex={props.state.index}
          onCapturePress={() => router.push({ pathname: "/capture/[type]", params: { type: "new" } })}
          onTabPress={(tab) => {
            setSelectedTab(tab);
            props.navigation.navigate(tab);
          }}
        />
      )}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="collections" />
    </Tabs>
  );
}
