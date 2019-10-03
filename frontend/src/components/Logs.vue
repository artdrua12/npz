<template>
  <div class="applogs">
    <div class="logs">
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{calculationBuy}}</td>
        </tr>
      </table>
      <ve-histogram width="300px" :data="chartDataBuyHisto"></ve-histogram>
      <ve-pie width="300px" :data="chartDataBuyPie"></ve-pie>
    </div>
    <div class="logs">
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{calculationCell}}</td>
        </tr>
      </table>
      <ve-histogram width="300px" :data="chartDataCellHisto"></ve-histogram>
      <ve-pie width="300px" :data="chartDataCellPie"></ve-pie>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VeLine from "v-charts/lib/line.common";
export default {
  data() {
    return {
      responseLogsBuy: {},
      responseLogsCell: {},
      array: ["dfrff", "dfetff", "rew", "klj"],
      inputBuy: "",
      inputCell: "",
      chartDataBuyHisto: {
        columns: ["price", "count"],
        rows: []
      },
      chartDataBuyPie: {
        columns: ["name", "summa"],
        rows: []
      },
      chartDataCellHisto: {
        columns: ["price", "count"],
        rows: []
      },
      chartDataCellPie: {
        columns: ["name", "summa"],
        rows: []
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
    },
    calculationBuy() {
      this.chartDataBuyHisto.rows = this.filterBuy;
      this.chartDataBuyPie.rows = this.responseLogsBuy;
      let totalSumma = 0;
      for (let i of Array.from(this.filterBuy)) {
        totalSumma += +i.summa;
      }
      return totalSumma;
    },
    calculationCell() {
      this.chartDataCellHisto.rows = this.filterCell;
      this.chartDataCellPie.rows = this.responseLogsCell;
      let totalSumma = 0;
      for (let i of Array.from(this.filterCell)) {
        totalSumma += +i.summa;
      }
      return totalSumma;
    }
  }
};
</script>

<style  scoped>
div.applogs {
  width: 100%;
  margin: auto;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-around; */
}
div.logs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  max-height: 570px;
  overflow: auto;
  border: 1px solid #080084;
  margin-top: 30px;
}

h1 {
  flex-basis: 100%;
  text-align: center;
}
input {
  margin-left: 105px;
  border-radius: 7px;
  width: 140px;
  height: 35px;
  padding: 5px 12px;
  font-size: 20px;
  border: none;
  font-weight: bold;
  background: #c9cbd7;
  box-shadow: 0 0 1px rgba(184, 178, 178, 0.5) inset,
    0 2px 3px rgba(0, 0, 0, 0.5) inset, 0 1px 1px rgba(255, 255, 255, 0.1);
}
input:focus {
  outline: none;
}
table {
  width: 450px;
  border-collapse: collapse;
  background-color: white;
  border: 3px solid #080084;
  max-height: 300px;
  overflow: auto;
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
  padding: 15px 12px;
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

tr:last-child {
  font-size: 20px;
}
</style>