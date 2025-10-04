//
// components/promoCard.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { fontFamily } from '../utils/fontandIcons';

interface PromoCardProps {
  // title: string;
  // subtitle: string;
  buttonText?: string;
  // backgroundImage: any; // require("path-to-image")
  onPress?: () => void;
  item: any;
}

const PromoCard: React.FC<PromoCardProps> = ({
  // title,
  // subtitle,
  buttonText = 'Order Now',
  // backgroundImage,
  onPress,
  item,
}) => {
  // console.log('Promo data passed---->', item);
  // console.log('Promo data background_image---->', item?.background_image);
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <ImageBackground
        source={{ uri: item?.background_image }}
        style={styles.card}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PromoCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(0,0,0,0.10)", // dark overlay for readability
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    maxWidth: '65%', // keep text on left side
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: '#ffffffff',
    marginBottom: 3,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: '#ffffffff',
    marginBottom: 10,
    maxWidth: '60%',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: '#000',
  },
});
