import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {containerFull} from '../../Commoncss/pagecss';
import {formHead} from '../../Commoncss/formcss';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Followers_RandomPost from '../../Components/Followers_RandomPost';
import nopic from '../../../assets/user.png';

const My_userProfile = ({navigation}) => {
  const [userdata, setUserdata] = useState(null);
  const loadata = async () => {
    AsyncStorage.getItem('user')
      .then(async value => {
        // console.log('async user data', data);
        // setUserdata(JSON.parse(data));
        fetch('http://192.168.0.106:8000/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(value).token,
          },
          body: JSON.stringify({
            email: JSON.parse(value).user.email,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'User found') {
              setUserdata(data.user);
            } else {
              Alert.alert('SOmething went wrong, Login again');
              navigation.navigate('Login');
            }
          })
          .catch(err => navigation.navigate('Login'));
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    loadata();
  }, []);
  console.log('userdata', userdata);
  // const data = {
  //   username: 'shivang123',
  //   followers: 1100,
  //   following: 1500,
  //   description: 'I am a software developer and i love to code',
  //   profile_imge:
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
  //   posts: [
  //     {
  //       id: 1,
  //       post_image:
  //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
  //     },
  //     {
  //       id: 2,
  //       post_image:
  //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
  //     },
  //     {
  //       id: 3,
  //       post_image:
  //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
  //     },
  //     {
  //       id: 4,
  //       post_image:
  //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
  //     },
  //     {
  //       id: 5,
  //       post_image:
  //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
  //     },
  //   ],
  // };
  // console.log(data.posts);
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} page={'My_userProfile'} />
      <Bottomnavbar navigation={navigation} page={'My_userProfile'} />
      <Text style={styles.refresh} onPress={() => loadata()}>
        REFRESH
      </Text>

      {userdata ? (
        <ScrollView>
          <View style={styles.c1}>
            {userdata.profilepic.length > 0 ? (
              <Image
                style={styles.profile_pic}
                source={{uri: userdata.profilepic}}
              />
            ) : (
              <Image style={styles.profile_pic} source={nopic} />
            )}
            <Text style={styles.txt}> @{userdata.username}</Text>
            <View style={styles.c11}>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Followers</Text>
                <Text style={styles.txt2}>{userdata.followers.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Following</Text>
                <Text style={styles.txt2}>{userdata.following.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Posts</Text>
                <Text style={styles.txt2}>{userdata.posts.length}</Text>
              </View>
            </View>
            {userdata.description.length > 0 && (
              <Text style={styles.description}>{userdata.description}</Text>
            )}
          </View>
          {userdata.posts.length > 0 ? (
            <View style={styles.c1}>
              <Text style={styles.txt}>Your post</Text>
              <View style={styles.c13}>
                {userdata.posts.map((item, index) => {
                  return (
                    <Image
                      key={item.post}
                      style={styles.postpic}
                      source={{uri: item.post}}
                    />
                  );
                })}
              </View>
            </View>
          ) : (
            <View style={styles.c2}>
              <Text style={styles.txt1}>You Have Not Posted Anything</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </View>
  );
};

export default My_userProfile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 60,
  },
  c1: {
    width: '100%',
    alignItems: 'center',
  },
  profile_pic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#111111',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  txt1: {
    color: 'white',
    fontSize: 15,
  },
  txt2: {
    color: 'white',
    fontSize: 20,
  },
  c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  c111: {
    alignItems: 'center',
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: 'white',
  },
  description: {
    color: 'white',
    fontSize: 15,
    marginVertical: 10,
    backgroundColor: '#111111',
    width: '100%',
    padding: 10,
    paddingVertical: 20,
  },
  postpic: {
    width: '30%',
    height: 120,
    margin: 5,
  },

  c13: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },

  c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  refresh: {
    position: 'absolute',
    top: 80,
    right: 10,
    zIndex: 1,
    color: 'white',
    fontSize: 15,
  },
});
