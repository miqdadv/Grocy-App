import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { fontFamily } from '../../utils/fontandIcons';

interface Props {
  title: string;
  onBackPress: () => void;
  onMenuPress?: () => void;
}

const CustomHeader = ({ title, onBackPress, onMenuPress }: Props) => {
  return (
    <View style={styles.container}>
      {/* Left Section (Back Button + Title) */}
      <View style={styles.leftRow}>
        <TouchableOpacity onPress={onBackPress} style={styles.backIcon}>
          <FastImage
            source={require('../../assets/images/arrow.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Section (Menu Dots) */}
      <TouchableOpacity onPress={onMenuPress} style={styles.menuIcon}>
        <FastImage
          source={require('../../assets/images/menu.png')} // <-- add your 3-dot menu icon
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    marginRight: 10,
  },
  menuIcon: {},
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: '#1D2433', // close to your screenshot color
    marginLeft: 10,
  },
});
