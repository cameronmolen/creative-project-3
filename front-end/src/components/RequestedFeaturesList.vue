<template>
<div class="wrapper">
  <div class="requests">
    <div class="request" v-for="request in requests" :key="request.title">
      <div class="info">
        <h3>{{request.title}}</h3>
        <p>{{request.request}}</p>
        <div class="info-buttons">
          <button class="auto" v-on:click="deleteRequest(request)">Remove</button>
          <div v-if="!editing">
            <button class="auto" v-on:click="editRequest(request)">Edit</button>
          </div>
          <div v-else>
            <input type="text" v-model="updatedRequest">
            <button class="auto" v-on:click="finishEditing(request, updatedRequest)">Save Edits</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RequestedFeaturesList',
  props: {
    requests: Array
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    deleteRequest(request) {
      const index = this.$root.$data.requests.indexOf(request);
      this.$root.$data.requests.splice(index, 1);
    },
    editRequest() {
      this.editing = true;
    },
    finishEditing(request, updatedRequest) {
      this.editing = false;
      let index = this.$root.$data.requests.indexOf(request);
      this.$root.$data.requests[index].request = updatedRequest;
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 15px;
}

.info-buttons {
  display: flex;
  flex-direction: row;
  justify-content: left;
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
  margin-right: 15px;
}
</style>
