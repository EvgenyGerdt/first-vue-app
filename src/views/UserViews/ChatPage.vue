<template>
  <div class="chatpage">
    <user-list class="user-list"/>
    <div class="chat">
      <div class="chat__header">
        <h3>Chat</h3>
      </div>
    </div>
  </div>
</template>

<script>
import UserList from "@/components/ui/user-list";

export default {
  name: "ChatPage",
  components: {UserList},
}
</script>

<style scoped>
body {
  overflow: hidden;
}

.chat {
  width: 100%;
  margin: 0;
}

.chat__header {
  justify-content: center;
  padding: 10px 10px;
  background-color: dodgerblue;
  margin-left: -2px;
  color: white;
}

h3 {
  margin-top: 0;
}

.chatpage {
  display: flex;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
