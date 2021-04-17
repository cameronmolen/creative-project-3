<template>
<div class="registerPage">
  <p>In order to view and create your own feature requests, please login or register.</p>
  <form>
    <fieldset>
      <legend>Login</legend>
      <input class="loginInput" placeholder="username" v-model="usernameLogin">
      <input class="loginInput" type="password" placeholder="password" v-model="passwordLogin">
    </fieldset>
    <fieldset>
      <button class="loginButton" type="submit" @click.prevent="login">Login</button>
    </fieldset>
  </form>
  <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  <form>
    <fieldset>
      <legend>Register</legend>
      <input class="loginInput" placeholder="username" v-model="username">
      <input class="loginInput" type="password" placeholder="password" v-model="password">
    </fieldset>
    <fieldset>
      <button class="loginButton" type="submit" @click.prevent="register">Register</button>
    </fieldset>
  </form>
  <p v-if="error" class="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: ''
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if(!this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          username: this.username,
          password: this.password
        });
        this.$root.$data.user = response.data.user;
      } catch(error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if(!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin
        });
        this.$root.$data.user = response.data.user;
      } catch(error) {
        console.log(error);
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.registerPage {
  padding: 20px;
}

.loginInput {
  margin: 0px 3px 5px 3px;
}

.loginButton {
  margin: 10px 0px 10px 0px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>
