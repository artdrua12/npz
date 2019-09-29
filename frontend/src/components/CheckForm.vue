<template>
  <div class="check">
    <div class="logo">
      <i class="material-icons">fingerprint</i>
      <h1>Аутентификация</h1>
    </div>
    <span>(пароль:123)</span>
    <input v-model="inputValue" />
    <button @click="Check">Проверить</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputValue: ""
    };
  },
  mounted() {
    // axios.get("http://localhost:8081").then(response => {
    //   this.name = response.data;
    // });
  },
  methods: {
    Check() {
      sessionStorage.setItem('name',this.inputValue);
      this.inputValue = ""
      this.$router.push("/admin");
    }
  }
};
</script>

<style scoped>
div.check {
  display: flex;
  margin: auto;
  border: 2px solid red;
  background: #4e4f54;
  flex-direction: column;
  text-align: center;
  color: whitesmoke;
  padding: 0px 30px;
}
.logo > i {
  color: greenyellow;
  font-size: 40px;
}
div.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  margin: 30px 0px 0px 0px;
}
h1 {
  margin: 0px;
}
input {
  padding: 10px;
  font-size: 20px;
  border: none;
  background-color: #f8f8f8;
}
input:focus {
  outline: none;
}
button {
  margin: 30px;
  width: 150px;
  height: 48px;
  box-shadow: 0 1px rgba(255, 255, 255, 0.2) inset, 0 3px 5px rgba(0, 1, 6, 0.5),
    0 0 1px 1px rgba(0, 1, 6, 0.2);
  outline: none;
  color: whitesmoke;
  border-radius: 3px;
  background: linear-gradient(rgb(110, 112, 120), rgb(81, 81, 86))
    rgb(110, 112, 120);
  align-self: center;
    box-shadow: rgba(0,0,0,.5) 3px 10px 10px -10px;
}
button:active {
  background: linear-gradient(rgb(76, 77, 82), rgb(56, 57, 62)) rgb(76, 77, 82);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5) inset,
    0 2px 3px rgba(0, 0, 0, 0.5) inset, 0 1px 1px rgba(255, 255, 255, 0.1);
}
</style>