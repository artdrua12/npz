<template>
  <div class="admin-wrapper">
    <div class="admin">
      <div class="logo">
        <i class="material-icons">security</i>
        <h2>Buy</h2>
      </div>
      <div>
        <div class="name">
          <button @click="showAddMoney('Buy')">Вид</button>
          <h2>Стоимость</h2>
          <h2>Настройки</h2>
        </div>
        <app-control
          v-for="(item,index) in responseMongoBuy"
          :key="index"
          :dataFromDb="item"
          type="Buy"
        ></app-control>
      </div>
    </div>

    <div class="admin">
      <div class="logo">
        <i class="material-icons">security</i>
        <h2>Cell</h2>
      </div>
      <div>
        <div class="name">
          <button @click="showAddMoney('Cell')">Вид</button>
          <h2>Стоимость</h2>
          <h2>Настройки</h2>
        </div>
        <app-control
          v-for="(item,index) in responseMongoCell"
          :key="index+'c'"
          :dataFromDb="item"
          type="Cell"
        ></app-control>
      </div>
    </div>

    <div class="add" v-show="show">
      <i class="material-icons" @click="show=false">clear</i>
      <table>
        <tr>
          <th class="title" colspan="2">{{type}}</th>
        </tr>
        <tr>
          <th>Вид валюты</th>
          <th>Стоимость</th>
        </tr>
        <tr>
          <td><input v-model="moneyView"/></td>
          <td><input v-model="moneyPrice"/></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button @click="addtoMongo">Добавить</button>
          </td>
        </tr>
      </table>
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
      responseMongoCell: null,
      show: false,
      type: "",
      moneyView:"",
      moneyPrice:""
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
    },
    showAddMoney(text) {
      this.show = true;
      this.type = text;
    },
    addtoMongo() {
      axios.post("http://localhost:8081", {
        moneyView: this.moneyView,
        moneyPrice: this.moneyPrice,
        type: this.type
      });
      this.show = false;
       axios.get("http://localhost:8081/"+this.type).then(response => {
      this["responseMongo"+this.type] = response.data;
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
  width: 460px;
  min-width: 440px;
  border: 4px solid red;
  border-radius: 7px;
  color: whitesmoke;
}
div.name {
  display: flex;
  background: #4e4f54;
  padding: 0px 20px 0px 0px;
  align-items: center;
}
div.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4e4f54;
}
div.add {
  position: absolute;
  top: 45vh;
  display: flex;
  justify-content: space-evenly;
  padding: 20px 30px;
  background-color: #64656c;
  border: 4px solid whitesmoke;
  color: whitesmoke;
}
.add i {
  position: absolute;
  right: 10px;
  top: 10px;
}
.logo > i {
  color: #4caf50;
  font-size: 40px;
}
.admin > h2 {
  text-align: center;
  font-size: 30px;
}

.name button {
  font-family: serif;
  font-size: 20px;
  font-weight: bold;
  padding: 8px 24px;
  margin: 0px 30px 0px 10px;
}
.name h2:nth-child(2) {
  margin-right: auto;
}
input {
  flex-basis: 100%;
  width: 140px;
  height: 46px;
  padding: 5px 7px;
  font-size: 20px;
  border: none;
  background: #4e4f54;
  color: whitesmoke;
  box-shadow: 0 0 1px rgba(184, 178, 178, 0.5) inset,
    0 2px 3px rgba(0, 0, 0, 0.5) inset, 0 1px 1px rgba(255, 255, 255, 0.1);
}
input:focus {
  outline: none;
}
.add button {
  width: 100%;
  height: 46px;
  margin-top: 12px;
}
button {
  box-shadow: 0 1px rgba(255, 255, 255, 0.2) inset, 0 3px 5px rgba(0, 1, 6, 0.5),
    0 0 1px 1px rgba(0, 1, 6, 0.2);
  outline: none;
  color: whitesmoke;
  border-radius: 3px;
  background: linear-gradient(rgb(110, 112, 120), rgb(81, 81, 86))
    rgb(110, 112, 120);
}
button:active {
  background: linear-gradient(rgb(76, 77, 82), rgb(56, 57, 62)) rgb(76, 77, 82);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5) inset,
    0 2px 3px rgba(0, 0, 0, 0.5) inset, 0 1px 1px rgba(255, 255, 255, 0.1);
}
table {
  border-spacing: 10px 7px;
}
th {
  text-align: start;
  font-family: sans-serif;
}
th.title {
  font-size: 35px;
  text-align: center;
  padding: 0px 0px 20px 0px;
  font-family: "Times New Roman", Times, serif;
}
</style>