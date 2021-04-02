<template>
  <div class="features">
    <div class="page">
      <h1>Requested Features</h1>
      <p>I would love to hear from you, the future users of Tenacity, what features you would like to see in the app. There is no guarantee that these ideas will be implemented into the design and functionality of Tenacity, but all ideas are welcome!</p>
      <form v-on:submit.prevent="addRequest">
        <p><input v-model="addedUser" placeholder="Username"></p>
        <p><input v-model="addedTitle" placeholder="Request Title"></p>
        <textarea v-model="addedContent" placeholder="Request Description"></textarea>
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
              <p>{{request.content}}</p>
              <p style="text-align: right"><em>-- {{request.user}}</em></p>
              <div class="info-buttons">
                <div v-if="!editing">
                  TODO: <button class="auto" v-on:click="addComment(request)">Add Comment</button>
                  <button class="auto" v-on:click="editRequest(request)">Edit</button>
                  <button class="auto" v-on:click="deleteRequest(request)">Remove</button>
                </div>
                <div v-else>
                  <input type="text" v-model="updatedRequest">
                  <button class="auto" v-on:click="editRequest">Cancel</button>
                  <button class="auto" v-on:click="updateRequest(request, updatedRequest)">Save Edits</button>
                </div>
              </div>
            </div>

            <div class="comment" v-for="comment in comments" :key="comment._id">
              <p>{{comment.content}}</p>
              <p>{{comment.user}}</p>
              /* TODO: Add an edit button for comments */
              /* TODO: Add a delete button for comments */
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
      addedContent: '',
      addedUser: '',
      requests: [],
      editing: false,
    }
  },
  created() {
    this.getRequests();
  },
  methods: {
    async getRequests() {
      try {
        const response = await axios.get("/api/requests");
        this.requests = response.data;
      } catch(error) {
        console.log(error);
      }
    },
    async addRequest() {
      try {
        await axios.post("/api/requests", {
          title: this.addedTitle,
          content: this.addedContent,
          user: this.addedUser
        });
        await this.getRequests();
      } catch(error) {
        console.log(error);
      }
    },
    /* Begin requested features list methods */
    async deleteRequest(request) {
      try {
        await axios.delete("/api/requests/" + request._id);
        this.getRequests();
        return true;
      } catch(error) {
        console.log(error);
      }
    },
    editRequest() {
      this.editing = !this.editing;
    },
    async updateRequest(request, updatedRequest) {
      this.editing = false;
      try {
        await axios.put("/api/requests/" + request._id, {
          content: updatedRequest,
        });
        this.getRequests();
        return true;
      } catch(error) {
        console.log(error);
      }
    }
    /* End requested features list methods */
  },
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
