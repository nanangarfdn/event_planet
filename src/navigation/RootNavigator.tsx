import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppTabs} from './AppTabs';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {EventDetailScreen} from '../screens/explore/EventDetailScreen';
import {EnquiryChatScreen} from '../screens/chat/EnquiryChatScreen';
import {VenueListScreen} from '../screens/venue/VenueListScreen';
import {VenueDetailScreen} from '../screens/venue/VenueDetailScreen';
import {VerifyScreen} from '../screens/profile/VerifyScreen';
import {FiuuPaymentScreen} from '../screens/payment/FiuuPaymentScreen';
import {useAuth} from './AuthContext';
import type {AppStackParamList, AuthStackParamList} from './types';
import {colors} from '../theme';

const AppStack = createNativeStackNavigator<AppStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const headerStyle = {
  headerTintColor: colors.text,
  headerStyle: {backgroundColor: colors.bg},
  headerShadowVisible: false,
};

// The auth gate: swap the whole navigator tree on sign-in/out.
export function RootNavigator() {
  const {isAuthed} = useAuth();

  if (!isAuthed) {
    return (
      <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
      </AuthStack.Navigator>
    );
  }

  return (
    <AppStack.Navigator screenOptions={headerStyle}>
      <AppStack.Screen name="Main" component={AppTabs} options={{headerShown: false}} />
      <AppStack.Screen name="EventDetail" component={EventDetailScreen} options={{title: 'Event'}} />
      <AppStack.Screen name="EnquiryChat" component={EnquiryChatScreen} options={{title: 'Enquiry'}} />
      <AppStack.Screen name="Venues" component={VenueListScreen} options={{title: 'Venues'}} />
      <AppStack.Screen name="VenueDetail" component={VenueDetailScreen} options={{title: 'Venue'}} />
      <AppStack.Screen name="Verify" component={VerifyScreen} options={{title: 'Verify'}} />
      <AppStack.Screen name="FiuuPayment" component={FiuuPaymentScreen} options={{title: 'Payment'}} />
    </AppStack.Navigator>
  );
}
