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
  width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  display: inline-block;
  font-size: 16px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0.5em;
  text-align: center;
  outline: none;
  transition: 0.4s;
}
</style>
