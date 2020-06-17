/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AuthContext} from '../../constexts/AuthContext';
import {AuthContainer} from '../../components/AuthContainer/AuthContainer';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import FilledButton from '../../components/FilledButton/FilledButton';
import Error from '../../components/Error/Error';
import IconButton from '../../components/IconButton/IconButton';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {login} = useContext(AuthContext);

  return (
    <AuthContainer>
      <Heading style={styles.title}>Registro</Heading>
      <IconButton
        color="#ff4700"
        style={styles.closeIcon}
        name={'close-circle-outline'}
        onPress={() => navigation.pop()}
      />
      <Error error={''} />
      <Input
        value={name}
        onChangeText={(value) => setName(value)}
        placeholder="Name"
        style={styles.input}
      />
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
      <Input
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
        placeholder="Confirm password"
        style={styles.input}
        secureTextEntry
      />
      <FilledButton
        title="registrar"
        style={styles.loginButton}
        onPress={() => login()}
      />
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     flex: 1,
  //     padding: 16,
  //     // backgroundColor: 'black',
  //     margin: 10,
  //     borderRadius: 8,
  //   },
  title: {
    marginBottom: 48,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  closeIcon: {
    position: 'absolute',
    top: 30,
    right: 16,
  },
});

export default SignUp;
