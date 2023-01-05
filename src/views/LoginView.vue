<template>
  <div class="login">
    <h1>Отчет проведенного мероприятия</h1>
    <form @submit.prevent="login">
      <div class="input">
        <label for="email">Email address</label>
        <input
          v-model="$store.state.report.username"
          class="form-control"
          type="text"
          name="email"
          placeholder="email@adress.com"
        />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input
          v-model="password"
          class="form-control"
          type="password"
          name="password"
          placeholder="password"
        />
      </div>
      <button type="submit" class="mt-4 btn-pers" id="login_button">
        Войти
      </button>
      <!-- <div class="alternative-option mt-4">
        <span @click="moveToRegister">Register</span>
      </div>
      <div
        class="alert alert-warning alert-dismissible fade show mt-5 d-none"
        role="alert"
        id="alert_1"
      >

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        >close</button>
      </div>-->
    </form>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      password: "",
    };
  },
  methods: {
    // https://github.com/vladpostu/vue-firebase-auth
    // https://vuejsexamples.com/a-simple-user-login-app-built-using-vue-js/
    //async login(submitEvent) {
    async login() {
      //this.email = submitEvent.target.elements.email.value;
      //this.password = submitEvent.target.elements.password.value;
      const credentials = {
        username: this.$store.state.report.username,
        //password: "pass"
        password: this.password
      }
      const formData = new FormData()
      for(var key in credentials)
      formData.append(key, credentials[key])
      await axios.post(process.env.VUE_APP_API_URL + '/auth.php', formData)
      .then(res => { // TODO if incorrect passord
        if(res.data.jwt) {
          const jwt = res.data.jwt
          this.$store.commit('report/setJWT', jwt)

          /*const today = new Date()
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
          this.$store.commit('report/setDate', date)
          this.$store.dispatch('report/fetchCourses')
          this.$store.dispatch('report/fetchThemes')
          this.$store.dispatch('report/fetchRegions')
          this.$store.dispatch('report/fetchSettlements')
          this.$store.dispatch('report/fetchVolunteers')
          this.$store.dispatch('report/fetchInstitutions')
          this.$store.dispatch('report/fetchGroups')*/
          this.$router.push('/')
        } else if(res.data.message) {
          this.$store.commit('report/setMessage', res.data.message)
          this.$store.commit('report/clearJWT')
        } else {
          this.$store.commit('report/setMessage', "Unknown error")
          this.$store.commit('report/clearJWT')
        }
        
      }).catch(err => {
        console.log(err);
        this.$store.commit('report/setMessage', err.response)
        this.$store.commit('report/clearJWT')
      });
      
      //const auth = getAuth();
      /*signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          let alert_1 = document.querySelector("#alert_1");
          alert_1.classList.remove("d-none");
          alert_1.innerHTML = errorMessage;
        });*/
    },
    moveToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 20px 0px;
}
#content {
  width: 400px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid lightgray;
  padding: 4rem 4rem;
  border-radius: 5px;
}
.background {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: rgb(250, 250, 250);
}
.navbar {
  background: #fafafa;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 70px;
  box-shadow: 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    100px 100px 80px rgba(0, 0, 0, 0.07);
}
.nav {
  width: 80%;
  min-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fafafa;
}
#name_project {
  font-weight: 700;
}
.container {
  width: 100%;
  max-width: 95%;
}
.input {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.input > label {
  text-align: start;
}
.input > input {
  margin-top: 6px;
  height: 38px !important;
}
/* From uiverse.io */
.btn-pers {
  position: relative;
  /*left: 50%;*/
  padding: 1em 2.5em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 700;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  transform: translateX(-50%);
}
.btn-pers:hover {
  background-color: #198754;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translate(-50%, -7px);
}
.btn-pers:active {
  transform: translate(-50%, -1px);
}
/*  */
.alternative-option {
  text-align: center;
}
.alternative-option > span {
  color: #0d6efd;
  cursor: pointer;
}
#sign_out {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>