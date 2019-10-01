<template>
  <div class="app" tabindex="-1">
    <h2>{{dataFromDb.name}}</h2>
    <h2 :tabindex="1" v-show="!show" @click.stop="showClick">
      {{counterSpace}}
      <i class="material-icons">keyboard_arrow_down</i>
    </h2>
    <div v-show="show" class="inputAdvance">
      <input
        tabindex="-1"
        :value="inputValue"
        ref="refInput"
        @focus="onFocus"
        @input="onInput"
        @keypress="onKeypress"
        @keydown="onKeydown"
        @click.stop="inputClick"
      />
      <i class="top material-icons" @click.stop.prevent="updateCount(1)">arrow_drop_up</i>
      <i class="bottom material-icons" @click.stop.prevent="updateCount(-1)">arrow_drop_down</i>
    </div>
    
    <button @click="save">Sav</button>
    <button @click="delet">
      <i class="material-icons">delete_forever</i>
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    dataFromDb: {
      default: 0
    },
    text: {
      default: "text"
    }
  },
  data() {
    return {
      show: false,
      oldinputValue: "",
      inputValue: 0
    };
  },
  mounted() {
    this.inputValue = this.dataFromDb.price;
  },
  methods: {
    onKeypress(e) {
      let code = e.charCode || e.keyCode;
      if (code == 13) {
        this.show = false;
      }
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
        case 27:
          this.show = false;
          this.inputValue = this.oldinputValue;
          break;
        default:
          break;
      }
    },
    onFocus() {
      this.oldinputValue = this.inputValue;
    },
    showClick() {
      this.show = true;
      setTimeout(() => {
        this.$refs.refInput.select();
      }, 50);
    },
    updateCount(value) {
      this.$refs.refInput.focus();
      if (this.inputValue + value >= 0) {
        this.inputValue += value;
      } else {
        return;
      }
    },
    onInput({ target }) {
      let val = +target.value;
      this.inputValue = val;
    },
    inputClick(e) {
      e.target.select();
    },
    save() {
      axios
        .put("http://localhost:8081", {
          id: this.dataFromDb._id,
          adminPrice: this.inputValue
        })
        .then(function(response) {
          console.log(response);
        });
    },
    delet() {
      this.inputValue = 0;
    }
  },
  computed: {
    counterSpace() {
      let str = new String(this.inputValue).split("").reverse();
      for (let i = 0; i < str.length; i += 4) {
        str.splice(i, 0, " ");
      }
      return str.reverse().join("");
    }
  }
};
</script>

<style scoped>
.app {
  display: flex;
  height: 50px;
  padding: 20px;
  border-top: 1px solid red;
  background: #4e4f54;
}
.app:focus {
  outline: none;
}
.inputAdvance {
  width: 140px;
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

h2 {
  color: whitesmoke;
  margin: 10px 0 0 0;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
}
h2:first-child {
  width: 100px;
}
h2:nth-child(2):hover {
  color: wheat;
}

input {
  margin: 0 0px 0 10px;
  flex-basis: 100%;
  width: 110px;
  font-size: 20px;
  border: none;
  background-color: #f8f8f8;
}
input:focus {
  outline: none;
}
p {
  color: royalblue;
  margin: 0 10px;
}
button:nth-of-type(1) {
  margin-left: auto;
}
button {
  margin-left: 7px;
  width: 55px;
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