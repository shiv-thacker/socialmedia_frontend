import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {containerFull, goback} from '../../../Commoncss/pagecss';
import Icon from 'react-native-vector-icons/AntDesign';

const Signup_EnterEmail = ({navigation}) => {
  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={goback}>
        <Icon name="UpOutlined" color="grey" size={30} />
        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            marginLeft: 5,
            fontWeight: 'bold',
          }}>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup_EnterEmail;

const styles = StyleSheet.create({});
