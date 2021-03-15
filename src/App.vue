<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>Tenacity</b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/timeline">Timeline</b-nav-item>
            <b-nav-item to="/story">Tenacity's Story</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
    <v-footer padless>
      <div class="footer">
        <p>Designed and built by Cameron Molen. Currently work in progress.</p>
        <a href="https://github.com/cameronmolen/creative-project-3">GitHub</a>
      </div>
    </v-footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0px 0px;
}

body {
  margin: 50px 100px;
}

a:link, a:visited {
  text-decoration: none;
  color: #999999;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.footer {
  width: 90%;
  justify-content: center;
  flex-direction: column;
  color: #999999;
  padding: 25px 0px;
  background-color: #EFEFEF;
  box-shadow: 0 50vh 0 50vh #EFEFEF;
}
</style>
