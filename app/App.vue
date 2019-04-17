<template>
  <div id="app">
    hello world!
    webpack config for vue project
  </div>
</template>

<script lang='ts'>
  import { Vue, Component, Prop } from "vue-property-decorator";

  @Component
  export default class App extends Vue {
    
  }
</script>

<style lang="less">
  #app {
    font-size: 30px;
  }
</style>