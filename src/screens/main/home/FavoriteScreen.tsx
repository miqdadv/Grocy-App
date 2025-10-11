import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomHeader from '../../../components/header/CustomHeader';
import PopularDealCard from '../../../components/popularDealCard';
import { fontFamily } from '../../../utils/fontandIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import CustomButton from '../../../components/buttons/CustomButton';
import FastImage from 'react-native-fast-image';

const FavoriteScreen = ({ navigation }: any) => {
  const FavData = useSelector((state: RootState) => state.cart.favorites);
  console.log('FavData----->', FavData);

  return (
    <View style={styles.container}>
      {/* <View style={styles.wrapper}> */}
      <View style={styles.header}>
        <CustomHeader
          title="Favorites"
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.popularDealsWrapper}>
        <FlatList
          data={FavData}
          renderItem={({ item }) => (
            <PopularDealCard
              // id={item.id}
              // title={item?.description?.product_name}
              // original_price={item?.description?.original_price}
              // discounted_price={item?.description?.discounted_price}
              // rating={item?.description?.avg_rating}
              // showQuantityControls={item.showQuantityControls}
              // quantity={item.quantity}
              // image={item?.images || []}
              product={item}
            />
          )}
          keyExtractor={item => item?.id?.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.popularGrid}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyImage}>
                <FastImage
                  source={require('../../../assets/images/bookmarked.png')}
                  style={{ height: 200, width: 200 }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.emptyTextContainer}>
                <Text style={styles.emptyTextHeading}>
                  Your cart is getting lonely
                </Text>
                <Text style={styles.emptyTextMsg}>
                  Fill it up with all good things!
                </Text>
              </View>

              <View>
                <CustomButton
                  title="Start Shopping"
                  onPress={() => navigation.goBack()}
                  style={styles.startShoppingBtn}
                  textStyle={styles.startShoppingText}
                />
              </View>
            </View>
          }
        />
      </View>
      {/* </View> */}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    marginBottom: 10,
  },
  popularDealsWrapper: {
    marginTop: 25,
    paddingHorizontal: 20,
    flex: 1,
  },
  popularGrid: { paddingBottom: 20 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  emptyImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextHeading: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
  },
  emptyTextMsg: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: 'black',
  },
  startShoppingBtn: {
    // backgroundColor:'#9eb5ff79',
    // elevation:0
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#607DDB',
    borderRadius: 8,
  },
  startShoppingText: {
    // color:'#1741caff',
    // fontFamily:fontFamily.semiBold
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: '#607DDB', 
  },
});
