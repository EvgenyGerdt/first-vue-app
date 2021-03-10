<template>
  <div>
    <button type="button" class="authpage__button-back" @click="$router.push({ name: 'homePage' })">
      <i class="fas fa-chevron-left"></i> BACK
    </button>
    <form @submit.prevent="login" class="authpage__container">
      <div class="authpage__container">
        <span class="authpage__icon">
          <i class="fas fa-user fa-7x"></i>
        </span>
        <h1 class="authpage__title">Sign In</h1>
        <div
            class="authpage__input-container"
            :class="{'error': $v.email.$error}"
        >
          <label>
            <input
                required
                v-model.trim="email"
                type="text"
                class="authpage__input-email"
                placeholder="EMAIL"
                @change="setEmail($event.target.value)"
            >
          </label>
        </div>
        <div class="error" v-if="!$v.email.required && $v.email.$dirty">Please, enter your email</div>
        <div class="error" v-if="!$v.email.email && $v.email.$dirty">Please, enter correct email</div>
        <div
            class="authpage__input-container"
            :class="{'error': $v.password.$error}"
        >
          <label>
            <input
                required
                model.trim="password"
                type="password"
                class="authpage__input-password"
                id="password"
                placeholder="PASSWORD"
                @change="setPassword($event.target.value)"
            >
            <span @click="showAndHidePassword" class="toggle-password">
              <span v-if="!marked">
                <i class="fas fa-eye" />
              </span>
              <span v-if="marked">
                <i class="fas fa-eye-slash" />
              </span>
            </span>
          </label>
        </div>
        <div class="error" v-if="!$v.password.required && $v.password.$dirty">Please, enter your password</div>
        <div class="error" v-if="!authStatus && authStatus!==null">Invalid password or email</div>
        <div class="error"></div>
        <button type="submit" class="authpage__button-login">
          LOGIN <i class="fas fa-sign-in-alt"></i>
        </button>
        <label>
          <input type="checkbox" checked="checked" class="authpage__checkbox-remember"> Remember me
        </label>
      </div>
      <div class="authpage__container-bottom">
        <span class="authpage__link-forgot-password">
          Forgot <a @click="$router.push({name: 'changePasswordPage'})">password?</a>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: "AuthPage",

  data() {
    return {
      email: "",
      password: "",
      marked: null,
      authStatus: null
    }
  },

  validations: {
    email: { required, email },
    password: { required }
  },

  methods: {
    setEmail(value) {
      this.email = value
      this.$v.email.$touch()
    },

    setPassword(value) {
      this.password = value
      this.$v.password.$touch()
    },

    login: async function () {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      let email = this.email
      let password = this.password
      await this.$store.dispatch('login', { email, password })
          .then(() => {
            this.authStatus = true
            this.$router.push('/profile')
          })
          .catch(err => {
            this.authStatus = false
            console.log(err)
          })
    },

    showAndHidePassword: function () {
      const input = document.getElementById('password')
      const typePassword = input.getAttribute('type') === 'password' ?
          'text' : 'password'
      this.marked = !this.marked
      input.setAttribute('type', typePassword)
    }
  },
}
</script>

<style scoped>
html {
  overflow: hidden;
}

body {
  display: flex!important;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

form {
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  max-width: 500px;
}

.authpage__container{
  position: relative;
  margin: 50px auto;
  padding: 5px 20px;
  background: #fff;
  border-radius: 20px;
}

input[type=text],
input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  display: inline-block;
  font-size: 16px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0.5em;
  text-align: center;
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

.authpage__button-back {
  position: absolute;
  width: auto;
  left: 20px;
  top: 10px;
  font-size: 40px;
  background: transparent;
  color: #d9d9d9
}

.authpage__button-back:hover {
  color: dodgerblue;
}

.toggle-password {
  position: absolute;
  margin-top: 21px;
  margin-left: -30px;
  width: 20px;
  height: 25px;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  transition: 200ms ease;
}
.toggle-password:hover {
  color: dodgerblue;
}

a {
  transition: 300ms ease;
}

a:hover {
  transition: 300ms ease;
  color: dodgerblue;
}

.authpage__input-container.error input {
  border: 1px solid #c20a1d;
}

.error {
  color: #c20a1d;
}
</style>
