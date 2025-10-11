// EditProfileScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import CustomHeader from '../../../components/header/CustomHeader';
import CustomEditFieldInput from '../../../components/inputs/CustomEditFieldInput';
import { fontFamily } from '../../../utils/fontandIcons';
import { auth as Auth } from '../../../../services/firebaseConfig';
import ReauthModal from '../../../components/modal/ReauthModal';
import SuccessModal from '../../../components/modal/SuccessModal';



const EditProfileScreen = ({ navigation }: any) => {
  const user = Auth().currentUser;
  const userName = user?.displayName ?? '';
  const userEmail = user?.email ?? '';

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [isReauthModalVisible, setIsReauthModalVisible] = useState(false);
  // const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  // const [reauthLoading, setReauthLoading] = useState(false);
  // const [reauthError, setReauthError] = useState<string | null>(null);

  const handleUpdateUsername = async (updatedUserName: string) => {
    try {
      await Auth().currentUser?.updateProfile({ displayName: updatedUserName });
      await Auth().currentUser?.reload();
      // Alert.alert('Success', 'Username updated successfully');
     setShowSuccessModal(true);
    } catch (err: any) {
      console.error('update username error', err);
      Alert.alert('Error', err?.message ?? 'Failed to update username');
    }
  };

  // called when user presses "Update" on the email field (before reauth)
  // const handleReauthModal = (updatedUserEmail: string) => {
  //   setPendingEmail(updatedUserEmail);
  //   setReauthError(null);
  //   setIsReauthModalVisible(true);
  // };

  // called by the ReauthModal when user enters password + presses Update
  // const handleConfirmReauth = async (password: string) => {
  //   if (!pendingEmail) return;
  //   const currentUser = Auth().currentUser;
  //   if (!currentUser || !currentUser.email) {
  //     Alert.alert('Error', 'No logged in user found.');
  //     return;
  //   }

  //   setReauthLoading(true);
  //   setReauthError(null);

  //   try {
  //     const credential = Auth.EmailAuthProvider.credential(currentUser.email, password);
  //     // Reauthenticate
  //    await currentUser.reauthenticateWithCredential(credential);

  //     // Now update email
  //     await currentUser.updateEmail(pendingEmail);

  //     // Reload to get fresh info
  //     await currentUser.reload();

  //     setIsReauthModalVisible(false);
  //     setPendingEmail(null);
  //     Alert.alert('Success', 'Email updated successfully');
  //   } catch (error: any) {
  //     console.error('Reauth / update email error:', error);
  //     // friendly messages for common Firebase errors
  //     let msg = error?.message ?? 'Failed to update email';
  //     if (error?.code === 'auth/wrong-password') msg = 'Incorrect password — please try again.';
  //     else if (error?.code === 'auth/invalid-email') msg = 'Invalid email address.';
  //     else if (error?.code === 'auth/email-already-in-use') msg = 'This email is already in use.';
  //     else if (error?.code === 'auth/requires-recent-login') msg = 'Please sign in again and try.';
  //     setReauthError(msg);
  //     // keep modal open so user can retry; also show alert
  //     // you can choose to only show the inline error instead of alert:
  //     Alert.alert('Error', msg);
  //   } finally {
  //     setReauthLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomHeader title="Edit Account" onBackPress={() => navigation.goBack()} />

        <View style={styles.inputWrapper}>
          <CustomEditFieldInput
            fieldName={'NAME'}
            defaultValue={userName}
            onUpdate={val => handleUpdateUsername(val)}
          />
          {/* <CustomEditFieldInput
            fieldName={'EMAIL ADDRESS'}
            defaultValue={userEmail}
            onUpdate={val => handleReauthModal(val)}
          /> */}
        </View>
      </View>
{/* 
      <ReauthModal
        isModalVisible={isReauthModalVisible}
        setIsModalVisible={setIsReauthModalVisible}
        onConfirm={handleConfirmReauth}
        loading={reauthLoading}
        errorMessage={reauthError}
      /> */}
      <SuccessModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  wrapper: { flex: 1, marginHorizontal: 20 },
  inputWrapper: { marginTop: 40 },
});
