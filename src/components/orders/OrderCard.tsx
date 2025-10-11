import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontFamily } from '../../utils/fontandIcons';

interface props {
  item: any;
}

const OrderCard = ({ item }: props) => {
  return (
    <View style={styles.container}>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{item.quantity} X</Text>
      </View>
      <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
        {item.description.product_name}
      </Text>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 12,
  },
  quantityContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#f1f0f6',
    borderRadius: 8,
  },
  quantityText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: 'grey',
  },
  description: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: '#575757ff',
    maxWidth: '80%'
  },
});
