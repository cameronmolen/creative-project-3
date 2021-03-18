<template>
<div class="wrapper">
  <div class="requests">
    <div class="request" v-for="request in requests" :key="request.id">
      <div class="info">
        <h1>{{request.title}}</h1>
        <p>{{request.body}}</p>
      </div>
      <div class="price">
        <h2>{{request.date}}</h2>
        <button class="auto" v-on:click="deleteRequest(request)">Remove</button>
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
      const index = this.$root.$data.requests.indexOf(request.id);
      this.$root.$data.requests.splice(index, 1);
    }
  }
}
</script>
