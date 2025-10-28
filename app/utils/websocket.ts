import { SocketEnum } from '~/utils/enums/socketEnum';
import { addOnMessage } from '~/utils/index';
import type { WebSocketMessage } from '~/utils/index';

// 注册全局消息监听
export function registerGlobalMessage() {
    // 心跳
    addOnMessage(SocketEnum.EventPing, function (_message: WebSocketMessage) {
        // console.log('ping..');
    });

    // 强制退出
    addOnMessage(SocketEnum.EventKick, function (_message: WebSocketMessage) {

    });

    // 消息通知
    addOnMessage(SocketEnum.EventNotice, function (message: WebSocketMessage) {

    });

    // 更多全局消息处理都可以在这里注册
    // ...
}
