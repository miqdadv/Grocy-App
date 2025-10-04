import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../../components/header/CustomHeader';
import CustomEditFieldInput from '../../../components/inputs/CustomEditFieldInput';
import { fontFamily } from '../../../utils/fontandIcons';
import { auth as Auth } from '../../../../services/firebaseConfig';

const EditProfileScreen = ({ navigation }: any) => {
  const userName = Auth().currentUser?.displayName ?? undefined;
  const userEmail = Auth().currentUser?.email ?? undefined;

  const handleUpdateUsername = (updatedUserName: string) => {
    Auth().currentUser?.updateProfile({
      displayName: updatedUserName,
    });

    // 🔑 Reload the user to get fresh info
    Auth()?.currentUser?.reload();
  };

  const handleUpdateUserEmail = (updatedUserEmail: string) => {
    Auth().currentUser?.updateEmail(updatedUserEmail);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomHeader
          title="Edit Account"
          onBackPress={() => navigation.goBack()}
        />

        {/* input fields for name and email address */}
        <View style={styles.inputWrapper}>
          <CustomEditFieldInput
            fieldName={'NAME'}
            defaultValue={userName}
            onUpdate={val => handleUpdateUsername(val)}
          />
          <CustomEditFieldInput
            fieldName={'EMAIL ADDRESS'}
            defaultValue={userEmail}
            onUpdate={val => handleUpdateUserEmail(val)}
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 20,
  },
  inputWrapper: {
    marginTop: 40,
  },
});
