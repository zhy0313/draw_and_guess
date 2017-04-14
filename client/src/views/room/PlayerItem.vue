<template>
<div class="player-item">
  <div class="head">
    <div class="user"></div>
    <div class="score" v-if="user.score >= 0">{{user.score}}分</div>
  </div>
  <div class="username">{{user.username}}</div>
</div>
</template>
<script>
export default {
  props: ['user']
}
</script>

<style lang="less">
@import "~assets/less/base.less";
.player-item{
  @size: 40px;
  width: 33%;
  .head{
    padding-top: 30px;
  }
  .user{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 6px solid #fff;
    margin: auto;
    background-image: url(../../assets/usertest.jpg);
    -webkit-background-size: cover;
      background-size: cover; 
    color: #000;
    line-height: 3rem;
    text-align: center;    
  }
  .username{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    text-align: center;
    color: #000;
    font-size: .8em;
  }
  .score{
    text-align: center;
  }
  &.empty-item{
    .user {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 6px solid #fff;
      margin: auto;
      background-image: url(../../assets/empty.png);
      background-size: cover; 
      color: #000;
      line-height: 3rem;
      text-align: center;    
    }    
  }


}
</style>
