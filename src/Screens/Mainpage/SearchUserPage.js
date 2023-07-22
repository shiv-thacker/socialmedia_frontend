import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {containerFull, searchbar} from '../../Commoncss/pagecss';
import {formHead, formHead2} from '../../Commoncss/formcss';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import Followers_RandomPost from '../../Components/Followers_RandomPost';
import UserCard from '../../Cards/UserCard';

const SearchUserPage = ({navigation}) => {
  // let data = [
  //   {
  //     username: 'shiv',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
  //   },
  //   {
  //     username: 'shivang',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
  //   },
  //   {
  //     username: 'yash',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
  //   },
  // ];

  const [keyword, setkeyword] = useState('');
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getallusers = async () => {
    if (keyword.length > 0) {
      setloading(true);
      fetch('http://192.168.0.106:8000/searchuser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({keyword: keyword}),
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          if (data.error) {
            setData([]); //DON't forget to put setdata null, otherwise it shows previous data
            setError(data.error);
            setloading(false);
          } else if (data.message == 'user found') {
            setError(null); // It's also that much necessary
            setData(data.user);
            setloading(false);
          }
        })
        .catch(err => {
          setData([]);
          setloading(false);
        });
    } else {
      setData([]);
      setError(null);
    }
  };

  useEffect(() => {
    getallusers();
  }, [keyword]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={'SearchUserPage'} />
      <TextInput
        placeholder="Search By Username..."
        style={searchbar}
        onChangeText={text => setkeyword(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          {/* tecticts are necessary when we apply {} in other condition */}
          {error ? (
            <Text style={formHead2}> {error}</Text>
          ) : (
            <ScrollView style={styles.userlists}>
              {
                /* {data
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
          })} */

                data.map((item, index) => {
                  return (
                    <UserCard
                      key={item.username}
                      user={item}
                      navigation={navigation}
                    />
                  );
                })
              }
            </ScrollView>
          )}
        </>
      )}
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
