import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicatorBase,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Post_Big_Card from '../Cards/Post_Big_Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Followers_RandomPost = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    loaddata();
  }, [1]);

  const loaddata = () => {
    AsyncStorage.getItem('user')
      .then(async value => {
        setloading(true);
        fetch('http://192.168.0.106:8000/getposts', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({useremail: JSON.parse(value).user.email}),
        })
          .then(res => res.json())
          .then(data1 => {
            console.log('code is reaching after response generated');
            if (data1.message === 'got the post') {
              console.log('post details', data1);
              setloading(false);
              setData(data1);
              Alert.alert('data fetched');
            } else {
              setloading(false);
              Alert.alert(`${data1.error}`);
            }
          })
          .catch(err => {
            setloading(false);
            console.log('error is ', err);
            Alert.alert(`response is not comming : ${err}`);
          });
      })

      .catch(err => {
        setloading(false);
        Alert.alert('error async storag');
      });
  };

  // console.log('data =', data);

  // const newdata = data.friendposts;
  //console.log('new data', newdata[0].posts.post);
  // let data = [
  //   {
  //     id: 1,
  //     username: 'user1_123',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
  //     likes: ['harshal_123', 'viraj_123'],

  //     comments: [
  //       {
  //         id: 1,
  //         username: 'harshal_123',
  //         comment: 'nice post',
  //       },
  //       {
  //         id: 2,
  //         username: 'viraj_123',
  //         comment: 'nice post',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     username: 'user2_123',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
  //     likes: ['harshal_123', 'viraj_123'],

  //     comments: [
  //       {
  //         id: 1,
  //         username: 'harshal_123',
  //         comment: 'nice post',
  //       },
  //       {
  //         id: 2,
  //         username: 'viraj_123',
  //         comment: 'nice post',
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     username: 'user3_123',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
  //     likes: ['harshal_123', 'viraj_123'],

  //     comments: [
  //       {
  //         id: 1,
  //         username: 'harshal_123',
  //         comment: 'nice post',
  //       },
  //       {
  //         id: 2,
  //         username: 'viraj_123',
  //         comment: 'nice post',
  //       },
  //     ],
  //   },
  // ];
  //console.log(data[0].username);
  return (
    // ... other code ...

    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'white'} />
      ) : (
        <>
          <View>
            {data.friendpostss && data.friendpostss.length > 0 ? (
              data.friendpostss.map(item => (
                <Post_Big_Card
                  key={item.post}
                  username={item.username}
                  profile_image={item.profilepic}
                  post_image={item.post}
                  likes={item.likes}
                  comments={item.comments}
                />
              ))
            ) : (
              <Text style={{color: 'white', fontSize: 20}}>
                No posts available.
              </Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Followers_RandomPost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'column',
  },
});
