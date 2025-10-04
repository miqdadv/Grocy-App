import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontFamily } from '../../utils/fontandIcons';

const CancellationCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.noteText}>
        <Text style={styles.noteHeading}>NOTE: </Text>
        Once an order is placed, any cancellation may result in a fee. In case
        of high delays, an order may be cancelled with a complete refund.
      </Text>
    </View>
  );
};

export default CancellationCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 12,
    elevation: 6,
    borderRadius: 12,
    // marginVertical: 6,
    marginBottom:10
  },
  noteHeading: {
    fontFamily:fontFamily.semiBold,
    fontSize:15,
    color: 'red'
  },
  noteText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    fontWeight: '800',
    color: 'grey',
    lineHeight:17
  },
});
