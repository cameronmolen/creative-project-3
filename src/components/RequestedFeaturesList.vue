<template>
<div class="wrapper">
  <div class="requests">
    <div class="request" v-for="request in requests" :key="request.title">
      <div class="info">
        <h3>{{request.title}}</h3>
        <p>{{request.request}}</p>
        <p><button class="auto" v-on:click="deleteRequest(request)">Remove</button></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'RequestedFeaturesList',
  props: {
    requests: Array
  },
  methods: {
    deleteRequest(request) {
      const index = this.$root.$data.requests.indexOf(request);
      this.$root.$data.requests.splice(index, 1);
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 15px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.requests {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

.request {
  margin: 10px;
  margin-top: 50px;
  width: 95%;
}

.info {
  background: #EFEFEF;
  padding: 30px 30px;
  width: 100%;
  text-align: left;
}

.info p {
  margin: 0px;
}

.price {
  display: flex;
}

.auto {
  margin-left: auto;
}

</style>
