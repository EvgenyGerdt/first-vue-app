<template>
  <div class="registerpage">
    <form @submit.prevent="register" class="registerpage__container">
      <div class="registerpage__container">
        <h1 class="registerpage__title">Sign In</h1>
        <div
            class="registerpage__container-input"
            :class="{'error': $v.email.$error}"
        >
          <label>
            <input
                required
                type="text"
                class="registerpage__input-email"
                placeholder="Input your email"
                autocomplete="off"
                @change="setEmail($event.target.value)"
            >
          </label>
        </div>
        <div class="error" v-if="!$v.email.required && $v.email.$dirty">Please, enter your email</div>
        <div class="error" v-if="!$v.email.email && $v.email.$dirty">Please, enter correct email</div>
        <div class="error" v-if="isEmailExists && $v.email.$dirty">This email address already exists</div>
        <div
            class="registrationpage__container-input"
            :class="{'error': $v.password.$error}"
        >
          <label>
            <input
                required
                type="password"
                class="registerpage__input-password"
                placeholder="Input your password"
                autocomplete="new-password"
                @change="setPassword($event.target.value)"
            >
          </label>
        </div>
        <div class="error" v-if="!$v.password.required && $v.password.$dirty">Please, enter your password</div>
        <div class="error" v-if="!$v.password.minLength && $v.password.$dirty">Password must have at least 6 characters</div>
        <div class="error" v-if="!$v.password.maxLength">Password too large</div>
        <div
            class="registerpage__container-input"
            :class="{'error': $v.confirmPassword.$error}"
        >
          <label>
            <input
                type="password"
                name="confirm__pass"
                class="registerpage__input-password-confirm"
                placeholder="Confirm your password"
                autocomplete="new-password"
                @change="setConfirmPassword($event.target.value)"
            >
          </label>
        </div>
        <div class="error" v-if="!$v.confirmPassword.sameAsPassword">Password confirmation does not match</div>
        <button type="submit" class="registerpage__button-login">SIGN UP</button>
      </div>
      <div class="registerpage__container-bottom">
        <button
            type="button"
            class="registerpage__button-back"
            @click="$router.push({ name: 'homePage' })"
        >
          BACK
        </button>
        <span>You already have account? Just <a @click="$router.push({name: 'authPage'})">Sign in!</a></span  >
      </div>
    </form>
  </div>
</template>

<script>
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'
import store from '../../store/index'

export default {
  name: "RegistrationPage",

  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    authStatus: store.getters.isAuthenticated,
    isEmailExists: false
  }),

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6), maxLength: maxLength(1024) },
    confirmPassword: { sameAsPassword: sameAs('password') },
  },

  methods: {
    setEmail(value) {
      this.email = value
      this.$v.email.$touch()
      if(value !== '') {
        this.checkEmail(value)
      }
    },

    async checkEmail(value) {
      let email = value
      this.error = false
      await this.$store.dispatch('CHECK_EMAIL_REQUEST', {email})
          .catch((err) => console.log(err))
    },

    setPassword(value) {
      this.password = value
      this.$v.password.$touch()
    },

    setConfirmPassword(value) {
      this.confirmPassword = value
      this.$v.confirmPassword.$touch()
    },

    register: async function () {
      let email = this.email
      let password = this.password
      this.error = false
      await this.$store.dispatch('REGISTER_REQUEST', {email, password})
          .then(() => {
            this.authStatus = true
            this.$router.push('/profile')
          })
          .catch((err) => {
            this.authStatus = false
            console.log(err)
          })
    },
  },

  watch: {
    email: function () {
      this.isEmailExists = store.getters.isEmailExists
    }
  }
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

.registerpage__button-back {
  background-color: #f44336;
}

.registerpage__container,
.registerpage__container-bottom {
  padding: 16px;
  width: 50%;
}

a {
  transition: 300ms ease;
}

a:hover {
  transition: 300ms ease;
  color: dodgerblue;
}

small {
  color: #c20a1d;
  margin: 0;
}

.registerpage__container-input.error input {
  border: 1px solid #c20a1d;
}

.error {
  color: #c20a1d;
}

</style>
