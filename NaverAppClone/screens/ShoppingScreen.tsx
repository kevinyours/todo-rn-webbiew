import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList, RouteName} from '../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList>;

export const ShoppingScreen: FC<Props> = ({navigation}) => {
  return (
    <View>
      <Text>Shopping</Text>
      <TouchableOpacity
        onPress={({}) =>
          navigation.navigate(RouteName.BROWSER, {
            initialUrl: 'https://m.naver.com',
          })
        }>
        <Text>Go To Browser</Text>
      </TouchableOpacity>
      <MaterialCommunityIcons name="shopping" size={50} color={'teal'} />
    </View>
  );
};
