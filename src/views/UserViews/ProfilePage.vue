<template>
  <div class="profilepage">
    <div class="profilepage__container">
      <button
          class="profilepage__logout-btn"
          @click="logout"
          v-if="isOwner"
      >
        <i class="fas fa-chevron-left"></i> LOGOUT
      </button>
      <div class="profilepage__userdata-container">
        <div class="profilepage__userdata-info">
          <h1>
            {{ this.username }}
          </h1>
        </div>
      </div>
      <div class="profilepage__functional-blocks" v-if="isOwner">
        <div class="profilepage__edit-user block" @click="toggleEditModal">
          <i class="fas fa-user-edit fa-2x"></i>
        </div>
        <div class="profilepage__add-to-friend block" @click="$router.push({ name: 'chatPage' })">
          <i class="fas fa-user-friends fa-2x"></i>
        </div>
      </div>
      <div class="profilepage__posts">
        <div class="post">
          <div class="post-header">
            <h2>
              Title for post
            </h2>
            <p>12:12 Today</p>
          </div>
          <div class="post-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div class="post-footer">
            <button>Like!</button>
          </div>
        </div>
      </div>
    </div>
    <g-edit-user-modal
        v-if="isVisibleEditModal"
        @toggle-modal="toggleEditModal"
        @change-username="updateUsername"
    />
  </div>
</template>

<script>
import gEditUserModal from '@/components/modal/edit-user-modal'

import { minLength, maxLength, required } from 'vuelidate/src/validators'

export default {
  name: "ProfilePage",

  components: {
    gEditUserModal
  },

  data() {
    return {
      id: this.$route.params.id,
      isVisibleEditModal: false,
      isOwner: null
    }
  },

  validators: {
    username: { required, minLength: minLength(3), maxLength: maxLength(50) }
  },

  methods: {
    logout: function () {
      this.$store.dispatch('AUTH_LOGOUT')
      this.$router.push({name: 'homePage'})
    },

    toggleEditModal: function () {
      this.isVisibleEditModal = !this.isVisibleEditModal
    },

    updateUsername: function (data) {
      this.$store.commit('UPDATE_USERNAME', data.username)
    }
  },

  created() {
    this.isOwner = this.$route.params.id === localStorage.getItem('id')
  },

  beforeMount() {
    this.$store.dispatch('USER_REQUEST', this.id)
        .catch((err) => console.log(err))
  },

  computed: {
    username() {
      return this.$store.getters.getUser.username === null ?
          this.$store.getters.getUser.email : this.$store.getters.getUser.username
    }
  }
}
</script>

<style scoped>
body {
  display: flex!important;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.profilepage__logout-btn {
  position: absolute;
  width: auto;
  left: 20px;
  top: 10px;
  font-size: 40px;
  background: transparent;
  color: #d9d9d9;
  transition: 150ms ease;
}

.profilepage__logout-btn:hover {
  transition: 150ms ease;
  transform: translateX(-20px);
  color: dodgerblue;
}

button {
  display: flex;
  margin: 10px 0;
  background-color: dodgerblue;
  color: white;
  padding: 12px 20px;
  border: transparent;
  border-radius: 0.5em;
  cursor: pointer;
  width: 100%;
  transition: 150ms ease;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  outline: none;
}

button:hover {
  transition: 150ms ease;
  opacity: 0.9;
}

.profilepage__container {
  height: 100vh;
  width: 100%;
}

.profilepage__functional-blocks {
  display: flex;
  justify-content: center;
  align-items: center;
}

.block {
  width: 75px;
  height: 75px;
  margin: 10px;
  padding: 20px;
  box-shadow: 1px 1px 6px grey;
  border: transparent;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  transition: 300ms ease;
}

.block:hover {
  transition: 300ms ease;
  box-shadow: 1px 1px 6px dodgerblue;
  transform: translateY(-10px);
}

.post {
  display: flex;
  padding: 17px;
  flex-direction: column;
  margin: 15px auto;
  max-width: 40%;
  border-radius: 20px;
  box-shadow: 1px 1px 7px darkgrey;
}

.post-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

i {
  margin-right: 10px;
}

</style>
