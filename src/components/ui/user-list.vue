<template>
  <div class="userslist">
    <div class="userslist__header">
      <h1>Users</h1>
    </div>
    <hr>
    <input class="search-input" placeholder="Write username or email..." v-model="search">
    <div class="userslist__container">
      <div class="user" v-for="user in filteredUsers" v-bind:key="user.email">
        <div class="username">
          {{ user.email }}
        </div>
        <button class="userlist__add-to-friend-btn">
          <i class="fas fa-user-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-list",
  data() {
    return {
      users: [],
      search: ''
    }
  },

  mounted() {
    this.$store.dispatch('get_all_users')
        .then(() => this.users = this.$store.state.users)
        .catch((err) => console.log(err))
  },

  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return user.email.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style scoped>
.userslist__container {
  position: relative;
  display: block;
  max-height: 400px;
  background-color: #fefefe;
  margin: 4% auto;
  padding: 0 25px;
  border-radius: 1em;
  width: 100%;
  overflow-y: scroll;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.user {
  display: block;
  background-color: white;
  margin: 0;
  text-align: center;
  width: 100%;
  height: 35px;
  border-top: 1px solid darkgrey;
  border-bottom: 1px solid darkgrey;
  list-style-type: none;
  transition: 150ms ease;
  cursor: pointer;
  text-decoration: none;
}

.user:hover {
  transition: 150ms ease;
  box-shadow: 1px 1px 7px grey;
}

.username {
  float: left;
  padding: 0 10px;
}

.search-input {
  height: 30px;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid darkgrey;
}

.userlist__add-to-friend-btn {
  margin: 7px 10px;
  border: transparent;
  border-radius: 1em;
  background-color: dodgerblue;
  color: white;
  padding: 1px -2px;
  float: right;
}

.userlist__add-to-friend-btn:hover {
  opacity: 0.9;
}

hr, h1 {
  margin: 0;
}

hr {
  margin-bottom: 10px!important;
}

</style>
