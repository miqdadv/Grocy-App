import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import React, { useMemo, useState, useRef, useCallback } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import BillCard from '../cart/BillCard';
import LottieView from 'lottie-react-native';
import CancellationCard from '../cart/CancellationCard';
import SlideToPayButton from '../buttons/SlideToPayButton';
import RazorpayCheckout from 'react-native-razorpay';
interface props {
  bottomSheetRef: any;
  totalPrice: number;
  setShowPaymentModal: any;
  setModalType: any;
}

const BottomSheetCart = ({
  bottomSheetRef,
  totalPrice,
  setShowPaymentModal,
  setModalType,
}: props) => {
  console.log('Total price---->', totalPrice);

  const snapPoints = useMemo(() => ['15%', '69%'], []);
  const [currentIndex, setCurrentIndex] = useState(-1);

  //fee calculation
  const handlingFee = 9.8;
  const smallCartFee = totalPrice > 99 ? 0 : 12;
  const deliveryParnterFee = totalPrice > 99 ? 0 : 30;
  const gstCharges = totalPrice * 0.05;
  const toPay =
    totalPrice + handlingFee + smallCartFee + deliveryParnterFee + gstCharges;

  console.log('toPay----->', Math.floor(toPay));

  // rotation animation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animateRotation = (toValue: number) => {
    Animated.timing(rotateAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handlePayment = useCallback(() => {
    // Check if RazorpayCheckout module exists
    // console.log('TOTAL PRICE---->', totalPrice);
    // console.log('RazorpayCheckout:', RazorpayCheckout);

    // ✅ Recalculate toPay inside the payment function to avoid stale values
    const handlingFee = 9.8;
    const smallCartFee = totalPrice > 99 ? 0 : 12;
    const deliveryPartnerFee = totalPrice > 99 ? 0 : 30;
    const gstCharges = totalPrice * 0.05;
    const currentToPay =
      totalPrice + handlingFee + smallCartFee + deliveryPartnerFee + gstCharges;
    console.log('totalPrice in handlePayment---->', totalPrice);
    console.log('currentToPay---->', currentToPay);
    const options = {
      description: 'Grocy App Order Payment',
      image: require('../../assets/images/playstore-icon.png'),
      currency: 'INR',
      key: 'rzp_test_RQwGpU7t4mLpAe',
      amount: Math.floor(currentToPay * 100),
      name: 'Grocy App',
      order_id: '',
      prefill: {
        email: 'vichawera786@gmail.com',
        contact: '9999999999',
        name: 'test user',
      },
      theme: { color: '#607DDB' },
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log('Payment Success:', data);
        setModalType('success');
        setShowPaymentModal(true);
      })
      .catch(error => {
        console.log('Payment Failed:', error);
        setModalType('cancel');
        setShowPaymentModal(true);
      });
  }, [totalPrice,setModalType,setShowPaymentModal]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: '#ffffff09' }}
      onChange={index => {
        console.log('INDEX---->', index);
        setCurrentIndex(index);
        animateRotation(index === 1 ? 0 : 1); // 0 = down, 1 = up
      }}
      handleComponent={() => (
        <TouchableOpacity
          style={styles.customHandle}
          onPress={() => {
            if (currentIndex === 0) {
              bottomSheetRef.current.snapToIndex(1);
            } else {
              bottomSheetRef.current.snapToIndex(0);
            }
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'], // flip arrow up/down
                  }),
                },
              ],
            }}
          >
            <LottieView
              source={require('../../assets/animations/Arrow_down.json')}
              style={styles.animation}
              loop
              autoPlay
            />
          </Animated.View>
        </TouchableOpacity>
      )}
    >
      <BottomSheetView style={styles.bottomSheetContainer}>
        <BillCard
          totalPrice={totalPrice}
          handlingFee={handlingFee}
          smallCartFee={smallCartFee}
          deliveryPartnerFee={deliveryParnterFee}
          gstCharges={gstCharges}
          toPay={toPay}
        />
        <CancellationCard />
        <SlideToPayButton
          amount={Math.floor(toPay)}
          onComplete={handlePayment}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetCart;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  customHandle: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 10,
  },
  animation: {
    height: 60,
    width: 60,
  },
});
