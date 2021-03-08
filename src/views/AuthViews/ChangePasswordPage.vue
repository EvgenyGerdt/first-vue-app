<template>
  <div class="change-password-page">
    <form action="" class="change-password-page__container">
      <h2 class="change-password-page__title">Change your password</h2>
      <div class="change-password-page__inputs-container">
        <label>
          <tr>
            <td>
              <input type="text" class="change-password-page__input-email" placeholder="Write your email...">
              <input type="password" class="change-password-page__input-new-password" placeholder="Write your new password">
              <input type="password" class="change-password-page__input-repeat-new-password" placeholder="Repeat your new password">
            </td>
          </tr>
        </label>
        <div class="change-password-page__buttons-container">
          <button class="change-password-page__button-change-password">Change Password</button>
          <button class="change-password-page__button-back" @click="$router.back()">Back</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChangePasswordPage"
}
</script>

<style scoped>
.change-password-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  display: flex;
  height: 40px;
  width: 300px;
  margin: 10px;
  justify-content: flex-end;
  text-align: center;
}

button {
  width: 200px;
  height: 40px;
  margin: 10px;
  background-color: mediumseagreen;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: transparent;
  border-radius: 1em;
  cursor: pointer;
}
</style>
