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

interface props {
  showSuccessModal: any;
  setShowSuccessModal: any;
}

const SuccessModal = ({ showSuccessModal, setShowSuccessModal }: props) => {
  return (
    <Modal visible={showSuccessModal} animationType="fade" transparent>
      <TouchableWithoutFeedback>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Username</Text>
            </View>

            <View style={styles.msgContainer}>
              <Text style={styles.msg}>Username Updated Successfully🎉</Text>
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={()=>setShowSuccessModal(false)}>
                <Text style={styles.btnText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SuccessModal;

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
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
  },
  titleContainer: {
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey',
  },
  msgContainer: {
    marginTop: 12,
    maxWidth: 190,
  },
  msg: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: '#607DDB',
    textAlign: 'center',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10
    // marginBottom:8
  },
  btn: {
    paddingVertical:6,
    paddingHorizontal: 12,
    backgroundColor: '#607DDB',
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center'
  },
  btnText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: '#fff',
  },
});
