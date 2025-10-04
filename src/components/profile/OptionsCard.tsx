import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon lib
import { fontFamily } from '../../utils/fontandIcons';

interface props {
  item: any;
}

const OptionsCard = ({ item }: props) => {

    const formattedTitle = item?.option_title.replace(" ","\n")

  return (
    <TouchableOpacity style={styles.container}>
      <Icon name={item?.icon_name} size={22} />
      <Text style={styles.optionTitle}>{formattedTitle}</Text>
    </TouchableOpacity>
  );
};

export default OptionsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 18,
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius:26,
    gap:4,
    marginHorizontal:6,
  },
  optionTitle:{
    fontFamily:fontFamily.medium,
    fontSize:12,
    color:'grey'
  }
});
