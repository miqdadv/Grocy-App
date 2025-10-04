import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { fontFamily } from '../../utils/fontandIcons';

interface props{
    isMenuVisible:any,
    setIsMenuVisible:any,
    setIsConfirmModalVisible:any,
}

const MenuModal = ({isMenuVisible,setIsMenuVisible,setIsConfirmModalVisible}:props) => {
    const handlePress = ()=>{
        setIsMenuVisible(false);
        setIsConfirmModalVisible(true);
    }
  return (
    <Modal
      visible={isMenuVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsMenuVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.dropDownMenu} onPress={handlePress}>
            <View style={styles.row}>
              <Text style={styles.clearCartText}>Clear Cart</Text>
              <FastImage source={require('../../assets/images/trash.png')} style={styles.trashIcon} resizeMode='contain'/>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MenuModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropDownMenu: {
    position: 'absolute',
    top: 46,
    right: 27,
    backgroundColor: 'white',
    paddingVertical: 13,
    paddingHorizontal:15,
    borderRadius: 15,
    elevation: 6,
  },
  trashIcon:{
    height:16,
    width:16,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:7
  },
  clearCartText:{
    fontFamily:fontFamily.medium,
    fontSize:13,
    color:'grey',
    marginTop:3
  }
});
