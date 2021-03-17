<template>
  <transition name="fade">
    <div id="modal" class="friends-modal">
      <transition name="slide-fade" appear>
        <div class="friends-modal__content">
          <button class="friends-modal-btn-close" @click="closeFriendsModal">
            <i class="fas fa-times"></i>
          </button>
          <g-user-list/>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import gUserList from '../ui/user-list'

export default {
  name: "friends-modal",

  components: {
    gUserList,
  },

  methods: {
    closeFriendsModal: function () {
      this.$emit('toggle-modal')
    },
  }
}
</script>

<style scoped>
.friends-modal-btn-close {
  position: absolute;
  top: 5px;
  right: 5px;
  padding-right: 10px;
  width: 20px;
  height: 20px;
  color: #808080;
  background-color: transparent;
  border: transparent;
}

.friends-modal {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.friends-modal__content {
  position: relative;
  background-color: #fefefe;
  margin: 7% auto;
  padding: 25px 50px;
  border-radius: 1em;
  width: 50%;
  box-shadow: 1px 1px 24px grey;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>
