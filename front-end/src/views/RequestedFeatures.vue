<template>
<div>
  <div class="features" v-if="user">
    <div class="page">
      <h1>Requested Features</h1>
      <p>I would love to hear from you, the future users of Tenacity, what features you would like to see in the app. There is no guarantee that these ideas will be implemented into the design and functionality of Tenacity, but all ideas are welcome!</p>
      <form v-on:submit.prevent="addRequest">
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
              <p style="text-align: right;"><em>-- {{request.user.username}}</em></p>
              <p style="text-align: right;">{{formatDate(request.created)}}</p>
              <div class="info-buttons">
                <div v-if="!addingComment" style="width: 100%;">
                  <div v-if="!editingRequest" style="width: 100%;">
                    <button class="auto" v-on:click="showCommentCreator()">Add Comment</button>
                    <button class="auto" v-on:click="editRequest(request)">Edit</button>
                    <button class="auto" v-on:click="deleteRequest(request)">Remove</button>
                  </div>
                  <div v-else style="width: 100%;">
                    <input style="width: 100%;" type="text" v-model="updatedRequest">
                    <button class="auto" v-on:click="editRequest">Cancel</button>
                    <button class="auto" v-on:click="updateRequest(request, updatedRequest)">Save Edits</button>
                  </div>
                </div>
                <div v-else style="width: 100%;">
                  <form v-on:submit.prevent="addComment(request)">
                    <p><input style="width: 100%;" v-model="addedCommentContent" placeholder="Comment Content"></p>
                    <br/>
                    <div>
                      <button class="auto" type="submit">Make Comment</button>
                      <button class="auto" v-on:click="showCommentCreator()">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="info comment" v-for="comment in request.comments" :key="comment._id">
              <p>{{comment.content}}</p>
              <p style="text-align: right"><em>-- {{comment.user.username}}</em></p>
              <p style="text-align: right"><em>{{formatDate(comment.created)}}</em></p>
              <div v-if="!editingComment">
                <button class="auto" v-on:click="editComment()">Edit</button>
                <button class="auto" v-on:click="deleteComment(request, comment)">Remove</button>
              </div>
              <div v-else style="width: 100%;">
                <input style="width: 100%;" type="text" v-model="updatedComment">
                <br/>
                <button class="auto" v-on:click="editComment">Cancel</button>
                <button class="auto" v-on:click="updateComment(request, comment, updatedComment)">Save Edits</button>
              </div>
            </div>
          </div>
          <div>
            <p>Logged in as {{user.username}}</p>
            <button class="auto" style="margin-top:0px;" v-on:click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Login v-else />
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Login from '@/components/Login.vue';
export default {
  name: 'RequestedFeatuers',
  components: {
    Login
  },
  data() {
    return {
      addedTitle: '',
      addedContent: '',
      addedCommentContent: '',
      requests: [],
      editingRequest: false,
      addingComment: false,
      editingComment: false,
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  async created() {
    try {
      await this.getRequests();
      let response = await axios.get('/api/users');
      console.log(response.data.user.username);
      this.$root.$data.user = response.data.user; 
      console.log(this.$root.$data.user);
    } catch(error) {
      this.$root.$data.user = null;
      console.log(error)
    }
  },
  methods: {
    async getRequests() {
      try {
        const response = await axios.get("/api/requests");
        this.requests = response.data;
        for(let i = 0; i < this.requests.length; i++) {
          this.getComments(this.requests[i]);
        }
      } catch(error) {
        console.log(error);
      }
    },
    async addRequest() {
      try {
        await axios.post("/api/requests", {
          title: this.addedTitle,
          content: this.addedContent,
          user: this.user,
          comments: []
        });
        this.addedTitle = "";
        this.addedContent = "";
        await this.getRequests();
      } catch(error) {
        console.log(error);
      }
    },
    async deleteRequest(request) {
      try {
        for(let i = request.comments.length - 1; i >= 0; i--) {
          this.deleteComment(request, request.comments[i]);
        }
        await axios.delete("/api/requests/" + request._id);
        this.getRequests();
        return true;
      } catch(error) {
        console.log(error);
      }
    },
    editRequest() {
      this.editingRequest = !this.editingRequest;
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
    },
    showCommentCreator() {
      this.addedCommentContent = "";
      this.addingComment = !this.addingComment;
    },
    async getComments(request) {
      try {
        console.log("Here 3");
        const response = await axios.get("/api/requests/" + request._id + "/comments");
        request.comments = response.data;
        console.log(request.comments);
      } catch(error) {
        console.log(error);
      }
    },
    async addComment(request) {
      try {
        console.log("Here 4");
        await axios.post("/api/requests/" + request._id + "/comments", {
          content: this.addedCommentContent,
          user: this.user,
        });
        this.addedCommentContent = "";
        this.addingComment = false;
        await this.getComments(request);
      } catch(error) {
        console.log(error);
      }
    },
    editComment() {
      this.editingComment = !this.editingComment;
    },
    async updateComment(request, comment, updatedContent) {
      try {
        axios.put('/api/requests/' + request._id + '/comments/' + comment._id, {
          content: updatedContent,
        });
        this.updatedComment = "";
        this.getComments(request);
      } catch(error) {
        console.log(error);
      }
    },
    async deleteComment(request, comment) {
      try {
        await axios.delete('/api/requests/' + request._id + '/comments/' + comment._id);
        this.getComments(request);
      } catch(error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
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

.comment {
  background: #EEEFFF;
  margin: 0 auto;
  border-top: 1px solid black;
}

.price {
  display: flex;
}

.auto {
  margin-right: 15px;
}
</style>
