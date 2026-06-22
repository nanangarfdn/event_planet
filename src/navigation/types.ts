import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Create: undefined;
  Credits: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  Main: undefined;
  EventDetail: {eventId: string};
  EnquiryChat: {eventId: string};
  Venues: undefined;
  VenueDetail: {venueId: string};
  Verify: undefined;
  FiuuPayment: {amount: number; eventName: string};
};

export type AppNav = NativeStackNavigationProp<AppStackParamList>;
export type AuthNav = NativeStackNavigationProp<AuthStackParamList>;
