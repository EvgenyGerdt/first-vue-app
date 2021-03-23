<template>
  <div class="change-password-page">
    <button
        v-if="!isChanged"
        class="change-password-page__button-back"
        @click="clearResetToken"
    >
      <i class="fas fa-chevron-left registerpage__icon"></i>  BACK
    </button>
    <form class="change-password-page__container">
      <i class="fas fa-user-lock fa-7x"></i>
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
      this.$store.dispatch('FORGET_PASSWORD_REQUEST', { email })
          .then(() => this.isVerified = true)
          .catch((err) => console.log(err))
    },

    resetPassword: async function () {
      let password = this.newPassword
      let resetToken = localStorage.getItem('resetToken')
      this.$store.dispatch('RESET_PASSWORD_REQUEST', {resetToken, password })
          .then(() => this.isChanged = true)
          .catch((err) => console.log(err))
    },

    clearResetToken: function() {
      this.$store.dispatch('CLEAR_RESET_TOKEN')
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

body {
  display: flex!important;
  justify-content: center;
  align-items: center;

}

form {
  margin: 150px auto;
  max-height: 500px;
  max-width: 500px;
  padding: 30px 30px;
  box-shadow: 1px 1px 8px darkgrey;
  border-radius: 20px;
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

.change-password-page__button-back {
  position: absolute;
  width: auto;
  left: 20px;
  top: 10px;
  font-size: 40px;
  background: transparent;
  color: #d9d9d9
}

.change-password-page__button-back:hover {
  transform: translateX(-20px);
  color: dodgerblue;
}

</style>
