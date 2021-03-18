<template>
  <div class="features">
    <div class="page">
      <h1>Requested Features</h1>
      <p>I would love to hear from you, the future users of Tenacity, what features you would like to see in the app. There is no guarantee that these ideas will be implemented into the design and functionality of Tenacity, but who knows!</p>
      <form v-on:submit.prevent="makeRequest">
        <input v-model="addedTitle" placeholder="Request Title"></p>
        <textarea v-model="addedRequest"></textarea>
        <br />
        <button type="submit">Submit Request</button>
      </form>
      <RequestedFeaturesList :requests="requests" />
    </div>
  </div>
</template>

<script>
import RequestedFeaturesList from "../components/RequestedFeaturesList.vue"
export default {
  name: 'RequestedFeatuers',
  components: {
    RequestedFeaturesList
  },
  methods: {
    makeRequest() {
      this.$root.$data.requests.push({
        title: this.addedTitle,
        request: this.addedRequest
      });
      this.addedTitle = '';
      this.addedRequest = '';
    }
  },
  computed: {
    requests() {
      return this.$root.$data.requests;
    }
  }
}
</script>
