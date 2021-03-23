<template>
  <div class="chatpage">
    <user-list class="user-list"/>
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

h3 {
  margin-top: 0;
}

.chatpage {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
