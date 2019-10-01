<template>
  <div class="inputAdvance">
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
</template>

<script>
export default {
  props: {
    dataFromDb: {
      default: 0
    }
  },
  data() {
    return {
      oldinputValue: "",
      inputValue: 0
    };
  },
  mounted() {
    this.inputValue = this.dataFromDb;
  },
  methods: {
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
  border-radius: 9px;
  box-shadow: 0 1px rgba(255, 255, 255, 0.2) inset, 0 3px 5px rgba(0, 1, 6, 0.5),
    0 0 1px 1px rgba(0, 1, 6, 0.2);
}
.material-icons {
  font-size: 23px;
  user-select: none;
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
</style>