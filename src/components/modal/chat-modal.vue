<template>
  <transition name="fade">
    <div id="modal" class="chat__modal">
        <div id="modal-content" class="chat__content">
          <button class="chat__btn-close" @click="closeChatModal">
            <i class="fas fa-times"></i>
          </button>
          <div class="chat__chat-window">
            <div
                class="message"
                v-for="message in allMessages"
                :key="messageBody = message.messageBody"
            >
              <div class="message-body">
                {{ messageBody }}
              </div>
            </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "chat-modal",
  data() {
    return {
      messages: [],
      isOwner: true
    }
  },

  props: {
    chatWith: String
  },

  methods: {
    closeChatModal: function () {
      this.$emit('toggle-modal')
    },
  },

  async beforeMount() {
    let id = localStorage.getItem('id')
    await this.$store.dispatch('GET_MESSAGES', {id})
        .then(() => {
          this.messages = this.$store.getters.getMessages
        })
        .catch((err) => console.log(err))
  },

  computed: {
    allMessages() {
      return this.messages
    }
  }
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

.chat__btn-close {
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

.chat__modal {
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

.chat__content {
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

.chat__btn-close {
  position: absolute;
  top: -5px;
  right: 10px;
  padding-right: 10px;
  width: 20px;
  height: 20px;
  color: #808080;
  background-color: transparent;
}

.message {
  display: flex;
  margin: 5px;
  padding: 10px;
  border: 1px solid darkgray;
  border-radius: 1em;
  background: white;
}

</style>
