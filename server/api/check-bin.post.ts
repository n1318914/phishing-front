export default defineEventHandler(async (event) => {
    const { bin } = await readBody(event);

    // 在服务器端发起请求，绕过浏览器跨域限制
    return await $fetch('https://blog.chainfo.io/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: new URLSearchParams({
            action: 'bin_checker',
            nonce: '72b1ab0da1', // 隐藏敏感参数
            bin
        }),
    });
});