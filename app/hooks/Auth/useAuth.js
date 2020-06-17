import React from 'react';
// import {useMutation} from '@apollo/client';
// import {LOGIN} from '../../graphql/AuthenticationMutations';
import {
  saveUserInformation,
  getStorageProperty,
  signOut,
} from '../../utils/asyncStorageHandler';
import {createAction} from './createAction';

export function useAuth() {
  // const [loginMutation] = useMutation(LOGIN, {
  //   onCompleted: (data) => {
  //     storageUser(data);
  //   },
  // });

  // const storageUser = (dataParams) => {
  //   const {token, user} = dataParams.login;
  //   saveUserInformation(token, user);
  //   dispatch(createAction('SET_LOADING', false));
  //   dispatch(createAction('SET_USER', user.email));
  // };

  const [state, dispatch] = React.useReducer(
    (stateParam, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...stateParam,
            user: action.payload,
          };
        case 'REMOVE_USER':
          return {
            ...stateParam,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...stateParam,
            loading: action.payload,
          };
        default:
          return stateParam;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );

  const auth = React.useMemo(
    () => ({
      // login: loginMutation,
      logout: async () => {
        await signOut();
        dispatch(createAction('REMOVE_USER'));
      },
      saveUser: (user, token) => {
        saveUserInformation(token, user);
        dispatch(createAction('SET_LOADING', false));
        dispatch(createAction('SET_USER', user.email));
      },
      register: async (email, password) => {},
    }),
    [],
  );

  React.useEffect(() => {
    const getUserToken = async () => {
      const user = await getStorageProperty('@user_email');
      dispatch(createAction('SET_USER', user));
      dispatch(createAction('SET_LOADING', false));
    };
    getUserToken();
  }, []);

  return {auth, state};
}
