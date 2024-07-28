export const RouteName = {
  HOME_TAB: 'home-tab',
  HOME: 'home',
  SHOPPING: 'shopping',
  BROWSER: 'browser',
} as const;

export type RootStackParamList = {
  [RouteName.HOME_TAB]: undefined;
  [RouteName.BROWSER]: {
    initialUrl: string;
  };
};
