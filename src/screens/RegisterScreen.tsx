import {Alert, Image, Keyboard, ScrollView, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import CustomSafeAreaView from '../components/global/CustomSafeAreaView';
import CustomInput from '../components/ui/CustomInput';
import CustomButton from '../components/ui/CustomButton';
import {signup} from '../service/authService';
import {resetAndNavigate} from '../utils/NavigationUtils';
import {RouteProp, useRoute} from '@react-navigation/native';

type RegisterScreenRoute = {
  phone: number;
};

type RegisterScreenRouteProp = RouteProp<
  {RegisterScreen: RegisterScreenRoute},
  'RegisterScreen'
>;

const RegisterScreen: FC = () => {
  const route = useRoute<RegisterScreenRouteProp>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const name = firstName + ' ' + lastName;
      await signup(route.params.phone, email, name);
      resetAndNavigate('DashboardScreen');
    } catch (error) {
      console.log('error', error);
      Alert.alert('Something went wrong ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView classStyle="py-2 px-2 ">
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Image
          source={require('../assets/logo_text.png')}
          className="h-6 w-32 resize self-center"
        />
        <Text className="mt-6  font-semibold text-lg text-text">
          Create Profile
        </Text>

        <Text className="mb-6 mt-2 text-md text-text">
          Your name and profile picture will be used for caller ID
        </Text>

        <CustomInput
          label="First Name"
          value={firstName}
          placeholder="Enter First Name"
          onChangeText={setFirstName}
        />

        <CustomInput
          label="Last Name"
          value={lastName}
          placeholder="Enter Last Name"
          onChangeText={setLastName}
        />

        <CustomInput
          label="Email"
          value={email}
          placeholder="Enter Emaill Address"
          onChangeText={setEmail}
        />
        <CustomInput
          label="Phone number (+91)"
          value={phoneNumber}
          maxLength={10}
          keyboardType="number-pad"
          placeholder="Your phone number"
          onChangeText={setPhoneNumber}
        />

        <View className="mt-8 w-full self-center">
          <CustomButton
            title="Continue"
            onPress={handleRegister}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default RegisterScreen;
