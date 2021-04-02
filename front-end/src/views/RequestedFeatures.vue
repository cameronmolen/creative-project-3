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

            <div class="comment" v-for="comment in comments" :key="comment.id">
              <p>{{comment.}}
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
  name: 'RequestedFeatuers',
  data() {
    return {
      addedTitle: '',
      addedRequest: ''
      requests: [],
      editing: false,
    }
  },
  created() {
    this.getRequests();
  }
  methods: {
    async getRequests() {
      try {
        const response = await axios.get("/api/requests");
        this.requests = response.data;
      } catch(error) {
        console.log(error);
      }
    },
    makeRequest() {
      if(this.addedTitle != "" && this.addedRequest != "") {
        this.$root.$data.requests.push({
          title: this.addedTitle,
          request: this.addedRequest
        });
        this.addedTitle = "";
        this.addedRequest = "";
      }
    },
    /* Begin requested features list methods */
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
    /* End requested features list methods */
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

/* Style for the requested features list */
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
