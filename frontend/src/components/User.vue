<template>
  <div class="appUser">
    <table>
      <tr>
        <th class="title" colspan="5">
          <i class="material-icons">redo</i>Покупка
        </th>
      </tr>
      <tr>
        <th>Кол-во</th>
        <th>Вал</th>
        <th>Курс покупки</th>
        <th>Купить</th>
        <th>Итого бел.руб</th>
      </tr>
      <tr>
        <td>
          <input v-model="inputValue" @keypress="onKeypress" />
        </td>

        <td>
          <select name="mySelect" @change="onChange" text="ddd" v-model="selected">
            <option v-for="(item, index) in responseMongo" :key="index" :value="index">{{item.name}}</option>
          </select>
        </td>
        <td>
          <h2>{{priceValue}} бел.руб</h2>
        </td>
        <td>
          <button @click="buy">
            <i class="material-icons">redo</i>Купить.
          </button>
        </td>
        <td class="summa">
          <h2>{{summa}}</h2>
        </td>
      </tr>
    </table>

    <table class="cell">
      <tr>
        <th class="title" colspan="5">
          <i class="material-icons">undo</i>Продажа
        </th>
      </tr>
      <tr>
        <th>Кол-во</th>
        <th>Вал</th>
        <th>Курс продажи</th>
        <th>Продажа</th>
        <th>Итого</th>
      </tr>
      <tr>
        <td>
          <input v-model="inputValueCell" @keypress="onKeypress" />
        </td>
        <td>
          <select name="mySelect" @change="onChangeCell" text="ddd" v-model="selectedCell">
            <option v-for="(item, index) in responseMongo" :key="index" :value="index">{{item.name}}</option>
          </select>
        </td>
        <td>
          <h2>{{priceValueCell}} бел.руб</h2>
        </td>
        <td>
          <button @click="cell">
            <i class="material-icons">undo</i>Продать
          </button>
        </td>
        <td class="summa">
          <input
            v-model="summaCell"
            ref="refInput"
            @keypress="onKeypressPoint"
            @input="onInputSummaCell"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      responseMongo: { name: "", price: 0 },
      selected: 0,
      selectedCell: 0,
      priceValue: 0,
      priceValueCell: 0,
      inputValue: "",
      summa: 0,
      inputValueCell: "",
      summaCell: ""
    };
  },

  mounted() {
    axios.get("http://localhost:8081").then(response => {
      //   this.inputValue = response.data[0].dollar;
      //   this.id = response.data[0]._id;
      this.responseMongo = response.data;
      this.priceValue = this.responseMongo[this.selected].price;
      this.priceValueCell = this.responseMongo[this.selected].price;
    });
  },
  methods: {
    buy() {
      this.summa = this.priceValue * this.inputValue;
    },
    cell() {
      let integer = Math.floor(this.inputValueCell);
      this.inputValueCell = integer;
      this.summaCell = this.priceValueCell * this.inputValueCell;
    },
    onChange() {
      this.inputValue = "";
      this.summa = "";
      let item = this.responseMongo[this.selected];
      if (!!item) {
        this.priceValue = item.price;
      }
    },
    onInputSummaCell() {
      this.inputValueCell = (this.summaCell / this.priceValueCell).toFixed(2);
    },
    onChangeCell() {
      (this.inputValueCell = ""), (this.summaCell = "");
      let item = this.responseMongo[this.selectedCell];
      if (!!item) {
        this.priceValueCell = item.price;
      }
    },
    onKeypress(e) {
      let code = e.charCode || e.keyCode;
      if (code < 48  || code > 57) {;
        e.preventDefault();
      }
    },
        onKeypressPoint(e) {
      let code = e.charCode || e.keyCode;
      if ((code < 48 && code != 46) || code > 57) {;
        e.preventDefault();
      }
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
  width: 150px;
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
  font-size: 20px;
  user-select: none;
}

input {
  width: 125px;
  height: 46px;
  font-size: 20px;
  border: 2px solid gainsboro;
  background-color: #f8f8f8;
  box-shadow: 0 1px rgba(255, 255, 255, 0.2) inset, 0 3px 5px rgba(0, 1, 6, 0.5),
    0 0 1px 1px rgba(0, 1, 6, 0.2);
  padding: 0px 7px;
}
input:focus {
  outline: none;
}
th.title {
  color: whitesmoke;
  font-size: 36px;
  padding: 20px;
  text-align: center;
}
table {
  background: #4e4f54;
  width: 100%;
  color: whitesmoke;
  /* font-size: 20px; */
  max-width: 800px;
  border: 4px solid yellowgreen;
  border-collapse: collapse;
}
table.cell {
  border: 4px solid #73d7f5;
  margin-top: 30px;
}
td.summa {
  width: 140px;
  max-width: 140px;
}
td,
th {
  padding: 10px 20px;
  width: 90px;
}
th {
  border: 4px solid yellowgreen;
}
.cell th {
  border: 4px solid #73d7f5;
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