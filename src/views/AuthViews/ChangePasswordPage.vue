<template>
  <div class="change-password-page">
    <form class="change-password-page__container">
      <h1 class="change-password-page__title">Change password</h1>
      <div class="change-password-page__container email" v-if="!isVerified">
        <label>
          Enter your email for verify
          <input
              required
              type="text"
              v-model.trim="email"
              class="change-password-page__input-email"
              placeholder="Enter your email"
          >
        </label>
        <button @click="checkEmail">SEND</button>
      </div>
      <div class="change-password-page__container reset-password" v-if="isVerified && !isChanged">
        <label>
          Just enter new password
          <input
              required
              type="password"
              v-model="newPassword"
              class="change-password-page__input-password"
              placeholder="Enter your new password"
          >
        </label>
        <button @click="resetPassword">Change password</button>
      </div>
      <div
          v-if="isChanged"
      >
        <span>Your password successfully changed, <a @click="$router.push({ name: 'authPage' })">Sign in!</a></span>
      </div>
      <div class="change-password-page__container-bottom">
        <button
            v-if="!isChanged"
            class="change-password-page__button-back"
            @click="resetState"
        >
          BACK
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChangePasswordPage",

  data() {
    return {
      email: '',
      token: '',
      newPassword: '',
      isVerified: false,
      isChanged: false
    }
  },

  methods: {
    checkEmail: async function (){
      let email = this.email
      this.$store.dispatch('forget_password', { email })
          .then(() => this.isVerified = true)
          .catch((err) => console.log(err))
    },

    resetPassword: async function () {
      let password = this.newPassword
      let resetToken = this.$store.state.resetToken
      this.$store.dispatch('reset_password', { resetToken, password })
          .then(() => this.isChanged = true)
          .catch((err) => console.log(err))
    },

    resetState: function() {
      this.$store.dispatch('reset_state')
          .then(() => this.$router.push({ name: 'authPage' }))
          .catch((err) => console.log(err))
    }
  }
}
</script>

<style scoped>
html, body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}

form {
  position: absolute;
  display: block;
  top: 20%;
  left: 41%;
}

input[type=text],
input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  display: flex;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0.5em;
  text-align: center;
}

button {
  display: flex;
  margin: 10px 0;
  background-color: dodgerblue;
  color: white;
  padding: 12px 20px;
  border: transparent;
  border-radius: 0.5em;
  justify-content: center;
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

.change-password-page__button-back {
  padding: 10px 18px;
  float: left;
  background-color: #f44336;
}

.change-password-page__container.email.error input,
.change-password-page__container.reset-password.error input{
  border: 1px solid #c20a1d;
}

.error {
  color: #c20a1d;
}

</style>
