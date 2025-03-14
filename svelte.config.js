import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
	adapter: adapter({
	  // 保留 Node.js 兼容性模式
      nodejs_compat: true,
      // 添加路由配置，优化静态资源处理
      routes: {
        include: ['/*'],
        exclude: ['<all>'] // 使用默认排除所有静态资源
      }
	})
	}
};

export default config;
