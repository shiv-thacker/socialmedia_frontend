import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Post_Big_Card from '../Cards/Post_Big_Card';

const Followers_RandomPost = () => {
  let data = [
    {
      id: 1,
      username: 'user1_123',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
      likes: ['harshal_123', 'viraj_123'],

      comments: [
        {
          id: 1,
          username: 'harshal_123',
          comment: 'nice post',
        },
        {
          id: 2,
          username: 'viraj_123',
          comment: 'nice post',
        },
      ],
    },
    {
      id: 2,
      username: 'user2_123',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
      likes: ['harshal_123', 'viraj_123'],

      comments: [
        {
          id: 1,
          username: 'harshal_123',
          comment: 'nice post',
        },
        {
          id: 2,
          username: 'viraj_123',
          comment: 'nice post',
        },
      ],
    },
    {
      id: 3,
      username: 'user3_123',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPa10hhWbcRmKjub3g5pRIj7gaaOMExq_XMfY1zCiuxbrDpA&s',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
      likes: ['harshal_123', 'viraj_123'],

      comments: [
        {
          id: 1,
          username: 'harshal_123',
          comment: 'nice post',
        },
        {
          id: 2,
          username: 'viraj_123',
          comment: 'nice post',
        },
      ],
    },
  ];
  console.log(data[0].username);
  return (
    <ScrollView style={styles.container}>
      {data.map(item => {
        return (
          <Post_Big_Card
            key={item.id}
            username={item.username}
            profile_image={item.profile_image}
            post_image={item.image}
            likes={item.likes}
            comments={item.comments}
          />
        );
      })}
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
