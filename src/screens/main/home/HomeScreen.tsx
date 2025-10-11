import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { fontFamily } from '../../../utils/fontandIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import PromoCard from '../../../components/promoCard';
import CategoryCard from '../../../components/categoryCard';
import PopularDealCard from '../../../components/popularDealCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { logout } from '../../../redux/slices/authSlice';
import { auth as Auth } from '../../../../services/firebaseConfig';
// import { categoriesData, promoData } from '../../../utils/data';
import LottieView from 'lottie-react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheetProduct from '../../../components/bottomSheet/BottomSheetProduct';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [popularDeals, setPopularDeals] = useState<any[]>([]);
  const [promoData, setPromoData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchText, setSearchText] = useState('');

  // animated search suggestions
  const suggestions = [`'Fruits'`, `'Snacks'`, `'Vegetables'`, `'Drinks'`];
  const [index, setIndex] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { width } = Dimensions.get('window');
  const CARD_WIDTH = width * 0.8; // 80% of screen width
  const SPACING = 5;

  const promoScrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const dispatch = useDispatch<AppDispatch>();
  const userName = Auth().currentUser?.displayName;
  const auth = useSelector((state: RootState) => state.auth);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    // console.log(currentHour);

    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigation.replace('AuthStack', { screen: 'Login' });
  // };
  const handlePress = (product: any) => {
    setSelectedProduct(product);
    bottomSheetRef.current?.snapToIndex(1);
  };

  //search animation

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate up + fade out
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -20,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIndex(prev => (prev + 1) % suggestions.length);

        // Reset position and opacity
        translateY.setValue(20);
        fadeAnim.setValue(0);

        // Animate slide-in + fade-in
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  //fetching the categories data
  useEffect(() => {
    firestore()
      .collection('categories')
      .onSnapshot(snapshot => {
        const items: any[] = [];

        snapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setCategories(items);
      });
  }, []);

  // console.log('CATEGORIES DATA---->', categories);

  //fetching promo data
  useEffect(() => {
    firestore()
      .collection('promo_data')
      .onSnapshot(snapshot => {
        const items: any[] = [];
       
        snapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setPromoData(items);
      });
  }, []);

  // console.log('PROMO DATA---->', promoData);

  //fetching the hot deals data
  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = firestore()
        .collection('item_data')
        .onSnapshot(snapshot => {
          const items: any[] = [];
      
          snapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setPopularDeals(items);
          setLoading(false);
        });
      return () => unsubscribe();
    }, 4000);
  }, []);

  // logic for animated carousel
  useEffect(() => {
    if (promoData) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= promoData.length) {
          currentIndex = 0;
        }
        flatListRef.current?.scrollToOffset({
          offset: currentIndex * (CARD_WIDTH + SPACING),
          animated: true,
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [promoData]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greetings}>
          <Text style={styles.time}>{getGreeting()}</Text>
          <Text style={styles.userName}>{userName || 'Guest'}👋</Text>
        </View>
        <View style={styles.notificationContainer}>
          <TouchableOpacity style={styles.numberContainer}>
            <Text style={styles.number}>6</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.badgeIcon} onPress={handleLogout}>
            <Icon name="log-out-outline" color="#607DDB" size={24} />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Search */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search beverages or foods"
          placeholderTextColor={'#797979ff'}
        />
        <Icon
          name="search"
          color="#607DDB"
          size={20}
          style={styles.searchIcon}
        />
      </View> */}

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          // remove placeholder since we're custom rendering it
        />

        {/* Overlay placeholder when input is empty */}
        {searchText.length === 0 && (
          <View style={styles.placeholderOverlay}>
            <Text style={styles.placeholderStatic}>Search for </Text>
            <Animated.Text
              style={[
                styles.placeholderAnimated,
                { transform: [{ translateY }], opacity: fadeAnim },
              ]}
            >
              {suggestions[index]}
            </Animated.Text>
          </View>
        )}

        <Icon
          name="search"
          color="#607DDB"
          size={20}
          style={styles.searchIcon}
        />
      </View>

      <ScrollView nestedScrollEnabled={true}>
        {/* Promo Cards Carousel */}
        <View style={styles.carouselWrapper}>
          {/* app instamart grocery carousel images */}
          <Animated.FlatList
            ref={flatListRef}
            data={promoData}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
            bounces={false}
            snapToAlignment="center"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: promoScrollX } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingHorizontal: (width - CARD_WIDTH) / 2,
            }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (CARD_WIDTH + SPACING),
                index * (CARD_WIDTH + SPACING),
                (index + 1) * (CARD_WIDTH + SPACING),
              ];

              const scale = promoScrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
              });

              const opacity = promoScrollX.interpolate({
                inputRange,
                outputRange: [0.7, 1, 0.7],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  style={{
                    width: CARD_WIDTH,
                    marginHorizontal: SPACING / 2,
                    transform: [{ scale }],
                    opacity,
                  }}
                >
                  <PromoCard item={item} />
                </Animated.View>
              );
            }}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesWrapper}>
          <Text style={styles.spotlightTitle}>In the Spotlight</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((item, index) => (
              <CategoryCard item={item} />
            ))}
          </ScrollView>
        </View>

        {/* Popular Deals */}
        <View style={styles.popularDealsWrapper}>
          <Text style={styles.sectionTitle}>Hot Deals</Text>

          {loading ? (
            <View style={styles.loaderContainer}>
              <LottieView
                source={require('../../../assets/animations/loader.json')}
                autoPlay
                loop
                style={{ width: 250, height: 250 }}
              />
            </View>
          ) : (
            <FlatList
              data={popularDeals}
              renderItem={({ item }) => (
                <PopularDealCard
                  product={item}
                  // id={item.id}
                  // title={item?.description?.product_name}
                  // original_price={item?.description?.original_price}
                  // discounted_price={item?.description?.discounted_price}
                  // rating={item?.description?.reviews}
                  // showQuantityControls={item.showQuantityControls}
                  // quantity={item.quantity}
                  // image={item.images[0]}
                  onPress={() => handlePress(item)}
                />
              )}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.popularGrid}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
      <BottomSheetProduct ref={bottomSheetRef} product={selectedProduct} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 20,
    // borderWidth:1
  },
  greetings: { gap: 6 },
  userName: { fontFamily: fontFamily.bold, fontSize: 26 },
  time: { fontFamily: fontFamily.regular, fontSize: 16 },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 10,
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: { fontFamily: fontFamily.semiBold, fontSize: 18, color: '#000' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 15,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 45,
    marginBottom: 8,
  },
  placeholderOverlay: {
    position: 'absolute',
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',
  },
  placeholderStatic: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#797979',
  },
  placeholderAnimated: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: '#797979',
  },

  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
  },
  carouselWrapper: { marginTop: 25 },
  categoriesWrapper: { marginTop: 25 },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    marginBottom: 10,
  },
  spotlightTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    // paddingRight: 20,
    paddingLeft: 13,
    marginLeft: 0,
    marginRight: 0,
    flexDirection: 'row',
  },
  popularDealsWrapper: {
    marginTop: 25,
    paddingHorizontal: 20,
    flex: 1,
  },
  popularGrid: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 200,
  },
});
