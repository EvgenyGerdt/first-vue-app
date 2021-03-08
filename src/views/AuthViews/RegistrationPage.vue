<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <div class="registerpage">
      <form @submit.prevent="handleSubmit(register)" class="registerpage__container">
        <div class="registerpage__container">
          <h1 class="registerpage__title">Sign In</h1>
          <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
            <label>
              <input
                  required
                  v-model="email"
                  type="text"
                  class="registerpage__input-email"
                  placeholder="Input your email"
              >
              <span class="registerpage__notification-error">{{ errors[0] }}</span>
            </label>
          </ValidationProvider>
          <ValidationProvider name="Password" rules="required|max:120|min:6|confirmed" v-slot="{ errors }">
            <label>
              <input
                  required
                  v-model="password"
                  type="password"
                  class="registerpage__input-password"
                  placeholder="Input your password"
              >
              <span class="registerpage__notification-error">{{ errors[0] }}</span>
            </label>
          </ValidationProvider>
          <ValidationProvider name="ConfirmPassword" rules="target:Password" v-slot="{ errors }">
            <label>
              <input
                  type="password"
                  class="registerpage__input-password-confirm"
                  placeholder="Confirm your password"
              >
              <span class="registerpage__notification-error">{{ errors[0] }}</span>
            </label>
          </ValidationProvider>
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
          <span class="registerpage__link-forgot-password">
            Forgot <a @click="$router.push({ name: 'changePasswordPage' })">password?</a>
          </span>
        </div>
      </form>
    </div>
  </ValidationObserver>
</template>

<script>
export default {
  name: "RegistrationPage",
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register: async function () {
      let email = this.email
      let password = this.password
      await this.$store.dispatch('register', {email, password})
          .then(() => this.$router.push('/profile'))
          .catch((err) => console.log(err))
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
  width: auto;
  padding: 10px 18px;
  float: left;
  background-color: #f44336;
}

.registerpage__container,
.registerpage__container-bottom {
  padding: 16px;
  width: 50%;
}

span.registerpage__link-forgot-password {
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

.registerpage__notification-error {
  color: #c20a1d;
}
</style>
