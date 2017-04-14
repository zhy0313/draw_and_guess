<template>
<div class="chat-input">
  <form action="" @submit.prevent="sendMsg">
    <div class="input-group">
      <input type="text" placeholder="请输入要发送的消息" v-model="msg">
      <button class="mint-button mint-button--primary mint-button--normal btn" type="submit">发送</button>
    </div>
  </form>
  <div class="msg-list" v-if="showList">
    <p v-for="m in msgList" :class="m.type">{{m.msg}}</p>
  </div>
</div>
</template>

<script>
export default {
  props: ['showList'],
  data () {
    return {
      msg: '',
      msgList: [],
      socketEvents: {
        receiveMsg (data) {
          this.$emit('receive', data)
          this.msgList.unshift(data)
          this.msgList.splice(8, this.msgList.length)
        }
      }
    }
  },
  methods: {
    send (msg) {
      this.$webSocket.send(msg, 'chatMsg')
    },
    sendMsg () {
      if (this.msg) {
        this.send(this.msg)
        this.msg = ''
      }
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/base.less";
.chat-input {
  overflow: hidden;
}
.input-group{
  @children-height: 40px;
  display: flex;
  align-items: center;
  background: @white;
  border-bottom: 1px solid rgb(99,237,232);
  border-top: 1px solid rgb(99,237,232);
  input{
    flex: 1;
    border: 0;
    margin: 0;
    height: @children-height;
    padding: 0px 15px;
    font-size: 1.1em;
  }
  input:focus {
    border: 1px solid rgb(99,237,232);
  }
  button{
    border-radius: 0;
    height: @children-height;
  }
}
.btn {
  background-color: rgb(99,237,232);
  color: #000;
}
.chat-input{
  display: flex;
  flex-direction: column;
}
.msg-list{
  background: @white;
  p{
    margin: .6em .8em;
    word-wrap:wrap;
    word-break: break-all;
  }
}
</style>
