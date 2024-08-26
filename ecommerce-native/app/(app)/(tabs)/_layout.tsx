import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import { useGetUserCartsQuery } from "@/redux/reducer/cartsApiSlice";
import { Tabs } from "expo-router";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const currentUser = useSelector(selectCurrentUser);
  const { data: cart, isLoading } = useGetUserCartsQuery();

  const badgeCount = cart?.items?.length || 0;


  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="cart" color={color} />
          ),
          tabBarBadge: isLoading ? undefined : badgeCount || undefined, 
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="cog" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goToAdmin/index"
        options={{
          title: "Admin",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="cog" color={color} />
          ),

          href: currentUser?.isAdmin ?  "/admin" : null,
        }}
      />
    </Tabs>
  );
}
