import React from 'react';
import DashboardCardItem from '@/components/DashboardCardItem';
import { Coins, Package, Package2, User, Watch } from 'lucide-react-native';
import { HStack, View } from '@gluestack-ui/themed';

interface CardContainerProps {
  totalProducts: number;
  totalSale: number;
  totalUsers: number;
  pendingOrders: number;
  completedOrders: number;
}

const CardContainer: React.FC<CardContainerProps> = ({
  totalProducts,
  totalSale,
  totalUsers,
  pendingOrders,
  completedOrders,
}) => (
  <View display="flex" width={"100%"} 
  padding="$1" flexWrap='wrap' flexDirection='row' gap="$1"  >
    <DashboardCardItem
      name={"Total Product"}
      number={totalProducts}
      icon={Watch}
    />
    <DashboardCardItem
      name={"Total Sale"}
      number={totalSale}
      icon={Coins}
    />
    <DashboardCardItem
      name={"Total User"}
      number={totalUsers}
      icon={User}
    />
    <DashboardCardItem
      name={"Pending Order"}
      number={pendingOrders}
      icon={Package}
    />
    <DashboardCardItem
      name={"Completed Order"}
      number={completedOrders}
      icon={Package2}
    />
  </View >
);

export default CardContainer;
