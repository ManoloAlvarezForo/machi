import AsyncStorage from '@react-native-community/async-storage';

/**
 * Authentication keyword for the localstorage.
 */
const AUTH_TOKEN = 'AUTH_TOKEN';

/**
 * Gets the token value from the LocalStorage.
 */
export const getToken = async () => {
  return await AsyncStorage.getItem(AUTH_TOKEN);
};

/**
 * Storages the new token in the localstorage.
 *
 * @param {string} newToken Value that represents the new token.
 */
export const saveToken = async (newToken) => {
  return await AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

/**
 * Storages the user information and the token in the localstorage.
 *
 * @param {string} token string that represents a token.
 * @param {object} user object with user information.
 */
export const saveUserInformation = async (token, user) => {
  const name = ['@user_name', user.name];
  const email = ['@user_email', user.email];
  const id = ['@user_id', user.id];
  const newToken = [AUTH_TOKEN, token];

  try {
    await AsyncStorage.multiSet([name, email, id, newToken]);
  } catch (error) {
    console.log(`Error to localstorage [${error}]`);
  }
};

export const getUserId = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_id');
    if (value !== null) {
      // value previously stored
    }
    return value;
  } catch (e) {
    console.log('[Error]: Error to get user id.');
  }
};

/**
 * Gets a property from the localstorage.
 *
 * @param {string} property string that represent the a property.
 */
export const getStorageProperty = async (property) => {
  try {
    return await AsyncStorage.getItem(property);
  } catch (error) {
    console.log(`Error to get a property [${error}]`);
    return null;
  }
};

/**
 * Removes the authentication token from the localstorage.
 */
export const signOut = async () => {
  const keys = ['@user_name', '@user_email', '@user_id', AUTH_TOKEN];
  try {
    const response = await AsyncStorage.multiRemove(keys);
    const allKeys = await AsyncStorage.getAllKeys();
    console.log(allKeys);
    return response;
  } catch (e) {
    return null;
  }
};

export const removeUser = async () => {
  const keys = ['@user_name', '@user_email', '@user_id'];
  try {
    const response = await AsyncStorage.multiRemove(keys);
    return response;
  } catch (e) {
    return null;
  }
};
