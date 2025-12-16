<template>
  <div>
    <div class="n-layout-page-header">
      <u-card :bordered="false" title="测试websocket">
        尝试在下方输入框中输入任意文字消息内容，发送后websocket服务器收到会原样返回
      </u-card>
    </div>
    <u-card :bordered="false" class="proCard">

        <u-form-field  style="width: 520px">
          <u-input
              @keyup.enter="sendMessage"
              :style="{ width: '78%' }"
              placeholder="请输入消息内容"
              :on-focus="onFocus"
              :on-blur="onBlur"
              v-model:value="inputMessage"
          />
          <u-button type="primary" @click="sendMessage"> 发送消息</u-button>
        </u-form-field >

        <div class="mt-5"></div>

<!--        <n-timeline :icon-size="20">
          <n-timeline-item color="grey" content="输入中.." v-if="isInput">
            <template #icon>
              <n-icon>
                <MessageOutlined />
              </n-icon>
            </template>
          </n-timeline-item>

          <n-timeline-item
              v-for="item in messages"
              :key="item"
              :type="item.type == Enum.SendType ? 'success' : 'info'"
              :title="item.type == Enum.SendType ? '发送消息' : '收到消息'"
              :content="item.content"
              :time="item.time"
          >
            <template #icon>
              <n-icon>
                <SendOutlined v-if="item.type == Enum.SendType" />
                <SoundOutlined v-if="item.type == Enum.ReceiveType" />
              </n-icon>
            </template>
          </n-timeline-item>
        </n-timeline>-->
    </u-card>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { addOnMessage, removeOnMessage, sendMsg } from '~/utils';
import type { WebSocketMessage } from '~/utils';
import { format } from 'date-fns';

interface Message {
  type: Enum;
  content: string;
  time: string;
}

const message = useToast()
const messages = ref<Message[]>([]);
const inputMessage = ref('你好，HotGo');
const isInput = ref(false);
const testMessageEvent = 'websocket/addons/phishing/sendFish';

enum Enum {
  SendType = 1, // 发送类型
  ReceiveType = 2, // 接受类型
}

function onFocus() {
  isInput.value = true;
}

function onBlur() {
  isInput.value = false;
}

function sendMessage() {
  if (inputMessage.value == '') {
    message.add('消息内容不能为空');
    return;
  }

  // 发送消息
  sendMsg(testMessageEvent, {
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

// 存入本地记录
function insertMessage(msg: Message): void {
  messages.value.unshift(msg); // 在头部插入消息
  if (messages.value.length > 10) {
    messages.value = messages.value.slice(0, 10); // 如果超过10个，则只保留最前面10个
  }
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

<style scoped></style>