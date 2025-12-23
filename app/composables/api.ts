// composables/useBank.ts
export const checkBinApi = () => {
    const checkBin = async (bin: string) => {
        // 构造请求体
        const formData = new URLSearchParams();
        formData.append('action', 'bin_checker');
        formData.append('nonce', '72b1ab0da1'); // 注意：这个 nonce 可能会过期，通常需要从页面获取
        formData.append('bin', bin);

        try {
            // Nuxt 中直接使用 $fetch，无需 import
            const data = await $fetch('https://blog.chainfo.io/wp-admin/admin-ajax.php', {
                method: 'POST',
                body: formData,
                // 这里不传 headers，符合你的要求
            });
            return data;
        } catch (error) {
            console.error('BIN 查询失败:', error);
            throw error;
        }
    };

    return {
        checkBin
    };
};