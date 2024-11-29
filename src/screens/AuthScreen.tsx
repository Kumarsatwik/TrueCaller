import {Image, Keyboard, KeyboardAvoidingView, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomSafeAreaView from '../components/global/CustomSafeAreaView';
import CustomInput from '../components/ui/CustomInput';
import CustomButton from '../components/ui/CustomButton';
import {login} from '../service/authService';
import {navigate, resetAndNavigate} from '../utils/NavigationUtils';

const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await login(phoneNumber);
      resetAndNavigate('DashboardScreen');
    } catch (error) {
      navigate('RegisterScreen', {phone: phoneNumber});
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      keyboardVerticalOffset={10}
      behavior="padding">
      <CustomSafeAreaView classStyle="py-2 px-2 ">
        <Image
          source={require('../assets/logo_text.png')}
          className="h-6 w-32 resize self-center"
        />
        <Text className="mt-6  font-semibold text-lg text-text">
          Enter your phone number
        </Text>

        <Text className="mb-6 mt-2 text-md text-text">
          Truecaller will send you a one-time password via SMS to verify your
          phone
        </Text>

        <CustomInput
          label="Phone number (+91)"
          value={phoneNumber}
          maxLength={10}
          keyboardType="number-pad"
          placeholder="Your phone number"
          onChangeText={setPhoneNumber}
        />
        <View className="bottom-1 absolute w-full self-center">
          <CustomButton
            title="Continue"
            onPress={handleAuth}
            loading={loading}
          />
        </View>
      </CustomSafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
