
/**
 * @description: 获取父窗口的 DOM 数据
 */
export async function getParentOne(selector, attributes = ['innerHTML']) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = (event) => {
      channel.port1.close();
      if (event.data.success) {
        console.log("获取返回：",event.data.data)
        resolve(event.data.data); // 直接返回数据对象
      } else {
        reject(event.data.error);
      }
    };

    window.top.postMessage({
      type: 'GET_SINGLE_DOM',
      selector,
      attributes
    }, 'https://www.chemicalguys.top', [channel.port2]);

    setTimeout(() => {
      channel.port1.close();
      reject('Timeout');
    }, 2000);
  });
}