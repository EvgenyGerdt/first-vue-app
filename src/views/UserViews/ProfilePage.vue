<template>
  <div class="profilepage">
    <div class="profilepage__container">
      <button
          class="profilepage__logout-btn"
          @click="logout"
      >
        <i class="fas fa-chevron-left"></i> Logout
      </button>
      <div class="profilepage__userdata-container">
        <h1 class="profilepage__userdata-title">Your profile</h1>
        <div class="profilepage__userdata-info">
          <h3 class="profilepage__userdata-email">
            {{ this.email }}
          </h3>
        </div>
      </div>
      <div class="profilepage__functional-blocks">
        <div class="profilepage__edit-user block" @click="showEditUserModal">
          <h3>Edit your profile</h3>
          <i class="fas fa-user-edit fa-5x"></i>
        </div>
        <div class="profilepage__add-to-friend block">
          <h3>Find friends</h3>
          <i class="fas fa-user-friends fa-5x"></i>
        </div>
      </div>

      <!-- Edit user modal-window -->
      <div id="modal" class="profilepage__edit-user-modal">
        <div id="modal-content" class="profilepage__edit-user-modal-content">
          <button class="profilepage__edit-user-modal-btn-close" @click="closeEditUserModal">
            <i class="fas fa-times"></i>
          </button>
          <div class="profilepage__edit-user-modal-container">
            <h1>Edit user</h1>
            <hr>
            <form class="profilepage__edit-user-modal__username">
              <div class="modal__username-input-container">
                <label>
                  Username
                  <input
                      type="text"
                      class="modal__input-username"
                      placeholder="USERNAME"
                  >
                </label>
                <button>SAVE USERNAME</button>
              </div>
            </form>
            <form class="profilepage__edit-user-modal__password">
              <div class="modal__password-input-container">
                <label>
                  Password
                  <input
                      type="password"
                      class="modal__input-password"
                      placeholder="PASSWORD"
                  >
                </label>
              </div>
              <div class="modal__repeat-password-input-container">
                <label>
                  Repeat password
                  <input
                      type="password"
                      class="modal-input-repeat-password"
                      placeholder="REPEAT PASSWORD"
                  >
                </label>
                <button>SAVE PASSWORD</button>
              </div>
            </form>
          </div>
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
      username: ''
    }
  },

  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      this.$router.push({name: 'homePage'})
    },

    showEditUserModal: function () {
      let modal = document.getElementById('modal')

      modal.style.display = 'block'

      window.onclick = function (event) {
        if(event.target === modal) {
          modal.style.display = 'none'
        }
      }
    },

    closeEditUserModal: function () {
      document.getElementById('modal').style.display = 'none'
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
  color: #d9d9d9;
  transition: 150ms ease;
}

.profilepage__logout-btn:hover {
  transition: 150ms ease;
  transform: translateX(-20px);
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
  opacity: 0.9;
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

.profilepage__container {
  height: 100vh;
  width: 100%;
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
  transform: translateY(-10px);
}

.profilepage__edit-user-modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.profilepage__edit-user-modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 25px 50px;
  border-radius: 1em;
  width: 50%;
}

.profilepage__edit-user-modal-btn-close {
  float: right;
  margin: -30px -40px 10px 0;
  padding-right: 10px;
  width: 20px;
  height: 20px;
  color: grey;
  background-color: transparent;
}

</style>
