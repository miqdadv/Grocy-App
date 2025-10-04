import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomHeader from '../../../components/header/CustomHeader';
import { firestore } from '../../../../services/firebaseConfig';
import PopularDealCard from '../../../components/popularDealCard';
import LottieView from 'lottie-react-native';
import CustomButton from '../../../components/buttons/CustomButton';
import FastImage from 'react-native-fast-image';
import { fontFamily } from '../../../utils/fontandIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetProduct from '../../../components/bottomSheet/BottomSheetProduct';

const CategoryScreen = ({ route, navigation }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [filterdProducts, setFilteredProducts] = useState<any[]>([]);
  const { item } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  //logic for toggling the bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handlePress = (product:any)=>{
   setSelectedProduct(product);
   bottomSheetRef.current?.snapToIndex(1);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (products) {
      const filteredItems = products.filter(
        itr => itr.category_type === item.category_type,
      );

      //   console.log('FILTERED ITEMS---->',filteredItems);

      setFilteredProducts(filteredItems);
    }
  }, [products]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('item_data')
      .onSnapshot(snapshot => {
        const items: any[] = [];
        snapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setProducts(items);
      });
    return () => unsubscribe();
  }, []);

  // console.log('ALL PRODUCTS---->', products);
  // console.log('FILTERED PRODUCTS---->', filterdProducts);

  //   console.log(item.category_type);
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <CustomHeader
          title={item.category_name}
          onBackPress={() => navigation.goBack()}
        />
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <LottieView
            source={require('../../../assets/animations/loader.json')}
            autoPlay
            loop
            style={{ width: 250, height: 250 }}
          />
        </View>
      ) : (
        <View style={styles.listWrapper}>
          <FlatList
            data={filterdProducts}
            renderItem={({ item }) => <PopularDealCard product={item} onPress={()=>handlePress(item)}/>}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View style={styles.emptyImage}>
                  <FastImage
                    source={require('../../../assets/images/coming_soon.png')}
                    style={{ height: 230, width: 230 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.emptyTextContainer}>
                  <Text style={styles.emptyTextHeading}>
                    Coming in Hot 🔥
                  </Text>
                  <Text style={styles.emptyTextMsg}>
                  Stay tuned—your favorites are almost here!
                  </Text>
                </View>

                <View>
                  <CustomButton
                    title="Start Exploring"
                    onPress={() => navigation.goBack()}
                    style={styles.startShoppingBtn}
                    textStyle={styles.startShoppingText}
                  />
                </View>
              </View>
            }
          />
        </View>
      )}
      <BottomSheetProduct ref={bottomSheetRef} product={selectedProduct}/>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    paddingHorizontal: 20,
  },
  listWrapper: {
    marginTop: 25,
    paddingHorizontal: 20,
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  grid: {
    paddingBottom: 20,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 200,
  },
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
    //  marginTop:10,
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
    textAlign:'center'
  },
  startShoppingBtn: {
    backgroundColor: '#9eb5ff79',
    elevation: 0,
  },
  startShoppingText: {
    color: '#1741caff',
    fontFamily: fontFamily.semiBold,
  },
});
