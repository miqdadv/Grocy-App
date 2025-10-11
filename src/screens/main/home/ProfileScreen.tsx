import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomProfileHeader from '../../../components/header/CustomProfileHeader';
import firestore from '@react-native-firebase/firestore';
import OptionsCard from '../../../components/profile/OptionsCard';
import AdditionalOptionsCard from '../../../components/profile/AdditionalOptionsCard';
import LogoutModal from '../../../components/modal/LogoutModal';

const ProfileScreen = ({ navigation }: any) => {
  const [optionsData, setOptionsData] = useState<any[]>();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('profileOptions')
      .onSnapshot(snapshot => {
        const items: any[] = [];
        snapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setOptionsData(items);
      });
    return () => unsubscribe();
  }, []);

  console.log('OPTIONS DATA---->', optionsData?.[0].options);
  console.log(
    'ADDITIONAL OPTIONS ARE---->',
    optionsData?.[0].additionalOptions,
  );
 
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#607ddb48"
        translucent={false}
      />
      <CustomProfileHeader onBackPress={() => navigation.goBack()} />

      <View style={styles.optionsWrapper}>
        <FlatList
          data={optionsData?.[0].options || []}
          keyExtractor={item => item?.id}
          horizontal
          renderItem={({ item }) => <OptionsCard item={item} />}
        />
      </View>

      {/* card for additional options */}
      <View style={styles.additionalOptionsWrapper}>
        <AdditionalOptionsCard options={optionsData?.[0].additionalOptions || []} setIsLogoutModalVisible={setIsLogoutModalVisible}/>
      </View>
      {/* logout modal */}

      <LogoutModal isLogoutModalVisible={isLogoutModalVisible} setIsLogoutModalVisible={setIsLogoutModalVisible}/>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  optionsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 46,
  },
  additionalOptionsWrapper:{
    marginTop:46,
    marginHorizontal:13,
  }
});
