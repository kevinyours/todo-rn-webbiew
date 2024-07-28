import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList, RouteName} from '../routes';

type Props = NativeStackScreenProps<RootStackParamList>;

const styles = StyleSheet.create({
  safearea: {flex: 1},
});

export const HomeScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{uri: 'https://naver.com'}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={request => {
          console.log(request);
          if (
            request.url.startsWith('https://naver.com') ||
            request.mainDocumentURL?.startsWith('https://m.naver.com')
          ) {
            return true;
          }

          if (request.url !== null && request.url.startsWith('https://')) {
            navigation.navigate(RouteName.BROWSER, {initialUrl: request.url});
            return false;
          }

          return true;
        }}
      />
    </SafeAreaView>
  );
};
