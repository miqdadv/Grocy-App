import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { fontFamily } from '../../utils/fontandIcons';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error?: any;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  secureTextEntry?: boolean;
  onPress?:()=>void
  showPassword?:boolean
};

const CustomInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  keyboardType,
  secureTextEntry,
  onPress,
  showPassword
}: Props) => {
    const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.inputContainer,{borderWidth:2,borderColor:isFocused?"#607DDB":'transparent'}]}>
      <Icon
        name={iconName}
        color="#607DDB"
        size={20}
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#c3c3c3ff"
        onChangeText={onChangeText}
        onBlur={(e)=>{
            setIsFocused(false)
            onBlur(e);
        }}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={()=>setIsFocused(true)}
      />
      {iconName === 'lock-closed' && (
        <TouchableOpacity
          onPress={onPress}
          style={styles.eyeIcon}
        >
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#607DDB"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 14,
    height: 50
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 17,
    color: '#000000',
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 4,
  },
});
