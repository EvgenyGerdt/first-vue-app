<template>
  <div class="profilepage">
    <button
        class="profilepage__logout-btn"
        @click="logout"
    >
      <i class="fas fa-chevron-left"></i> Logout
    </button>
    <div class="profilepage__container">
      <h1>{{this.email}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",

  data() {
    return {
      email: '',
    }
  },

  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      this.$router.push({name: 'homePage'})
    }
  },

  mounted() {
    let userId = localStorage.getItem('id')
    this.$store.dispatch('get_user', { userId })
        .then(() => {
          this.email = this.$store.state.user.email
        })
        .catch(err => {
          console.log(err)
        })
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
  color: #d9d9d9
}

.profilepage__logout-btn:hover {
  color: dodgerblue;
}

button {
  margin: 10px 0;
  background-color: dodgerblue;
  color: white;
  padding: 14px 20px;
  border: transparent;
  border-radius: 0.5em;
  cursor: pointer;
  width: 100%;
  transition: 150ms ease;
  font-size: 16px;
  font-weight: bold;
  outline: none;
}

button:hover {
  transition: 150ms ease;
  opacity: 0.9;
}

</style>
