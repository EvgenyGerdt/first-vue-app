<template>
  <div class="userslist">
    <div class="userslist__container">
      <div class="userslist__header">
        <h3>Users</h3>
      </div>
      <input class="search-input" placeholder="Write username or email..." v-model="search">
      <div class="user__container">
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
    this.$store.dispatch('ALL_USERS_REQUEST')
        .then(() => this.users = this.$store.state.user.users)
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
.userslist {
  width: 30%;
}

.userslist__container {
  border-right: 1px solid darkgrey;
}

.user {
  padding: 0 0 0 20px;
  height: 50px;
  border-bottom: 1px solid darkgrey;
}

.user:hover {
  background-color: #e8e8e8;
}

.user__container {
  height: 90vh;
  flex-grow: 1;
  overflow: hidden;
  overflow-y: scroll;
}

.username {
  float: left;
}

.userlist__add-to-friend-btn {
  float: right;
  width: 15%;
  height: 100%;
  border: transparent;
  background-color: dodgerblue;
  color: white;
  transition: 150ms ease;
}

.userlist__add-to-friend-btn:hover {
  transition: 150ms ease;
  opacity: 0.9;
}

.search-input {
  height: 40px;
  width: 100%;
  border-top: transparent;
  border-bottom: 1px solid darkgrey;
  border-right: 1px solid darkgrey;
  padding: 20px 15px;
}

.userslist__header {
  padding: 10px;
  background-color: dodgerblue;
  color: white;
  margin: 0;
}

h3 {
  margin-top: 0;
}
</style>
