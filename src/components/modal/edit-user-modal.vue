<template>
  <transition name="fade">
    <div id="modal" class="profilepage__edit-user-modal">
      <transition enter-active-class="animated animate__bounceInUp" appear>
        <div id="modal-content" class="profilepage__edit-user-modal-content">
          <button class="profilepage__edit-user-modal-btn-close" @click="closeEditUserModal">
            <i class="fas fa-times"></i>
          </button>
          <div class="profilepage__edit-user-modal-container">
            <form class="profilepage__edit-user-modal__username" @submit.prevent="setUsername">
              <div class="modal__username-input-container">
                USERNAME
                <hr>
                <label>
                  <input
                      required
                      v-model="changedUsername"
                      placeholder="USERNAME"
                      type="text"
                  >
                </label>
                <div class="error" v-if="isExists">This username already exists</div>
                <g-button type="submit" text="SAVE USERNAME"/>
              </div>
            </form>
            <form class="profilepage__edit-user-modal__password" @submit.prevent="updatePassword">
              <div class="modal__password-input-container">
                  PASSWORD
                <hr>
                <label>
                  <input
                      required
                      v-model.trim="passwordForm.currentPassword"
                      placeholder="Write your current password..."
                      type="password"
                  />
                  <input
                      required
                      v-model.trim="passwordForm.updatedPassword"
                      placeholder="Write your new password..."
                      type="password"
                  />
                  <input
                      required
                      v-model.trim="passwordForm.confirmUpdatedPassword"
                      placeholder="Confirm your new password..."
                      type="password"
                  />
                </label>
                <g-button text="SAVE PASSWORD"/>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import {validationMixin} from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/src/validators'
import GButton from '@/components/ui/g-button'

export default {
  name: "edit-user-modal",
  components: {GButton},
  data() {
    return {
      changedUsername: '',
      isExists: false,
      passwordForm: {
        currentPassword: '',
        updatedPassword: '',
        confirmUpdatedPassword: ''
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    passwordForm: {
      currentPassword: { required, minLength: minLength(6), maxLength: maxLength(1024) }
    }
  },

  methods: {
    closeEditUserModal: function () {
      this.$emit('toggle-modal')
    },

    setChangedUsername(value) {
      this.changedUsername = value
      this.$v.currentPassword.$touch()
    },

    setCurrentPassword(value) {
      this.currentPassword = value
      this.$v.currentPassword.$touch()
    },

    setUsername: async function () {
      let userId = localStorage.getItem('id')
      let username = this.changedUsername
      await this.$store.dispatch('CHANGE_DATA_REQUEST', { username, userId })
          .then(() => {
            this.isExists = false
            this.$emit('change-username', {
              username: username
            })
          })
          .catch((err) => {
            this.isExists = true
            console.log(err)
          })
    },

    updatePassword: async function () {

    }
  },
}
</script>

<style scoped>
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

.profilepage__edit-user-modal-btn-close {
  display: flex;
  margin: 10px 0;
  background-color: dodgerblue;
  color: white;
  padding: 12px 20px;
  border: transparent;
  border-radius: 0.5em;
  cursor: pointer;
  width: 100%;
  transition: 150ms ease;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  outline: none;
}

.profilepage__edit-user-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.profilepage__edit-user-modal-content {
  position: relative;
  background-color: #fefefe;
  box-shadow: 1px 1px 24px grey;
  margin: 7% auto;
  padding: 25px 50px;
  border-radius: 1em;
  width: 50%;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.profilepage__edit-user-modal-btn-close {
  position: absolute;
  top: -5px;
  right: 10px;
  padding-right: 10px;
  width: 20px;
  height: 20px;
  color: #808080;
  background-color: transparent;
}

.error {
  color: #c20a1d;
}
</style>
