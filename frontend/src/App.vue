<template>
  <div id="app">
    <div class="navigator">
      <img src="./assets/logo.png" />
      <router-link tag="span" to="/" exact active-class="active">User</router-link>
      <router-link tag="span" to="/admin" exact active-class="active">Admin</router-link>
      <router-link tag="span" to="/something" exact active-class="active">Something</router-link>
      <!-- <router-link tag="span" to="/checkForm" exact active-class="active">CheckForm</router-link> -->
    </div>
    <transition name="component-fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import Admin from "./components/Admin";
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
      sessionStorage.setItem('name',"");
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 90vh;
  align-items: center;
  border: 2px solid gray;
  overflow: hidden;
  background-color: beige;
}
.navigator {
  display: flex;
  background: #4e4f54;
  width: 100%;
  align-items: flex-end;
}
.active {
  color: wheat;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
.navigator img {
  margin-right: auto;
}
.view{
  margin: 20px 0px;
}
span{
  font-size: 24px;
  margin: 0 20px 20px 0;
  color: whitesmoke;
}

</style>
