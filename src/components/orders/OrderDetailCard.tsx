import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fontFamily } from '../../utils/fontandIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import OrderCard from './OrderCard';
interface props {
  product: any;
}

const OrderDetailCard = ({ product }: props) => {

    const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert 0 → 12

  return `${month} ${day}, ${hours}:${minutes} ${ampm}`;
};


  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <Text style={{ fontFamily: fontFamily.bold, fontSize: 16 }}>
            Grocy
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.regular,
              fontSize: 13,
              color: 'grey',
            }}
          >
            Delivery Center
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text
            style={
              product.status === 'Pending'
                ? {
                    fontFamily: fontFamily.semiBold,
                    color: '#fb8c05ff',
                    fontSize: 13,
                  }
                : {
                    fontFamily: fontFamily.semiBold,
                    color: 'green',
                    fontSize: 13,
                  }
            }
          >
            {product.status}
          </Text>
          <FastImage
            source={require('../../assets/images/pending.png')}
            resizeMode="contain"
            style={styles.statusIcon}
          />
        </View>
      </View>

      {/* list of items ordered */}
      <View style={styles.listWrapper}>
        <FlatList
          data={product.items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <OrderCard item={item} />}
        />
      </View>

    {/* horizontal bar */}
      <View style={styles.horizontalBar}></View>

      {/* rate order button */}
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Rate Order</Text>
      </TouchableOpacity>

      {/* order time and amount */}
      <View style={styles.footerRow}>
       <Text style={styles.rowText}>Ordered: {formatDate(product.date)}</Text>
       <Text style={styles.billText}>Bill Total: ₹{product.totalAmount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderDetailCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 4,
    marginVertical: 8,
    borderWidth: 0.9,
    borderColor: '#ddd',
    borderRadius: 10,
    elevation: 6,
    marginHorizontal: 15,
  },
  headerContainer: {
    backgroundColor: '#f1f0f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
  },
  leftContainer: {},
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  statusIcon: {
    height: 22,
    width: 22,
  },
  listWrapper: {
    marginHorizontal: 8,
    marginTop:16
  },
  horizontalBar:{
    borderWidth:0.6,
    marginHorizontal:8,
    marginVertical:8,
    borderColor:'#d0d0d0ff'
  },
  btn:{
    marginHorizontal:12,
    marginVertical:6,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#607DDB',
    borderRadius:15
  },
  btnText:{
    fontFamily:fontFamily.bold,
    fontSize:18,
    color:'#fff'
  },
  footerRow:{
    marginVertical:10,
    flexDirection:'row',
    marginHorizontal:16,
    justifyContent:'space-between',
    alignItems:'center'
  },
  rowText:{
    fontFamily:fontFamily.semiBold,
    color:'#9e9e9eff'
  },
  billText:{
    fontFamily:fontFamily.semiBold,
    color:'#434343ff'
  }
});
