import {Image, Text, View} from 'react-native';
import React from 'react';
import {useUserStore} from '../state/useStore';
import CustomSafeAreaView from '../components/global/CustomSafeAreaView';
import { getAbbrName } from '../utils/miscUtils';
import UserAvatar from '../components/ui/UserAvatar';

const DashboardScreen = () => {
  const {user} = useUserStore();
  console.log('user', user);
  return (
    <CustomSafeAreaView classStyle="px-2 py-1">
      <View className="flex-row items-center justify-between">
        <Image
          source={require('../assets/images/logo_text.png')}
          className="h-6 w-32 resize self-center"
        />
        <UserAvatar onPress={()=>{}} text={getAbbrName(user?.name || 'UN')}/>
      </View>
    </CustomSafeAreaView>
  );
};

export default DashboardScreen;
