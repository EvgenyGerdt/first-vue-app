<template>
  <div class="g-input__container">
    <label>
      <input
          class="g-input"
          v-bind="$attrs"
          :placeholder="this.placeholder"
          :type="this.type"
          ref="input"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "g-input",
  props: {
    placeholder: String,
    backgroundColor: String,
    type: String
  }
}
</script>

<style scoped>
input[type=text],
input[type=password] {
  display: flex;
  width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0.5em;
  text-align: center;
}
</style>
