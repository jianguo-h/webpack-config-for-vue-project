<template>
  <div id="app">
    {{ msg }}
    vite config for vue project
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  const App = defineComponent({
    data() {
      return {
        msg: 'hello world',
      };
    },
    mounted() {
      console.log(this.msg);
      // console.log('>>> this.$route', this.$route);
      // console.log('>>> this.$store', this.$store);
      // console.log('>>> this.$axios', this.$axios);
    },
  });

  export default App;
</script>

<style lang="less">
  #app {
    font-size: 30px;
  }
</style>
