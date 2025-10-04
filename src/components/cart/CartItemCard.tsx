import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { fontFamily } from '../../utils/fontandIcons';

interface CartItemCardProps {
  product:any,
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  product,
  onIncrease,
  onDecrease,
}) => {
  console.log('CART PRODUCT----->',product?.images?.[0]);
  return (
    <View style={styles.card}>
      <FastImage source={{uri:product?.images?.[0]}} style={styles.image} resizeMode="center" />
      <View style={styles.info}>
        <Text style={styles.title}>{product?.description?.product_name}</Text>
        <View style={styles.row}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product?.description?.discounted_price * product?.quantity}</Text>
            {product?.description?.original_price!==product?.description?.discounted_price && (
              <Text style={styles.oldPrice}>₹{product?.description?.original_price * product?.quantity}</Text>
            )}
          </View>
          <View style={styles.quantityControls}>
            <TouchableOpacity style={styles.button} onPress={onDecrease}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{product?.quantity}</Text>
            <TouchableOpacity style={styles.button} onPress={onIncrease}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor:'white' ,
    borderRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  oldPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#607DDB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal:12,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    minWidth:24,
    textAlign:'center'
  },
});

export default CartItemCard;
