import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { fontFamily } from '../../utils/fontandIcons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

interface props {
  isLogoutModalVisible: any;
  setIsLogoutModalVisible: any;
}

const LogoutModal = ({
  isLogoutModalVisible,
  setIsLogoutModalVisible,
}: props) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>();

    const handleLogout = ()=>{
      dispatch(logout());
      setIsLogoutModalVisible(false);
      navigation.replace('AuthStack', { screen: 'Login' });
    }

  return (
    <Modal
      visible={isLogoutModalVisible}
      animationType="fade"
      onRequestClose={() => setIsLogoutModalVisible(false)}
      transparent
    >
      <TouchableWithoutFeedback onPress={() => setIsLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Logout</Text>
            </View>
            <Text style={styles.subTitle}>
              Are you sure you want to logout ?
            </Text>
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={()=>setIsLogoutModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutBtnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 0.2,
    borderColor: 'grey',
    borderRadius: 12,
    elevation:4
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: '#607DDB',
  },
  titleContainer: {
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey',
  },
  subTitle: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    marginTop: 16,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  logoutBtn: {
    padding: 12,
    backgroundColor: '#607DDB',
    borderRadius: 8,
    // elevation: 6,
  },
  cancelBtn: {
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#607DDB',
    borderRadius: 8,
    // elevation: 6,
  },
  cancelBtnText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: '#607DDB',
  },
  logoutBtnText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: '#fff',
  },
});
