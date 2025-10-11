import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { fontFamily } from '../../utils/fontandIcons';
import ReauthModal from '../modal/ReauthModal';

interface props {
  fieldName: string;
  defaultValue?: string;
  onUpdate?: (value: string) => void;
}

const CustomEditFieldInput = ({ fieldName, defaultValue = '', onUpdate }: props) => {
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);


  const handleCancel = () => {
    setValue(defaultValue);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldNameContainer}>
        <Text style={styles.fieldNameText}>{fieldName}</Text>
      </View>

      {/* Input + Edit button row */}
      <View style={styles.row}>
        <TextInput
          style={[
            styles.inputField,
            isEditing && styles.activeInput
          ]}
          value={value}
          onChangeText={(val)=>setValue(val)} 
          editable={isEditing}
        />

        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Update + Cancel buttons */}
      {isEditing && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.updateBtn, value === defaultValue && { backgroundColor: '#e6e6e6' }]}
            disabled={value === defaultValue}
            onPress={() => {
              onUpdate?.(value);
              setIsEditing(false);
            }}
          >
            <Text style={[styles.updateBtnText, value === defaultValue && { color: '#a9a9a9' }]}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomEditFieldInput;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 12,
    marginVertical: 8,
  },
  fieldNameContainer: {
    paddingHorizontal: 6,
    position: 'absolute',
    top: -10,
    left: 12,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  fieldNameText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: '#607DDB', // Orange label color
  },
  inputField: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    color: 'black',
    fontSize: 16,
    paddingVertical: 6,
  },
  activeInput: {
    borderBottomWidth: 2,
    borderColor: '#607DDB', // Orange underline on edit
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    justifyContent: 'space-between',
  },
  editText: {
    fontFamily: fontFamily.bold,
    color: '#607DDB',
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  updateBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: '#607DDB',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  updateBtnText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: '#fff',
  },
  cancelBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: '#c9d4fcff',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: '#607DDB',
  },
});
