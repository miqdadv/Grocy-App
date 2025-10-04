import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import React, { useMemo, useState, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import BillCard from '../cart/BillCard';
import LottieView from 'lottie-react-native';
import CancellationCard from '../cart/CancellationCard';

interface props {
  ref: any;
  totalPrice: number;
}

const BottomSheetCart = ({ ref, totalPrice }: props) => {
  const snapPoints = useMemo(() => ['15%', '59%'], []);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // rotation animation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animateRotation = (toValue: number) => {
    Animated.timing(rotateAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: '#ffffff09' }}
      onChange={index => {
        console.log('INDEX---->',index);
        setCurrentIndex(index);
        animateRotation(index === 1 ? 0 : 1); // 0 = down, 1 = up
      }}
      handleComponent={() => (
        <TouchableOpacity
          style={styles.customHandle}
          onPress={() => {
            if (currentIndex === 0) {
              ref.current.snapToIndex(1);
            } else {
              ref.current.snapToIndex(0);
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
        <BillCard totalPrice={totalPrice} />
        <CancellationCard/>
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
