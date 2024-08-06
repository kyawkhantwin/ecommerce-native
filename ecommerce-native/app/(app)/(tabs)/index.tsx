import ProductsForYou from "@/features/home/ProductsForYou";
import PopularProducts from "@/features/home/PopularItems";
import Category from "@/features/home/Category";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/features/navBar/NavBar";
import { Platform, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Platform.OS !== "web" && <NavBar />}
        <Category />
        <PopularProducts />
        <ProductsForYou />
      </ScrollView>
    </SafeAreaView>
  );
}
