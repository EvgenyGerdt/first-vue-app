<template>
  <div class="userslist">
    <div class="userslist__container">
      <div class="userslist__header">
        <h3>Users</h3>
      </div>
      <label>
        <input class="search-input" placeholder="Write username or email..." v-model="search">
      </label>
      <div class="user__container">
        <div
            class="user"
            v-for="user in filteredUsers"
            v-bind:key="name = user.username ? user.username : user.email"
        >
          <div class="username" v-if="user">
            {{ name }}
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

  created() {
    this.$store.dispatch('ALL_USERS_REQUEST')
        .then(() => this.users = this.$store.state.user.users)
        .catch((err) => console.log(err))
  },

  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return user.username !== undefined ?
            user.username.toLowerCase().includes(this.search.toLowerCase()) :
            user.email.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style scoped>
.userslist {
  width: 30%;
  height: 100%;
}

.user {
  display: flex;
  padding: 0 0 0 20px;
  height: 70px;
  border-bottom: 1px solid #F5F4F4;
  border-radius: 20px;
}

.user:hover {
  background-color: #e8e8e8;
}

.user__container {
  display: flex;
  flex-direction: column;
  justify-self: center;
  height: 90vh;
  flex-grow: 1;
  overflow: hidden;
  overflow-y: scroll;
}

.username {
  display: flex;
  width: 85%;
  justify-content: left;
  align-items: center;
  cursor: pointer;
}

.userlist__add-to-friend-btn {
  margin: 15px auto;
  width: 10%;
  height: 60%;
  border: transparent;
  border-radius: 50%;
  background-color: dodgerblue;
  color: white;
  transition: 150ms ease;
  outline: none;
}

.userlist__add-to-friend-btn:hover {
  transition: 150ms ease;
  opacity: 0.9;
}

.search-input {
  height: 40px;
  width: 100%;
  background: #F5F4F4;
  border: transparent;
  padding: 20px 15px;
  margin: 2px 5px 10px 5px;
  outline: none;
}

.userslist__header {
  padding: 10px;
  margin: 0;
}

h3 {
  margin-top: 0;
  margin-bottom: 2px;
}
</style>
