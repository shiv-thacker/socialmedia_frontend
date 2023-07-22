import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Screens/LoginSignup/Login/Login';
import Signup_EnterEmail from './src/Screens/LoginSignup/SIgnup/Signup_EnterEmail';
import Signup_EnterVerificationCode from './src/Screens/LoginSignup/SIgnup/Signup_EnterVerificationCode';
import Signup_ChoosePassword from './src/Screens/LoginSignup/SIgnup/Signup_ChoosePassword';
import Signup_ChooseUsername from './src/Screens/LoginSignup/SIgnup/Signup_chooseUsername';
import Signup_Accountcreated from './src/Screens/LoginSignup/SIgnup/Signup_Accountcreated';
import ForgotPassword_EnterEmail from './src/Screens/LoginSignup/Forgotpassword/ForgotPassword_EnterEmail';
import ForgotPassword_EnterVerificationCode from './src/Screens/LoginSignup/Forgotpassword/ForgotPassword_EnterVerificationCode';
import ForgotPassword_ChoosePassword from './src/Screens/LoginSignup/Forgotpassword/ForgotPassword_ChoosePassword';
import ForgotPassword_AccountRecovered from './src/Screens/LoginSignup/Forgotpassword/ForgotPassword_AccountRecovered';
import MainPage from './src/Screens/Mainpage/Mainpage';
import All_Chats from './src/Screens/ChatSection/All_Chats';
import SearchUserPage from './src/Screens/Mainpage/SearchUserPage';
import NotificationPage from './src/Screens/Mainpage/NotificationPage';
import My_userProfile from './src/Screens/Profile/My_userProfile';
import Settings1 from './src/Screens/Settings.js/Settings1';
import ChangePassword from './src/Screens/Settings.js/ChangePassword';
import EditProfile from './src/Screens/Settings.js/EditProfile';
import ChangeUsername from './src/Screens/Settings.js/ChangeUsername';
import ChangeDescription from './src/Screens/Settings.js/ChangeDescription';
import UploadProfilePicture from './src/Screens/Settings.js/UploadProfilePicture';
import AddPost from './src/Screens/Mainpage/AddPost';
import Other_profile from './src/Screens/Profile/Other_profile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{animation: 'slide_from_right', headerShown: false}}>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen
          name="Login"
          component={Login}
          // options={{
          //   animation: 'slide_from_left',
          // }}
        />
        <Stack.Screen name="Signup_EnterEmail" component={Signup_EnterEmail} />
        <Stack.Screen
          name="Signup_EnterVerificationCode"
          component={Signup_EnterVerificationCode}
        />

        <Stack.Screen
          name="Signup_ChooseUsername"
          component={Signup_ChooseUsername}
        />
        <Stack.Screen
          name="Signup_ChoosePassword"
          component={Signup_ChoosePassword}
        />
        <Stack.Screen
          name="Signup_Accountcreated"
          component={Signup_Accountcreated}
        />
        <Stack.Screen
          name="ForgotPassword_EnterEmail"
          component={ForgotPassword_EnterEmail}
        />

        <Stack.Screen
          name="ForgotPassword_EnterVerificationCode"
          component={ForgotPassword_EnterVerificationCode}
        />
        <Stack.Screen
          name="ForgotPassword_ChoosePassword"
          component={ForgotPassword_ChoosePassword}
        />
        <Stack.Screen
          name="ForgotPassword_AccountRecovered"
          component={ForgotPassword_AccountRecovered}
        />

        <Stack.Screen
          name="All_Chats"
          component={All_Chats}
          options={{animation: 'slide_from_left'}}
        />

        <Stack.Screen
          name="SearchUserPage"
          component={SearchUserPage}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen name="NotificationPage" component={NotificationPage} />
        <Stack.Screen
          name="My_userProfile"
          component={My_userProfile}
          options={{animation: 'slide_from_left'}}
        />
        <Stack.Screen name="Settings1" component={Settings1} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
        <Stack.Screen name="ChangeDescription" component={ChangeDescription} />
        <Stack.Screen
          name="UploadProfilePicture"
          component={UploadProfilePicture}
        />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="Other_profile" component={Other_profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
