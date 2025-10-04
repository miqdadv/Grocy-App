import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import { useSharedValue } from 'react-native-reanimated';
import ProductCard from '../product/ProductCard';

interface Props {
  ref: any;
  product: any;
}

const BottomSheetProduct = ({ ref, product }: Props) => {
  const snapPoints = useMemo(() => ['78%', '90%'], []);

  const progress = useSharedValue<number>(0);
  const width = Dimensions.get('window').width * 0.95;
  const height = Dimensions.get('window').height * 0.35;
 

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1} // hide when closed
      appearsOnIndex={0} // show when opened
      pressBehavior="close" // tapping outside closes sheet
    />
  );
  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={-1}
      backgroundStyle={{ backgroundColor: 'white' }}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.bottomSheetContainer}>
        <View style={styles.carouselWrapper}>
          <Carousel
            width={width}
            height={height}
            data={product?.images}
            onProgressChange={progress}
            renderItem={({ item }:any) => (
              <FastImage
                source={{ uri: item }}
                style={styles.image}
                resizeMode="center"
              />
            )}
          />
          <Pagination.Basic
            data={product?.images ?? []}
            progress={progress}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            containerStyle={styles.dotContainer}
          />
        </View>
        <View>
          <ProductCard product={product}/>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetProduct;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
    marginHorizontal: 12,
  },
  carouselWrapper: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#274ecdff',
  },
  dotContainer: {
    marginTop: 2,
    padding: 12,
    borderRadius: 9,
    backgroundColor: '#e8ebff76',
  },
});
