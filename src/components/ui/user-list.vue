<template>
  <div class="userslist">
    <div class="userslist__container">
      <div class="userslist__header">
      </div>
      <div class="userslist__switch-container">
        <div class="switch-friends" @click="switchToFriendList($event.target)">
          <h3>Friends</h3>
        </div>
        <div class="switch-users" @click="switchToUsersList($event.target)">
          <h3>All users</h3>
        </div>
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
          <div class="username" v-if="user" @click="$router.push(`/profile/${user._id}`)">
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
      search: '',
      switchToFriends: false,
      switchToUsers: true
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
  },

  methods: {
    switchToUsersList: function (el) {
      el.style.borderLeft = '3px solid dodgerblue';
      this.switchToFriends = false
      this.switchToUsers = true
    },

    switchToFriendList: function (el) {
      el.style.borderLeft = '3px solid dodgerblue'
      this.switchToFriends = true
      this.switchToUsers = false
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
  min-width: 40px;
  min-height: 40px;
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
  position: sticky;
  height: 40px;
  width: 94%;
  background: #F5F4F4;
  border: transparent;
  border-radius: 10px;
  padding: 20px 15px;
  margin: 2px 5px 10px 5px;
  outline: none;
}

.userslist__header {
  padding: 10px;
  margin: 0;
}

.userslist__switch-container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}

.switch-friends,
.switch-users {
  width: 50%;
}

.switch-friends:hover,
.switch-users:hover {
  background-color: #cccccc;
}

h3 {
  margin-top: 0;
  margin-bottom: 2px;
}
</style>
