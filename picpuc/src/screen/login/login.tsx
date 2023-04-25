import React, {ReactElement} from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EventStyled} from './styles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const {ContainList, GoogleButton, TextButton} = EventStyled;

type Props = {
  handleSignIn: Function;
};

const GoogleLoginButton = ({handleSignIn}: Props) => {
  return (
    <GoogleButton onPress={() => handleSignIn()}>
      <Icon name="google" size={20} color="#fff" />
      <TextButton>Continuar con Google</TextButton>
    </GoogleButton>
  );
};
const LoginScreen = (): ReactElement => {
  const signIn = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const data = await GoogleSignin.signIn();
    console.log(data)
    // const {idToken} = await GoogleSignin.signIn();

    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
};  

  return (
    <ContainList>
      <GoogleLoginButton handleSignIn={signIn} />
    </ContainList>
  );
};

export default LoginScreen;
