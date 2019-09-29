<template>
  <div class="admin">
    <div class="logo">
      <i class="material-icons">security</i>
      <h2>Администратор</h2>
    </div>
    <div>
      <div class="name">
        <h2>Название</h2>
        <h2>Стоимость</h2>
        <h2>Настройки</h2>
      </div>
      <app-control v-for="(item,index) in responseMongo" :key="index" :dataFromDb="item"></app-control>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Control from "./Control";
export default {
  data() {
    return {
      responseMongo: null
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
    axios.get("http://localhost:8081").then(response => {
      this.responseMongo = response.data;
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
.logo > i {
  color: #4caf50;
  font-size: 40px;
}
.admin {
  border: 4px solid red;
  border-radius: 7px;
  color: whitesmoke;
}
.name {
  display: flex;
  background: #4e4f54;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  background: #4e4f54;
}
.admin > h2 {
  text-align: center;
  font-size: 30px;
}

.name h2 {
  padding-left: 20px;
}
.name h2:nth-child(1) {
  width: 130px;
}
.name h2:nth-child(2) {
  width: 220px;
}
</style>