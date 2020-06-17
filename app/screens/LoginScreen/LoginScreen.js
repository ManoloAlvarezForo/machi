/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../constexts/AuthContext';
import {AuthContainer} from '../../components/AuthContainer/AuthContainer';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import FilledButton from '../../components/FilledButton/FilledButton';
import TextButton from '../../components/TextButton/TextButton';
import Error from '../../components/Error/Error';
import {useMutation} from '@apollo/client';
import {LOGIN} from '../../graphql/authRequests';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {saveUser} = useContext(AuthContext);
  const [login, {error}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      storageUser(data);
    },
    variables: {
      email: email,
      password: password,
    },
  });

  const storageUser = (dataParams) => {
    const {token, user} = dataParams.login;
    saveUser(user, token);
  };

  return (
    <AuthContainer>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Machi</Text>
      </View>
      <Heading style={styles.title}>Bienvenido</Heading>
      {error && <Error error={error.message} />}
      <Input
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />
      <Input
        value={password}
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />
      <FilledButton
        title="ingresar"
        style={styles.loginButton}
        onPress={login}
      />
      <TextButton
        title="Tienes una cuenta? create una."
        onPress={() => navigation.navigate('SignUp')}
      />
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 0,
    margin: 20,
    fontSize: 42,
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#ff4700',
  },
  logoText: {
    fontSize: 42,
    fontWeight: '700',
    color: 'white',
    // backgroundColor: '#ff4700',
    // paddingHorizontal: 20,
    // paddingVertical: 15,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 0,
    // borderBottomRightRadius: 25,
    // borderBottomLeftRadius: 0,
    // backgroundColor: '#e91e63',
  },
  title: {
    marginBottom: 32,
    // fontSize: 26,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
});

export default Login;
