<template>
<div>
  <form>
    <fieldset>
      <legend>Register</legend>
      <input placeholder="username" v-model="username">
      <input type="password" placeholder="password" v-model="password">
    </fieldset>
    <fieldset>
      <button type="submit" @click.prevent="register">Register</button>
    </fieldset>
  </form>
  <p v-if="error" class="error">{{error}}</p>
  <form>
    <fieldset>
      <legend>Login</legend>
      <input placeholder="username" v-model="usernameLogin">
      <input type="password" placeholder="password" v-model="passwordLogin">
    </fieldset>
    <fieldset>
      <button type="submit" @click.prevent="login">Login</button>
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
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
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
