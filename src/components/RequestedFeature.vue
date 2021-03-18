<template>
<div class="wrapper">
  <div class="requests">
    <div class="request" v-for="request in requests" :key="request.title">
      <div class="info">
        <h3><input v-model="changedTitle" placeholder="Request Title" value="{{request.title}}"></h3>
        <textarea v-model="changedRequest">{{request.request}}</textarea>
        <p><button class="auto" v-on:click="updateRequest(request)">Save Changes</button></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'RequestedFeaturesList',
  data() {
    return {
      changedTitle,
      changedRequest
    }
  },
  props: {
    requests: Array
  },
  methods: {
    updateRequest(request) {
      const index = this.$root.$data.requests.indexOf(request);
      this.$root.$data.requests.at(index).title = this.changedTitle;
      this.$root.$data.requests.at(index).request = this.changedRequest;
    }
  }
}
</script>

<style scoped>
input {
  width: 80%;
}

textarea {
  width: 80%;
}

</style>
