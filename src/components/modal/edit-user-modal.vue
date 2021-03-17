<template>
 <transition name="fade">
   <div id="modal" class="profilepage__edit-user-modal" >
     <transition name="bounce" appear>
       <div id="modal-content" class="profilepage__edit-user-modal-content">
         <button class="profilepage__edit-user-modal-btn-close" @click="closeEditUserModal">
           <i class="fas fa-times"></i>
         </button>
         <div class="profilepage__edit-user-modal-container">
           <form class="profilepage__edit-user-modal__username" @submit.prevent="setUsername">
             <div class="modal__username-input-container">
               USERNAME
               <hr>
               <g-input
                   required
                   v-model="username"
                   placeholder="USERNAME"
                   type="text"
               />
               <g-button type="submit" text="SAVE USERNAME"/>
             </div>
           </form>
           <form class="profilepage__edit-user-modal__password">
             <div class="modal__password-input-container">
               <label>
                 PASSWORD
                 <hr>
                 <g-input
                     required
                     v-model="password"
                     placeholder="PASSWORD"
                     type="password"
                 />
                 <g-input
                     required
                     v-model="confirmPassword"
                     placeholder="CONFIRM PASSWORD"
                     type="password"
                 />
                 <g-button text="SAVE PASSWORD"/>
               </label>
             </div>
           </form>
         </div>
       </div>
     </transition>
   </div>
 </transition>
</template>

<script>
import GInput from "@/components/ui/g-input";
import GButton from '@/components/ui/g-button'

export default {
  name: "edit-user-modal",
  components: {GInput, GButton},
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
    }
  },

  methods: {
    closeEditUserModal: function () {
      this.$emit('toggle-modal')
    },

    setUsername: async function () {
      let userId = localStorage.getItem('id')
      let username = this.username
      await this.$store.dispatch('set_username', { username, userId})
          .catch((err) => console.log(err))
    },
  }
}
</script>

<style scoped>
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

.bounce-enter-active {
  animation: bounce-in .5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
