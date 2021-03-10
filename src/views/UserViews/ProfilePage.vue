<template>
  <div class="profilepage">
    <h1 class="profilepage__title">Profile Page</h1>
    <button
        class="profilepage__logout-btn"
        @click="logout"
    >
      Logout
    </button>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      this.$router.push({name: 'homePage'})
    }
  }
}
</script>

<style scoped>

</style>
