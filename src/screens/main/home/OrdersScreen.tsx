import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import CustomHeader from '../../../components/header/CustomHeader';
import { FlatList } from 'react-native-gesture-handler';
import OrderDetailCard from '../../../components/orders/OrderDetailCard';

const OrdersScreen = ({ navigation }: any) => {
  const orders = useSelector((state: RootState) => state.cart.orders);
  console.log('ORDER PLACED ARE---->', orders);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <CustomHeader
            title="Your Orders"
            onBackPress={() => navigation.goBack()}
          />
        </View>

        {/* Order details card */}

        <View style={styles.listWrapper}>
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <OrderDetailCard product={item} />}
          />
        </View>
      </View>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    marginTop: 12,
  },
  header:{
    marginHorizontal:15,
  }
});
