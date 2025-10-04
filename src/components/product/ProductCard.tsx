import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/slices/cartSlice';
import { fontFamily } from '../../utils/fontandIcons';

interface Props {
  product: any;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const item = useSelector((state: RootState) =>
    state.cart.items.find(i => i.id === product?.id),
  );

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  // console.log('PRODUCT CLICKED----->', product);
  const discount =
    ((product?.description?.original_price -
      product?.description?.discounted_price) /
      product?.description?.original_price) *
    100;
  return (
    <View style={styles.containerWrapper}>
      {/* Top Row */}
      <View style={styles.timeRatingsRow}>
        <Text style={styles.timeText}>
          {product?.description?.delivery_time} MINS
        </Text>
        <View style={styles.ratingsContainer}>
          <FastImage
            source={require('../../assets/images/star.png')}
            style={styles.starIcon}
            resizeMode="contain"
          />
          <Text style={styles.ratingText}>
            {product?.description?.avg_rating}
          </Text>
          <Text style={styles.ratingCount}>
            ({product?.description?.reviews})
          </Text>
        </View>
      </View>

      {/* Product Name */}
      <Text style={styles.productName}>
        {product?.description?.product_name}
      </Text>

      {/* Description */}
      <Text style={styles.description}>{product?.description?.title}</Text>

      {/* Weight */}
      <Text style={styles.weight}>{product?.description?.quantity}</Text>

      {/* Price Row */}
      <View style={styles.priceRow}>
        <Text style={styles.discountedPrice}>
          ₹{product?.description?.discounted_price}
        </Text>
        {discount > 0 && (
          <>
            <Text style={styles.originalPrice}>
              ₹{product?.description?.original_price}
            </Text>

            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.floor(discount)}% OFF
              </Text>
            </View>
          </>
        )}

        {/* Add Button */}

        {item?.showQuantityControls ? (
          <View style={styles.quantityRow}>
            <TouchableOpacity
              onPress={() => handleDecreaseQuantity(product?.id)}
              style={styles.qtyButton}
            >
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item?.quantity}</Text>
            <TouchableOpacity
              onPress={() => handleIncreaseQuantity(product?.id)}
              style={styles.qtyButton}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(product)}
          >
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    // paddingHorizontal: 12,
    marginVertical: 8,
    elevation: 5,
    // paddingVertical:30
    padding: 30,
  },
  timeRatingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eefaf2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  starIcon: {
    height: 14,
    width: 14,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2a9d47',
  },
  ratingCount: {
    fontSize: 11,
    color: '#555',
    marginLeft: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  weight: {
    fontSize: 13,
    color: '#444',
    marginTop: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  originalPrice: {
    fontSize: 15,
    color: '#888',
    textDecorationLine: 'line-through',
    marginHorizontal: 6,
  },
  discountBadge: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  addButton: {
    marginLeft: 'auto',
    backgroundColor: '#4870f3ff',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  quantityRow: {
    marginLeft: 'auto',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    backgroundColor: '#607DDB',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  qtyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qty: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    minWidth:24,
    textAlign:'center'
  },
});
