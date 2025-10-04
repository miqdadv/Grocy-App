import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { fontFamily } from '../utils/fontandIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  toggleFavorite,
} from '../redux/slices/cartSlice';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';


interface Props {
  // id: number;
  // title: string;
  // original_price: number;
  // discounted_price:number;
  // rating: number;
  // image?: any;
  // quantity?: number;
  // showQuantityControls?: boolean;
  product:any,
  onPress?:()=>void
}

const PopularDealCard = ({
  
  // id,
  // title,
  // original_price,
  // discounted_price,
  // rating,
  // image,
  // quantity,
  // showQuantityControls,
  product,
  onPress
}: Props) => {
  // console.log('imavge---->', image);
  
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const discount = ((product?.description?.original_price-product?.description?.discounted_price)/product?.description?.original_price)*100;

  const item = useSelector((state: RootState) =>
    state.cart.items.find(i => i.id === product?.id),
  );
  const isFav = useSelector((state: RootState) =>
    state.cart.favorites.find(i => i.id === product?.id),
  );

  const handleToggleFavorite = (item: any) => {
    // console.log('FAV TOGGLED---->',item);
    dispatch(toggleFavorite(item));
  };

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {/* Discount Badge */}
      {discount>0 && <Text style={styles.discountBadge}>{Math.floor(discount)}% OFF</Text>}

      {/* Favorite Icon */}
      <TouchableOpacity
        onPress={() =>
          handleToggleFavorite({
            // id: id,
            // title: title,
            // price: original_price,
            // rating: rating,
            // image: image,
            // quantity: quantity,
            // showQuantityControls: showQuantityControls,
            ...product
          })
        }
        style={styles.favoriteIcon}
      >
        <Icon name={isFav ? 'heart' : 'heart-outline'} size={20} color="red" />
      </TouchableOpacity>

      {/* Image Placeholder */}
      <View style={styles.imageContainer}>
        {product?.images?.[0] ? (
          <FastImage
            source={{ uri: product?.images[0] }}
            style={styles.image}
            resizeMode='center'
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>Image</Text>
          </View>
        )}
      </View>

      {/* Title */}
      <Text style={styles.title}>{product?.description?.product_name}</Text>

      {/* Price and Rating */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹ {product?.description?.discounted_price}</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>({product?.description?.avg_rating})</Text>
          <Icon name="star" size={14} color="#f5a623" />
        </View>
      </View>

      {/* Quantity or Add to Cart */}
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
          style={styles.cartButton}
          onPress={() =>
            handleAddToCart({
              // id: id,
              // title: title,
              // price: original_price,
              // rating: rating,
              // image: image,
              // quantity: quantity,
              // showQuantityControls: showQuantityControls,
              ...product
            })
          }
        >
          <Text style={styles.cartText}>Add to cart</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default PopularDealCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    marginRight: '4%',
    elevation:4,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    color: '#fff',
    fontSize: 10,
    fontFamily: fontFamily.semiBold,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    zIndex: 1,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  imageContainer: {
    height: 90,
    borderRadius: 10,
    // backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imagePlaceholder: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#aaa',
    fontSize: 12,
    fontFamily: fontFamily.regular,
  },
  image: {
    height: 90,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: '#333',
    marginTop: 8,
    alignSelf:'center'
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    color: '#f5a623',
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginRight: 4,
    fontSize: 12,
    fontFamily: fontFamily.regular,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyButton: {
    backgroundColor: '#607DDB',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qty: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  cartButton: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#607DDB',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartText: {
    color: '#607DDB',
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
});
