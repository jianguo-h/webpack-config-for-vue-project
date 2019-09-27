<template>
  <div id="app">
    {{ msg }}
    webpack config for vue project
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  msg: string = 'hello world';

  mounted() {
    // console.log('>>> this.$route', this.$route);
    // console.log('>>> this.$store', this.$store);
    // console.log('>>> this.$axios', this.$axios);
  }
}
</script>

<style lang="less">
#app {
  font-size: 30px;
}
</style>
