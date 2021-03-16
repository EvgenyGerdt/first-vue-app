<template>

</template>

<script>
export default {
  name: "g-button"
}
</script>

<style scoped>
button {
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

button:hover {
  transition: 150ms ease;
  opacity: 0.9;
}
</style>
