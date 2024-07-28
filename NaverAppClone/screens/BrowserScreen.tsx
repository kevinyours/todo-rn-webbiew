import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useMemo, useRef, useState} from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'browser'>;

const styles = StyleSheet.create({
  safeare: {flex: 1, backgroundColor: 'black'},
  urlContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  urlText: {
    color: 'white',
  },
  loadingBarBackground: {
    height: 3,
    backgroundColor: 'white',
  },
  loadingBar: {
    width: '50%',
    height: '100%',
    backgroundColor: 'green',
  },
  navigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: 'black',
  },
  button: {
    width: 30,
    height: 30,
    padding: 4,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  naverIconOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'black',
  },
  naverIconText: {
    color: 'white',
  },
});

const NavButton = ({
  iconName,
  disabled,
  onPress,
}: {
  iconName: string;
  disabled?: boolean;
  onPress?: () => void;
}) => {
  const color = disabled ? 'gray' : 'white';

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} color={color} size={24} />
    </TouchableOpacity>
  );
};

export const BrowserScreen: FC<Props> = ({route, navigation}) => {
  const {initialUrl} = route.params;
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace('https://', '').split('/')[0],
    [url],
  );

  const progressAnim = useRef(new Animated.Value(0)).current;
  const webviewRef = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  return (
    <SafeAreaView style={styles.safeare}>
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      <View style={styles.loadingBarBackground}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <WebView
        ref={webviewRef}
        source={{uri: initialUrl}}
        onNavigationStateChange={event => {
          setUrl(event.url);
          setCanGoBack(event.canGoBack);
          setCanGoForward(event.canGoForward);
        }}
        onLoadProgress={event => {
          progressAnim.setValue(event.nativeEvent.progress);
        }}
        onLoadEnd={() => {
          progressAnim.setValue(0);
        }}
      />
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <View style={styles.naverIconOutline}>
            <Text style={styles.naverIconText}>N</Text>
          </View>
        </TouchableOpacity>
        <NavButton
          disabled={!canGoBack}
          iconName="arrow-left"
          onPress={() => {
            webviewRef.current?.goBack();
          }}
        />
        <NavButton
          disabled={!canGoForward}
          iconName="arrow-right"
          onPress={() => {
            webviewRef.current?.goForward();
          }}
        />
        <NavButton
          iconName="refresh"
          onPress={() => {
            webviewRef.current?.reload();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
