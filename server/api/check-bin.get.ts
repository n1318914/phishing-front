export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const binValue = query.bin as string;

    const url = 'https://bin-ip-checker.p.rapidapi.com?bin=' + binValue;

    // 在服务器端发起请求，绕过浏览器跨域限制
    return await $fetch(url, {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'e9dbe13c3emsh9a0afae6f0cfe77p154c1ajsn1483502044e5',
            'x-rapidapi-host': 'bin-ip-checker.p.rapidapi.com'
        }
    });
});