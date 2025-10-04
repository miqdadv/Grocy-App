import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { fontFamily } from '../../utils/fontandIcons';
import { Shadow } from 'react-native-shadow-2';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?:object;
  textStyle?:object
  //   disabled?: boolean;
};

const CustomButton = ({ title, onPress, loading, style, textStyle }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button,style]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size={32} />
      ) : (
        <Text style={[styles.buttonText,textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#607DDB',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    elevation:6
  },
  buttonText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 18,
  },
});
