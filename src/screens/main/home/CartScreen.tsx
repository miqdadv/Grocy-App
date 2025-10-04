import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomHeader from '../../../components/header/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import CartItemCard from '../../../components/cart/CartItemCard';
import {
  decreaseQuantity,
  increaseQuantity,
} from '../../../redux/slices/cartSlice';
import FastImage from 'react-native-fast-image';
import { fontFamily } from '../../../utils/fontandIcons';
import CustomButton from '../../../components/buttons/CustomButton';
import BillCard from '../../../components/cart/BillCard';
import BottomSheetCart from '../../../components/bottomSheet/BottomSheetCart';
import BottomSheet from '@gorhom/bottom-sheet';
import MenuModal from '../../../components/cart/MenuModal';
import ConfirmActionModal from '../../../components/cart/modals/ConfirmActionModal';

const CartScreen = ({ navigation }: any) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log('CART ITEMS ARE---->', cartItems);
  const dispatch = useDispatch<AppDispatch>();

  const getTotalCartPrice = () => {
    let totalPrice = 0;

    cartItems.forEach(item => {
      totalPrice += item.description.discounted_price * item.quantity;
    });

    return totalPrice;
  };

  const totalPrice = getTotalCartPrice();

  // console.log('TOTAL CART PRICE---->', totalPrice);

  useEffect(() => {
    if (cartItems.length > 0) {
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [cartItems]);

  const handleIncrease = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: number) => {
    dispatch(decreaseQuantity(id));
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomHeader
          title="Shopping Cart"
          onBackPress={() => navigation.goBack()}
          onMenuPress={() => setIsMenuVisible(!isMenuVisible)}
        />
        <View style={styles.listWrapper}>
          <FlatList
            data={cartItems}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({ item }) => (
              <CartItemCard
                product={item}
                // id={item?.id}
                // title={item?.description?.title}
                // price={item.price}
                // oldPrice={item.price * 1.5}
                // image={item.image}
                // quantity={item.quantity}
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View style={styles.emptyImage}>
                  <FastImage
                    source={require('../../../assets/images/empty-cart.png')}
                    style={{ height: 200, width: 200 }}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.emptyTextContainer}>
                  <Text style={styles.emptyTextHeading}>
                    Your cart is getting lonely
                  </Text>
                  <Text style={styles.emptyTextMsg}>
                    Fill it up with all good things!
                  </Text>
                </View>

                <View>
                  <CustomButton
                    title="Start Shopping"
                    onPress={() => navigation.goBack()}
                    style={styles.startShoppingBtn}
                    textStyle={styles.startShoppingText}
                  />
                </View>
              </View>
            }
            // ListFooterComponent={
            //   <>
            //     {cartItems.length > 0 && <View style={{elevation:1}}><BillCard totalPrice={totalPrice} /></View> }
            //   </>
            // }
          />
        </View>

        <MenuModal isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} setIsConfirmModalVisible={setIsConfirmModalVisible}/>
        <ConfirmActionModal isConfirmModalVisible={isConfirmModalVisible} setIsConfirmModalVisible={setIsConfirmModalVisible}/>
      </View>
      <BottomSheetCart ref={bottomSheetRef} totalPrice={totalPrice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 20,
    // borderWidth:1
  },
  listWrapper: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  emptyImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextHeading: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
  },
  emptyTextMsg: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: 'black',
  },
  startShoppingBtn: {
    backgroundColor: '#9eb5ff79',
    elevation: 0,
  },
  startShoppingText: {
    color: '#1741caff',
    fontFamily: fontFamily.semiBold,
  },
  showHideBillContainer: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9eb5ff79',
    marginHorizontal: '33%',
    borderRadius: 25,
  },
  showHideText: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: '#1741caff',
    marginRight: 8,
  },
  arrowIcon: {
    width: 18,
    height: 18,
    tintColor: '#1741caff',
  },
 
});

export default CartScreen;
