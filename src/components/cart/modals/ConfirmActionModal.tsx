import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { fontFamily } from '../../../utils/fontandIcons';
import CustomButton from '../../buttons/CustomButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { clearCart } from '../../../redux/slices/cartSlice';

interface props {
  isConfirmModalVisible: any;
  setIsConfirmModalVisible: any;
}

const ConfirmActionModal = ({
  isConfirmModalVisible,
  setIsConfirmModalVisible,
}: props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClearCart = () => {
    setIsConfirmModalVisible(false);
    dispatch(clearCart());
  };

  return (
    <Modal
      visible={isConfirmModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsConfirmModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsConfirmModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.confirmContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.modalTitle}>Clear your cart?</Text>
            </View>
            <Text style={styles.modalSubtitle}>
              Would you like to remove all items from your cart?
            </Text>
            <View style={styles.buttonRow}>
              {/* <CustomButton
                title="Cancel"
                style={styles.cancelBtn}
                textStyle={styles.cancelText}
                onPress={() => setIsConfirmModalVisible(false)}
              />
              <CustomButton title="Clear Cart" onPress={handleClearCart} /> */}

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsConfirmModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={handleClearCart}
              >
                <Text style={styles.logoutBtnText}>Clear Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmActionModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    elevation: 6,
    width: Dimensions.get('screen').width * 0.85,
  },
  modalTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    // marginBottom:1,
  },
  modalSubtitle: {
    marginTop: 16,
    fontFamily: fontFamily.regular,
    fontSize: 15,
  },
  buttonRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
  titleContainer: {
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey',
  },
});
