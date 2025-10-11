import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { fontFamily } from '../../utils/fontandIcons';
import { auth as Auth } from '../../../services/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon lib

interface props {
  onBackPress: () => void;
}

const CustomProfileHeader = ({ onBackPress }: props) => {
  // const userName = Auth().currentUser?.displayName ?? '';
  // const userEmail = Auth().currentUser?.email ?? '';

  const [userName, setUserName] = useState(Auth().currentUser?.displayName);
  const [userEmail, setUserEmail] = useState(Auth().currentUser?.email);

   useEffect(() => {
    const unsubscribe = Auth().onUserChanged((user) => {
      if (user) {
        setUserName(user.displayName ?? '');
        setUserEmail(user.email ?? '');
      } else {
        setUserName('');
        setUserEmail('');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <TouchableOpacity onPress={onBackPress} style={styles.backIcon}>
            <FastImage
              source={require('../../assets/images/arrow.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.leftRow}>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <FastImage
              source={require('../../assets/images/menu.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* user details */}
      <View style={styles.userCredentials}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
    </View>
  );
};

export default CustomProfileHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#607ddb48',
    width: '100%',
    height: '32%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  row: {
    flexDirection: 'row',
    marginTop: 6,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrow: {
    height: 20,
    width: 20,
  },
  leftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
  },
  menuIcon: {
    height: 20,
    width: 20,
  },
  helpButton: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: '#607DDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpText: {
    fontFamily: fontFamily.bold,
    color: '#3967ffff',
    fontSize: 13,
  },
  userCredentials: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    // borderWidth:1
  },
  userName: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
  },
  userEmail: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: 'grey',
  },
  backIcon: {
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
