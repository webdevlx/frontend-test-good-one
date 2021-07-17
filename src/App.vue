<template>
  <div id="app">
    <NavBar />

    <div class="container-fluid">
      <div class="row" style="height: 100vh">
        <div class="col-lg-9 bg-light border-end">
          <router-view></router-view>
        </div>

        <div class="col-lg-3 bg-light border-start">
          <Basket />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Basket from "./components/Basket";
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    Basket,
    NavBar,
  },
};
</script>

<style scoped>
* {
  font-family: "Fira Sans";
}
</style>
