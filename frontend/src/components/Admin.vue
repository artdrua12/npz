<template>
  <div class="admin-wrapper">
    <div class="admin">
      <div class="logo">
        <i class="material-icons">security</i>
        <h2>Покупка</h2>
      </div>
      <div>
        <div class="name">
          <h2>Вид</h2>
          <h2>Стоимость</h2>
          <h2>Настройки</h2>
        </div>
        <app-control v-for="(item,index) in responseMongoBuy" :key="index" :dataFromDb="item"></app-control>
      </div>
    </div>

    <div class="admin">
      <div class="logo">
        <i class="material-icons">security</i>
        <h2>Продажа</h2>
      </div>
      <div>
        <div class="name">
          <h2>Вид</h2>
          <h2>Стоимость</h2>
          <h2>Настройки</h2>
        </div>
        <app-control v-for="(item,index) in responseMongoCell" :key="index+'c'" :dataFromDb="item"></app-control>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Control from "./Control";
export default {
  data() {
    return {
      responseMongoBuy: null,
      responseMongoCell: null
    };
  },
  beforeRouteEnter(to, rromR, next) {
    if (sessionStorage.getItem("name") == "123") {
      next();
    } else {
      next("/checkForm");
    }
  },
  mounted() {
    axios.get("http://localhost:8081/Buy").then(response => {
      this.responseMongoBuy = response.data;
    });
    axios.get("http://localhost:8081/Cell").then(response => {
      this.responseMongoCell = response.data;
    });
  },
  methods: {
    onClick() {
      axios
        .put("http://localhost:8081", {
          id: this.id,
          dollar: this.inputValue
        })
        .then(function(response) {
          console.log(response);
        });
    }
  },
  components: {
    appControl: Control
  }
};
</script>

<style scoped>
div.admin-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
div.admin {
  width: 450px;
  border: 4px solid red;
  border-radius: 7px;
  color: whitesmoke;
}
div.name {
  display: flex;
  background: #4e4f54;
  padding:0px 20px;
}
div.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4e4f54;
}
.logo > i {
  color: #4caf50;
  font-size: 40px;
}
.admin > h2 {
  text-align: center;
  font-size: 30px;
}

.name h2:nth-child(1) {
  width: 90px;
}
.name h2:nth-child(2) {
  margin-right: auto;
}
</style>