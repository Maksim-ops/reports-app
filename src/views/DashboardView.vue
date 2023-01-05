<template>
  <div>
    <div class="text-center">You're now logged as</div>
    <div id="username_display" class="display-6">{{ this.email }}</div>
    <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
      Logout
    </button>
  </div>
</template>

<script>
//import { getAuth } from "firebase/auth";
//const auth = getAuth();
const auth = {};
export default {
  data() {
    return {
      email: auth.currentUser.email,
    };
  },
  methods: {
    signOut() {
      auth
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>