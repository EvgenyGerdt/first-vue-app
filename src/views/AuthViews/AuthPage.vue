<template>
  <div class="authpage">
    <form @submit.prevent="login" class="authpage__container">
      <div class="authpage__container">
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
                v- model.trim="password"
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
        <button type="submit" class="authpage__button-login">LOGIN</button>
        <label>
          <input type="checkbox" checked="checked" class="authpage__checkbox-remember"> Remember me
        </label>
      </div>
      <div class="authpage__container-bottom">
        <button type="button" class="authpage__button-back" @click="$router.push({ name: 'homePage' })">BACK</button>
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
form {
  position: absolute;
  display: block;
  top: 10%;
  left: 35%;
}

input[type=text],
input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0.5em;
  text-align: center;
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

input[type=checkbox] {
  margin: 10px 0;
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
  width: auto;
  padding: 10px 18px;
  float: left;
  background-color: #f44336;
}

.authpage__container,
.authpage__container-bottom {
  padding: 16px;
  width: 50%;
}

span.authpage__link-forgot-password {
  float: right;
  padding-top: 16px;
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
