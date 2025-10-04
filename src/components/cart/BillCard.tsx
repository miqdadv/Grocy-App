import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontFamily } from '../../utils/fontandIcons';

interface props {
  totalPrice: number;
}

const BillCard = ({ totalPrice }: props) => {
  const handlingFee = 9.8;
  const smallCartFee = totalPrice > 99 ? 0 : 12;
  const deliveryParnterFee = totalPrice > 99 ? 0 : 30;
  const gstCharges = totalPrice * 0.05;

  const toPay =
    totalPrice + handlingFee + smallCartFee + deliveryParnterFee + gstCharges;
  return (
    <View style={styles.billContainer}>
      <Text style={styles.heading}>BILL DETAILS</Text>
      <View style={styles.priceRow}>
        <Text style={styles.title}>Item Total</Text>
        <Text style={styles.amount}>₹ {totalPrice}</Text>
      </View>
      <View style={styles.priceRow}>
        <View style={styles.dottedLine}>
          <Text style={[styles.title]}>Handling Fee</Text>
        </View>
        <Text style={styles.amount}>₹ {handlingFee}</Text>
      </View>
      <View style={styles.priceRow}>
        <View style={styles.dottedLine}>
          <Text style={[styles.title]}>Small Cart Fee</Text>
        </View>
        <Text style={styles.amount}>₹ {smallCartFee}</Text>
      </View>

      {totalPrice < 99 && (
        <View style={styles.priceRow}>
          <Text style={[styles.title, { color: '#0000003c' }]}>
            No small cart fee on orders above ₹99
          </Text>
        </View>
      )}

      <View style={styles.separator}></View>

      <View style={styles.priceRow}>
        <View style={styles.dottedLine}>
          <Text style={[styles.title]}>Delivery Partner Fee</Text>
        </View>
        <Text style={styles.amount}>₹ {deliveryParnterFee}</Text>
      </View>

      <View style={styles.priceRow}>
        <View style={styles.dottedLine}>
          <Text style={[styles.title]}>GST and Charges</Text>
        </View>
        <Text style={styles.amount}>₹ {Math.floor(gstCharges)}</Text>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.priceRow}>
        <Text style={[styles.title, { color: 'black' }]}>To Pay</Text>
        <Text style={styles.amount}>₹ {Math.floor(toPay)}</Text>
      </View>
    </View>
  );
};

export default BillCard;

const styles = StyleSheet.create({
  billContainer: {
    backgroundColor: '#ffffffff',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 16,
    elevation:6
  },
  heading: {
    fontFamily: fontFamily.regular,
    color: '#00000096',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    fontWeight: '800',
    color: 'grey',
  },
  amount: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: '#000000b4',
  },
  dottedLine: {
    borderBottomWidth: 1.2,
    borderStyle: 'dashed',
    borderColor: 'grey',
    marginBottom: 6,
  },
  separator: {
    borderWidth: 0.6,
    borderStyle: 'dashed',
    color: 'grey',
    marginVertical: 15,
  },
});
