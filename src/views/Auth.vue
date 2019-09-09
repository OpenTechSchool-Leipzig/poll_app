<template lang="html">
  <div>
    <link
      type="text/css"
      rel="stylesheet"
      href="https://cdn.firebase.com/libs/firebaseui/4.2.0/firebaseui.css"
    />
    <h2>Login to continue...</h2>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import { auth } from '../store/firebase';

export default {
  name: 'auth',
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInFlow: 'popup',
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(auth);
    }
    ui.start('#firebaseui-auth-container', uiConfig);
  },
};
</script>
