import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs, router } from "expo-router";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import useShowToast from "@/components/toast/ShowToast";

const AdminLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="bar-chart-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: "Product",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="watch-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="file-tray-full-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="cube-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="clipboard-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goToUser/index"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="person-circle-outline" color={color} />
          ),
          href: "/",
        }}
      />
    </Tabs>
  );
};

export default AdminLayout;
