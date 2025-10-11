// ReauthModal.tsx
import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import { fontFamily } from '../../utils/fontandIcons';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (v: boolean) => void;
  onConfirm: (password: string) => void; // returns password to parent
  loading?: boolean;
  errorMessage?: string | null;
}

const ReauthModal = ({ isModalVisible, setIsModalVisible, onConfirm, loading = false, errorMessage = null }: Props) => {
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isModalVisible) {
      setPassword('');
      setIsFocused(false);
    }
  }, [isModalVisible]);

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        {/* Backdrop - clicking it closes modal */}
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Modal content */}
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Update Email</Text>
          </View>

          <Text style={styles.subTitle}>Do you want to update your email?</Text>
          <Text style={styles.msg}>Please enter your password to continue</Text>

          {/* Password Input */}
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.passwordInput,
              isFocused && {
                borderColor: '#607DDB',
                borderWidth: 1.5,
              },
            ]}
            editable={!loading}
          />

          {/* show error passed from parent */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          {/* Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              disabled={loading}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.updateBtn,
                (password.length < 1 || loading) && { backgroundColor: 'grey' },
              ]}
              disabled={password.length < 1 || loading}
              onPress={() => onConfirm(password)}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.updateBtnText}>Update</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReauthModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 6,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: '#607DDB',
  },
  titleContainer: {
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey',
    paddingBottom: 6,
    marginBottom: 8,
  },
  subTitle: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    marginTop: 8,
  },
  msg: {
    fontFamily: fontFamily.medium,
    color: 'grey',
    fontSize: 13,
    marginTop: 8,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontFamily: fontFamily.medium,
    fontSize: 15,
    marginTop: 12,
    color: 'black',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  updateBtn: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    backgroundColor: '#607DDB',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#607DDB',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: '#607DDB',
  },
  updateBtnText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: '#fff',
  },
  errorText: {
    marginTop: 8,
    color: '#cc3b3b',
    fontFamily: fontFamily.medium,
    fontSize: 13,
  },
});
