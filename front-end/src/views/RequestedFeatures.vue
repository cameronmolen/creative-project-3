<template>
  <div class="features">
    <div class="page">
      <h1>Requested Features</h1>
      <p>I would love to hear from you, the future users of Tenacity, what features you would like to see in the app. There is no guarantee that these ideas will be implemented into the design and functionality of Tenacity, but all ideas are welcome!</p>
      <form v-on:submit.prevent="makeRequest">
        <p><input v-model="addedTitle" placeholder="Request Title"></p>
        <textarea v-model="addedRequest"></textarea>
        <br />
        <div>
          <button type="submit">Submit Request</button>
        </div>
      </form>
      <RequestedFeaturesList :requests="requests" />
    </div>
  </div>
</template>

<script>
import RequestedFeaturesList from "../components/RequestedFeaturesList.vue";
import axios from 'axios';
export default {
  name: 'RequestedFeatuers',
  data() {
    return {
      addedTitle: '',
      addedRequest: ''
    }
  },
  components: {
    RequestedFeaturesList,
  },
  methods: {
    makeRequest() {
      if(this.addedTitle != "" && this.addedRequest != "") {
        this.$root.$data.requests.push({
          title: this.addedTitle,
          request: this.addedRequest
        });
        this.addedTitle = "";
        this.addedRequest = "";
      }
    }
  },
  computed: {
    requests() {
      return this.$root.$data.requests;
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
