import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, searchbar} from '../../Commoncss/pagecss';
import {formHead} from '../../Commoncss/formcss';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import Followers_RandomPost from '../../Components/Followers_RandomPost';
import UserCard from '../../Cards/UserCard';

const SearchUserPage = ({navigation}) => {
  let data = [
    {
      username: 'shiv',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
    },
    {
      username: 'shivang',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
    },
    {
      username: 'yash',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
    },
  ];

  const [keyword, setkeyword] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={'SearchuserPage'} />
      <TextInput
        placeholder="Search By Username..."
        style={searchbar}
        onChangeText={text => setkeyword(text)}
      />
      <ScrollView style={styles.userlists}>
        {data
          .filter(user => {
            if (keyword == '') {
              return null;
            } else if (
              user.username.toLowerCase().includes(keyword.toLowerCase())
            ) {
              return user;
            }
          })
          .map((item, index) => {
            return <UserCard key={item.username} user={item} />;
          })}
      </ScrollView>
    </View>
  );
};

export default SearchUserPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 60,
  },
  userlists: {
    width: '100%',
    marginTop: 20,
  },
});
