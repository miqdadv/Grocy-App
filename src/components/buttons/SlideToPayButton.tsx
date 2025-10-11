import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width - 40;
const SLIDE_LIMIT = SLIDER_WIDTH - 70;

interface Props {
  amount: number;
  onComplete: () => void;
}

const SlideToPayButton = ({ amount, onComplete }: Props) => {
  const panX = useRef(new Animated.Value(0)).current;
  const [completed, setCompleted] = useState(false);

  // ✅ Create PanResponder whenever onComplete changes
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => !completed,
        onPanResponderMove: (_, gesture) => {
          if (gesture.dx >= 0 && gesture.dx <= SLIDE_LIMIT) {
            panX.setValue(gesture.dx);
          }
        },
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx > SLIDE_LIMIT * 0.9) {
            Animated.timing(panX, {
              toValue: SLIDE_LIMIT,
              duration: 150,
              useNativeDriver: false,
            }).start(() => {
              setCompleted(true);
              onComplete(); // ✅ always latest callback
            });
          } else {
            Animated.spring(panX, {
              toValue: 0,
              useNativeDriver: false,
            }).start();
          }
        },
      }),
    [onComplete, completed] // 👈 dependency added
  );

  // 👇 Reset the slider automatically after payment finishes
  useEffect(() => {
    if (completed) {
      const timer = setTimeout(() => {
        Animated.spring(panX, {
          toValue: 0,
          useNativeDriver: false,
        }).start(() => {
          setCompleted(false);
        });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [completed]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {completed ? 'Processing...' : `Slide to Pay | ₹${amount}`}
      </Text>

      <Animated.View
        style={[styles.slider, { transform: [{ translateX: panX }] }]}
        {...panResponder.panHandlers}
      >
        <Icon name="chevron-double-right" size={28} />
      </Animated.View>
    </View>
  );
};

export default SlideToPayButton;

const styles = StyleSheet.create({
  container: {
    width: SLIDER_WIDTH,
    height: 60,
    backgroundColor: '#607DDB',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 14,
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  slider: {
    position: 'absolute',
    left: 8,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
