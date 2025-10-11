import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { fontFamily } from '../../utils/fontandIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addOrderFromCart, clearCart } from '../../redux/slices/cartSlice';

interface props {
  showPaymentModal: any;
  setShowPaymentModal: any;
  modalType: any;
}

const PaymentSuccessModal = ({
  showPaymentModal,
  setShowPaymentModal,
  modalType,
}: props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const cartProducts = useSelector((state:RootState)=>state.cart.items);

  const handlePress = ()=>{
    setShowPaymentModal(false);
    if(modalType==='success'){
      dispatch(addOrderFromCart());
      navigation.navigate('OrdersScreen');
    }
  }
  return (
    <Modal visible={showPaymentModal} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={() => setShowPaymentModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {modalType === 'success' && (
              <LottieView
                source={require('../../assets/animations/congratulation.json')}
                autoPlay
                loop={false}
                style={styles.cngrtsAni}
              />
            )}
            <LottieView
              source={modalType === 'success' ? require('../../assets/animations/paymentComplete.json') : require('../../assets/animations/paymentFail.json')}
              autoPlay
              loop={false}
              style={modalType === 'success' ? styles.successAnimation : styles.failAnimation}
            />

            <Text style={styles.title}>
              {modalType === 'success'
                ? 'Payment Successfull'
                : 'Payment Failed'}
            </Text>
            <Text style={styles.msg}>
              {modalType === 'success'
                ? 'Congratulations, your payment has been processed successfully.'
                : 'Looks like something went wrong.'}
            </Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={handlePress}
            >
              <Text style={styles.btnText}>
                {modalType === 'success' ? 'Continue' : 'Try Again'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PaymentSuccessModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 0.2,
    borderColor: 'grey',
    borderRadius: 12,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 18,
  },
  successAnimation: {
    height: 150,
    width: 150,
  },
  failAnimation:{
   height:110,
   width:110
  },
  cngrtsAni: {
    height: 170,
    width: 170,
    position: 'absolute',
    top: -1,
  },
  title: {
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    // color:'#607DDB',
    fontSize: 22,
  },
  msg: {
    textAlign: 'center',
    fontFamily: fontFamily.semiBold,
    color: 'grey',
    fontSize: 13,
  },
  btn: {
    backgroundColor: '#607DDB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  btnText: {
    fontFamily: fontFamily.semiBold,
    color: '#fff',
    fontSize: 17,
  },
});
