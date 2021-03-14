<template>
  <div class="profilepage">
    <button
        class="profilepage__logout-btn"
        @click="logout"
    >
      <i class="fas fa-chevron-left"></i> Logout
    </button>
    <div class="profilepage__container">
      <div class="profilepage__userdata-container">
        <h1 class="profilepage__userdata-title">Your profile</h1>

        <div class="profilepage__userdata-info">
          <h3 class="profilepage__userdata-email">
            {{ this.email }}
          </h3>
        </div>
      </div>
      <div class="profilepage__functional-blocks">
        <div class="profilepage__edit-user block">
          <h3>Edit your profile</h3>
          <i class="fas fa-user-edit fa-5x"></i>
        </div>
        <div class="profilepage__add-to-friend block">
          <h3>Find friends</h3>
          <i class="fas fa-user-friends fa-5x"></i>
        </div>
      </div>
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
  transform: translateX(-20px);
  opacity: 0.9;
}

.profilepage__container {
  height: 100vh;
  width: 82%;
  box-shadow: 1px 1px 18px grey;
  float: right;
}

.block {
  display: inline-block;
  margin: 20px;
  padding: 12px 14px;
  max-width: 300px;
  min-width: 220px;
  height: 220px;
  box-shadow: 1px 1px 6px grey;
  border: transparent;
  border-radius: 1em;
  text-align: center;
  cursor: pointer;
  transition: 300ms ease;
}

.block:hover {
  transition: 300ms ease;
  box-shadow: 1px 1px 6px dodgerblue;
  transform: translateY(-20px);
}

</style>
