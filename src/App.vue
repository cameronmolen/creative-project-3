<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #264653;">
        <router-link class="navbar-brand" to="/">Tenacity</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-item nav-link" to="/">Home</router-link>
            <router-link class="nav-item nav-link" to="/">Timeline</router-link>
            <router-link class="nav-item nav-link" to="/">Tenacity's Story</router-link>
          </div>
          <div class="navbar-nav">
            <nav class="navbar navbar-light" style="padding-left: 0px;">
              <form class="form-inline">
                <router-link class="btn btn-outline-success" to="/">Download</router-link>
              </form>
            </nav>
          </div>
        </div>
      </nav>
      <router-link to="/">Tenacity</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
  <footer>
    <p>Designed and built by Cameron Molen. Currently work in progress.</p>
    <a href="https://github.com/cameronmolen/creative-project-3">GitHub</a>
  </footer>
</template>

<style>
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
</style>
