import React from 'react';
import { View, HStack, Image } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import SearchBar from '@/components/navigation/SearchBar';
import logo from '@/assets/images/logo.png'; // Adjust path based on your project structure

const NavBar = () => {
  return (
    <View>
      <View
        $light-bgColor="rgb(1, 1, 1)"
        $dark-bgColor="rgb(242, 242, 242)"
      >
        <HStack
          space="lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal={20}
          paddingVertical={0} 
        >
          <Link 
           style={{ display: 'flex' ,height:60}} 
          href="/">
            <Image
              width={40} 
              height={40} 
              source={logo}
              alt="ecommerce-logo"
              zIndex={99}
            />
          </Link>
          <HStack paddingVertical={10}>
            <SearchBar />
          </HStack>
        </HStack>
      </View>
    </View>
  );
};

export default NavBar;
