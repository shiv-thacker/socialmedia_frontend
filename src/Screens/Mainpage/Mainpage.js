import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerFull} from '../../Commoncss/pagecss';
import {formHead} from '../../Commoncss/formcss';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';

const MainPage = ({navigation}) => {
  return (
    <View style={containerFull}>
      <StatusBar />
      <TopNavbar />
      <Bottomnavbar />

      <Text style={formHead}>MainPage</Text>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({});
