<template>
  <div class="home">
    <div class="page-main">
      <div class="headline-content">
        <img class="headline-image" src="https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1580&q=80" alt="iPhone that says 'Hello'"
        style="padding-bottom: 20px;">
        <div class="headline">
          <h1 style="text-align: center; font-size: calc(1.525rem + 3.3vw);">Achieve Goals... The Right Way.</h1>
          <p class="headline">Realize your goals with the help of friends, family, and strangers with Tenacity,
          a mobile app that utilizes accountability, support, and connection to help you accomplish
          more and become better.</p>
        </div>
      </div>
      <hr>
      <div style="line-height: 30px;">
        <h2>Science-Based Methodology</h2>
        <p style="margin-bottom: 30px;">Studies have shown that increased accountability drastically increases the amount of
        motivation that goal-setters report to have while working towards something.</p>
        <h2>Current Status</h2>
        <p style="margin-bottom: 30px;">The app is currently undergoing basic design and construction. While it is far from finished,
        it is estimated that it will be available on the app store by December 2021.</p>
        <hr>
        <form class="form-inline">
          <router-link style="width: 100%;" class="btn btn-outline-success" type="button" to="/timeline">Follow the Progress</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>

<style>
.headline {
  font-size: calc(1.275rem + .3vw);
  text-align: center;
}

.headline-content {
  display: flex;
  flex-direction: column;
}

.headline-image {
  width: 100%;
}

.page-main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2rem 2rem;
}

.btn, .btn:link {
  color: #E9C46A !important;
  border: 1px solid #E9C46A !important;
}

.btn:hover {
  color: #264653 !important;
  background-color: #E9C46A !important;
  border: 1px solid #E9C46A !important;
}

.btn:active {
  background-color: #E9C46A !important;
  color: #264653 !important;
}

@media only screen and (min-width: 961px) {

  .headline {
    justify-content: center;
    margin: auto;
    padding: 15px;
  }

  .headline-content {
    flex-direction: row;
  }

  .headline-image {
    width: 50%;
  }

  .page {
    padding: 2rem 250px;
    line-height: 30px;
  }

  .timeline {
    width: 85%;
  }
}

@media only screen and (max-width: 960px) and (min-width: 401px) {

  .headline {
    justify-content: center;
    margin: auto;
    padding: 15px;
  }

  .page {
    padding: 2rem 250px;
    line-height: 30px;
  }

  .timeline {
    width: 85%;
  }
}
</style>
