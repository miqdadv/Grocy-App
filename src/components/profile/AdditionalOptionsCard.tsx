import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fontFamily } from '../../utils/fontandIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';

interface props {
  options: any;
  setIsLogoutModalVisible:any;
}

const AdditionalOptionsCard = ({ options, setIsLogoutModalVisible}: props) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = (item: any) => {
    if (item?.option_type === 'edit_profile') {
      navigation.navigate('EditProfileScreen')
    } else if (item?.option_type === 'favourites') {
      navigation.navigate('Favorite');
    } else if (item?.option_type === 'logout') {
    //   dispatch(logout());
      setIsLogoutModalVisible(true);
    //   navigation.replace('AuthStack', { screen: 'Login' });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        keyExtractor={item => item?.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handlePress(item)}
          >
            {/* left row */}
            <View style={styles.leftRow}>
              <Icon
                name={item?.icon_name}
                size={30}
                color={item?.option_type === 'logout' ? 'red' : ''}
              />
              <Text style={styles.optionTitle}>{item?.option_title}</Text>
            </View>

            {/* right row */}
            <Icon name="arrow-right" size={24} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AdditionalOptionsCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 0.1,
    borderColor: 'grey',
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 6,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    alignItems: 'center',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionTitle: {
    fontFamily: fontFamily.medium,
    color: 'grey',
    fontSize: 16,
  },
});
