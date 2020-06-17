import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {useMutation} from '@apollo/client';
import {ADD_COMMENT, COMMENTS} from '../../graphql/productRequests';
import {getUserId} from '../../utils/asyncStorageHandler';

export default function AddComment({productId}) {
  const [userId, setUserId] = useState('');
  const [comment, setComment] = React.useState('');
  const [createComment] = useMutation(ADD_COMMENT, {
    update(cache, {data}) {
      const {comments} = cache.readQuery({
        query: COMMENTS,
        variables: {
          productId,
        },
      });
      cache.writeQuery({
        query: COMMENTS,
        variables: {
          productId,
        },
        data: {
          comments: [data.addComment.comment, ...comments],
        },
      });
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'Add Comment'}
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity
        style={styles.sendButton}
        disabled={!comment}
        onPress={async () => {
          await createComment({
            variables: {
              comment,
              productId,
              userId: userId,
            },
          });
          setComment('');
        }}>
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round">
          <Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  sendButton: {
    backgroundColor: 'orange',
    width: 60,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
