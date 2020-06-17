import {saveUserInformation} from '../../utils/asyncStorageHandler';
import {useMutation} from '@apollo/client';
import {LOGIN} from '../../graphql/AuthenticationMutations';

export function useAuthGraphql() {
  const [loginMutation] = useMutation(LOGIN, {
    onCompleted: (data) => {
      confirm(data);
    },
  });

  const confirm = async (dataParam) => {
    const {token, user} = dataParam.login;
    saveUserInformation(token, user);
  };

  return {loginMutation};
}
