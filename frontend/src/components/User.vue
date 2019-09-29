<template>
  <table>
    <caption>Пользователь</caption>
    <tr>
      <th>Вид</th>
      <th>Стоимость</th>
      <th>Количество</th>
      <th>Операции</th>
      <th>Сумма</th>
    </tr>
    <tr>
      <td>
        <select name="mySelect" @change="onChange" text="ddd" v-model="selected">
          <option v-for="(item, index) in responseMongo" :key="index" :value="index">{{item.name}}</option>
        </select>
      </td>
      <td>
        <h2>{{priceValue}}</h2>
      </td>
      <td>
        <div class="inputAdvance">
          <input
            v-model="inputValue"
            ref="refInput"
            @input="onInput"
            @keypress="onKeypress"
            @keydown="onKeydown"
            @click.stop="inputClick"
          />
          <i class="top material-icons" @click.stop.prevent="updateCount(1)">arrow_drop_up</i>
          <i class="bottom material-icons" @click.stop.prevent="updateCount(-1)">arrow_drop_down</i>
        </div>
      </td>
      <td>
        <button @click="Summa">
          <i class="material-icons">redo</i>Получить
        </button>
      </td>
      <td class="summa">
        <h2>{{summa}}</h2>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      responseMongo: { name: "", price: 0 },
      selected: 0,
      priceValue: 0,
      inputValue: 0,
      summa: 0
    };
  },
  mounted() {
    axios.get("http://localhost:8081").then(response => {
      //   this.inputValue = response.data[0].dollar;
      //   this.id = response.data[0]._id;
      this.responseMongo = response.data;
      this.priceValue = this.responseMongo[this.selected].price;
    });
  },
  methods: {
    Summa() {
      this.summa = this.priceValue * this.inputValue;
    },
    onChange() {
      this.inputValue = 0;
      this.summa = 0;
      let item = this.responseMongo[this.selected];
      if (!!item) {
        this.priceValue = item.price;
      }
    },
    onKeypress(e) {
      let code = e.charCode || e.keyCode;
      if (code < 48 || code > 57) {
        e.preventDefault();
      }
    },
    onKeydown(e) {
      let code = e.charCode || e.keyCode;
      switch (code) {
        case 40:
          this.updateCount(-1);
          e.preventDefault();
          break;
        case 38:
          this.updateCount(1);
          e.preventDefault();
          break;
        default:
          break;
      }
    },
    showClick() {
      setTimeout(() => {
        this.$refs.refInput.select();
      }, 50);
    },
    onInput({ target }) {
      let val = +target.value;
      this.inputValue = val;
    },
    updateCount(value) {
      this.$refs.refInput.focus();
      if (this.inputValue + value >= 0) {
        this.inputValue += value;
      } else {
        return;
      }
    },
    inputClick(e) {
      e.target.select();
    }
  }
};
</script>

<style scoped>
div.user {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid green;
}

.inputAdvance {
  width: 190px;
  height: 46px;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 2px solid gainsboro;
  background-color: #f8f8f8;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 1px rgba(255, 255, 255, 0.2) inset, 0 3px 5px rgba(0, 1, 6, 0.5),
    0 0 1px 1px rgba(0, 1, 6, 0.2);
}
.material-icons {
  font-size: 23px;
  user-select: none;
}
.inputAdvance .material-icons {
  color: black;
}
input {
  margin: 0 0px 0 10px;
  flex-basis: 100%;
  width: 140px;
  font-size: 20px;
  border: none;
  background-color: #f8f8f8;
}
input:focus {
  outline: none;
}
caption {
  color: whitesmoke;
  font-size: 24px;
  background: #4e4f54;
  border: 4px solid yellowgreen;
  border-bottom: none;
  font-size: 36px;
  padding: 20px;
}
table {
  background: #4e4f54;
  width: 100%;
  color: whitesmoke;
  font-size: 20px;
  max-width: 800px;
  border: 4px solid yellowgreen;
  border-collapse: collapse;
}
td.summa {
  width: 140px;
}
td,
th {
  padding: 10px 20px;
}
th {
  border: 4px solid yellowgreen;
}
th {
  text-align: start;
}
select {
  font-size: 25px;
  border-radius: 3px;
  height: 48px;
  outline: none;
}
button {
  width: 90px;
  height: 48px;
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
</style>