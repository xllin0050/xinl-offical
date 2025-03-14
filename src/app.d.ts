// 添加 Cloudflare 类型导入
import type { DurableObjectNamespace, CacheStorage, Cache } from '@cloudflare/workers-types';

declare global {
  namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// 移除 PageState 中的 Cloudflare 相关定义
	interface PageState {}
	// 添加 Platform 接口定义
	interface Platform {
	  env: {
		COUNTER: DurableObjectNamespace;
	  };
	  context: {
		waitUntil(promise: Promise<any>): void;
	  };
	  caches: CacheStorage & { default: Cache }
	}
  }
}

export {};
