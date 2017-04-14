<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  // 解决iPhone端双击会放大的问题，利用fastclick库
  created () {
    if (this.isIPhone()) {
      require.ensure([], r => {
        let fastclick = require('fastclick')
        fastclick.attach(document.body)
      }, 'fastclick')
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/golbal.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
