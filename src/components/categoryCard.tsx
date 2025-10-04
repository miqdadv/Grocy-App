import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fontFamily } from '../utils/fontandIcons';
import Icon from 'react-native-vector-icons/Ionicons'; // Or any icon set you use
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { TMainStackNavigationProp } from '../interface/navigation.type';

interface Props {
  item: any;
}


const CategoryCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<any>();

 const handleNavigate = (item:any) => {
  // console.log('CATEGORY TYPE---->',item)
  navigation.navigate('CategoryScreen',{item:item});
};

// console.log('ITEM---->',item);
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.backgroundColor }]}
      // onPress={() => handleNavigate(item.category_type)}
      onPress={()=>handleNavigate(item)}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, { color: item.text_color }]}>
        {item.category_name}
      </Text>
      <View style={styles.imageContainer}>
        <FastImage
          source={{ uri: item.image }}
          // source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: 118,
    height: 145,
    borderRadius: 20,
    overflow: 'hidden',
    // paddingVertical: 14,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    position: 'absolute',
    top: 12,
    left: 12,
    fontFamily: fontFamily.bold,
    fontSize: 14,
    maxWidth: 95,
    lineHeight: 16,
    flexWrap: 'wrap',
  },
  count: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 2,
  },
  imageContainer: {
    position: 'absolute',
    bottom: -32,
    right: -28,
  },
  image: {
    width: 135,
    aspectRatio: 1,
    height: undefined,
    transform: [{ rotate: '-8deg' }],
  },
});
