<template>
  <div class="homepage">
    <div class="homepage__container">
      <h1 class="homepage__container-title">Welcome to my first Vue JS Project</h1>
      <div class="homepage__container-buttons">
        <button class="homepage__sign-in-btn" @click="$router.push({name: 'authPage'})">Sign In</button>
        <button class="homepage__sign-up-btn" @click="$router.push({name: 'registrationPage'})">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
button {
  width: 200px;
  height: 40px;
  margin: 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: dodgerblue;
  color: white;
  border: transparent;
  border-radius: 1em;
  cursor: pointer;
  transition: 300ms ease;
}

button:hover {
  transition: 300ms ease;
  width: 205px;
}

.homepage {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10%;
}
</style>
