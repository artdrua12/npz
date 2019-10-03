<template>
  <div class="applogs">
    <h1>Logs</h1>
    <table>
      <tr class="title">
        <th colspan="5">
          <i class="material-icons">redo</i>Куплено
          <input v-model="inputBuy" />
        </th>
      </tr>
      <tr>
        <th>Название</th>
        <th>Количество</th>
        <th>Цена покупки</th>
        <th>Дата операции</th>
        <th>Сумма бел.руб</th>
      </tr>
      <tr v-for="item in filterBuy" :key="item._id">
        <td>{{item.name}}</td>
        <td>{{item.count}}</td>
        <td>{{item.price}} бел.руб</td>
        <td>{{item.date}}</td>
        <td>{{item.summa}}</td>
      </tr>
    </table>

    <table>
      <tr class="title">
        <th colspan="5">
          <i class="material-icons">undo</i>Продано
          <input v-model="inputCell" />
        </th>
      </tr>
      <tr>
        <th>Название</th>
        <th>Количество</th>
        <th>Цена продажи</th>
        <th>Дата операции</th>
        <th>Сумма бел.руб</th>
      </tr>
      <tr v-for="item in filterCell" :key="item._id">
        <td>{{item.name}}</td>
        <td>{{item.count}}</td>
        <td>{{item.price}} бел.руб</td>
        <td>{{item.date}}</td>
        <td>{{item.summa}}</td>
      </tr>
    </table>
    <div>
      <ve-line width="300px" :data="chartData"></ve-line>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VeLine from 'v-charts/lib/line.common'
export default {
  data() {
    return {
      responseLogsBuy: {},
      responseLogsCell: {},
      array: ["dfrff", "dfetff", "rew", "klj"],
      inputBuy: "",
      inputCell: "",
            chartData: {
        columns: ['date', 'PV'],
        rows: [
          { 'date': '01-01', 'PV': 1231 },
          { 'date': '01-02', 'PV': 1223 },
          { 'date': '01-03', 'PV': 2123 },
          { 'date': '01-04', 'PV': 4123 },
          { 'date': '01-05', 'PV': 3123 },
          { 'date': '01-06', 'PV': 7123 }
        ]
      }
    };
  },
  mounted() {
    axios.get("http://localhost:8081/logs/Buy").then(response => {
      this.responseLogsBuy = response.data;
    });
    axios.get("http://localhost:8081/logs/Cell").then(response => {
      this.responseLogsCell = response.data;
    });
  },
  computed: {
    filterBuy() {
      return Array.from(this.responseLogsBuy).filter(itemBuy => {
        return itemBuy.name.indexOf(this.inputBuy) !== -1;
      });
    },
    filterCell() {
      return Array.from(this.responseLogsCell).filter(itemCell => {
        return itemCell.name.indexOf(this.inputCell) !== -1;
      });
    }
  }
};
</script>

<style  scoped>
div.applogs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
h1{
  flex-basis: 100%;
  text-align: center;
}
table {
 width: 450px;
  border-collapse: collapse;
  background-color: white;
  border: 3px solid #080084;
}

tr.title {
  font-size: 30px;
  background-color: #080084;
  box-shadow: 0 1px rgba(255, 255, 255, 0.2) inset, 0 3px 5px rgba(0, 1, 6, 0.5),
    0 0 1px 1px rgba(0, 1, 6, 0.2);
  color: whitesmoke;
  border: none;
}
.title th {
  background-color: #080084;
}
th,
td {
  border-top: 1px solid #080084;
  text-align: center;
  padding: 12px 7px;
}
td {
  font-size: px;
}
tr:nth-child(2n + 1) {
  background-color: rgb(222, 231, 233);
}
</style>