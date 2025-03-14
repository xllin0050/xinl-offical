<script lang="ts">
	import { scale, slide } from 'svelte/transition';
	import { Plus, Minus, Mail } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { languageTag, availableLanguageTags } from '$lib/paraglide/runtime';
	import type { AvailableLanguageTag } from '$lib/paraglide/runtime';

	// 只允許一個 section 展開
	let expandedSection = $state<string | null>(null);

	let currentLanguage = $state<AvailableLanguageTag>(languageTag());

	// 使用瀏覽器系統語系作為預設值
	onMount(() => {
		// 使用瀏覽器系統語系作為預設值
		const browserLanguage = navigator.language.split('-')[0] as AvailableLanguageTag;

		// 檢查瀏覽器語系是否在我們支持的語言中
		if (availableLanguageTags.includes(browserLanguage) && browserLanguage !== languageTag()) {
			// 如果瀏覽器語系與當前語言不同，則進行重定向
			const canonicalPath = i18n.route(page.url.pathname);
			const localisedPath = i18n.resolveRoute(canonicalPath, browserLanguage);
			goto(localisedPath);
		}
	});

	// 切換語言的函數
	function switchToLanguage(newLanguage: AvailableLanguageTag): void {
		// 更新當前語言
		currentLanguage = newLanguage;

		// 通過 URL 切換語言
		const canonicalPath = i18n.route(page.url.pathname);
		const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
		goto(localisedPath);
	}

	// 切換展開狀態的函數
	function toggleSection(sectionName: string): void {
		if (expandedSection === sectionName) {
			// 如果點擊的是當前已展開的 section，則收起
			expandedSection = null;
		} else {
			// 否則展開點擊的 section，收起其他 section
			expandedSection = sectionName;
		}
	}

	// 社交媒體連結
	type SocialLink = {
		name: string;
		href: string;
		type: 'email' | 'x' | 'facebook';
	};

	const socialLinks: SocialLink[] = [
		{ name: 'Email', href: 'mailto:contact@xinl.com', type: 'email' },
		{ name: 'X', href: 'https://x.com/xinl', type: 'x' },
		{ name: 'Facebook', href: 'https://facebook.com/xinl', type: 'facebook' }
	];
</script>

{#snippet expandButton(label: string)}
	<button onclick={() => toggleSection(label)}>
		{#if expandedSection === label}
			<div in:scale class="h-5 w-5">
				<Minus />
			</div>
		{:else}
			<div in:scale class="h-5 w-5">
				<Plus />
			</div>
		{/if}
	</button>
{/snippet}

<main class="bg-background text-pearl-white h-full w-full px-8 opacity-80 md:w-xl">
	<!-- Artist Name -->
	<section class="mb-8">
		<div class="flex flex-col md:flex-row md:items-center md:justify-between">
			<div>
				<h1 class="text-[4rem] uppercase md:text-[8rem]">xinl</h1>
				<nav class="flex gap-2">
					<button
						class="border-foreground hover:bg-foreground hover:text-background border px-2 py-1 text-xs transition-colors"
						class:bg-foreground={currentLanguage === 'zh'}
						class:text-background={currentLanguage === 'zh'}
						onclick={() => switchToLanguage('zh')}
					>
						中文
					</button>
					<button
						class="border-foreground hover:bg-foreground hover:text-background border px-2 py-1 text-xs transition-colors"
						class:bg-foreground={currentLanguage === 'en'}
						class:text-background={currentLanguage === 'en'}
						onclick={() => switchToLanguage('en')}
					>
						English
					</button>
					<button
						class="border-foreground hover:bg-foreground hover:text-background border px-2 py-1 text-xs transition-colors"
						class:bg-foreground={currentLanguage === 'ja'}
						class:text-background={currentLanguage === 'ja'}
						onclick={() => switchToLanguage('ja')}
					>
						日本語
					</button>
				</nav>
			</div>
			<img src="/test.webp" alt="xinl" class="hidden h-40 w-auto object-contain md:block" />
		</div>
	</section>
	<!-- About -->
	<section class="mb-4">
		<div class="flex items-center gap-2">
			{@render expandButton('about')}
			<h2 class="text-2xl uppercase">about</h2>
		</div>
		{#if expandedSection === 'about'}
			<article transition:slide class=" mt-2 h-auto w-full p-4">
				<p class="text-cream-white text-base leading-relaxed">{m.about_content()}</p>
			</article>
		{/if}
	</section>
	<!-- Release -->
	<section class="mb-4">
		<div class="flex items-center gap-2">
			{@render expandButton('release')}
			<h2 class="text-2xl uppercase">release</h2>
		</div>
		{#if expandedSection === 'release'}
			<article transition:slide class="bg-middleground mt-2 h-[200px] w-full">
				<!-- 內容區塊 -->
			</article>
		{/if}
	</section>
	<!-- Contact -->
	<section class="mb-4">
		<div class="flex items-center gap-2">
			{@render expandButton('contact')}
			<h2 class="text-2xl uppercase">contact</h2>
		</div>
		{#if expandedSection === 'contact'}
			<article transition:slide class="mt-2 h-auto w-full p-4">
				<div class="flex gap-6">
					{#each socialLinks as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="text-cream-white transition-opacity hover:opacity-70"
							aria-label={link.name}
						>
							{#if link.type === 'email'}
								<div class="h-6 w-6">
									<Mail />
								</div>
							{:else if link.type === 'x'}
								<img src="/x.svg" alt="X" class="filter-cream-white h-6 w-6" />
							{:else if link.type === 'facebook'}
								<img src="/facebook.svg" alt="Facebook" class="filter-cream-white h-6 w-6" />
							{/if}
						</a>
					{/each}
				</div>
			</article>
		{/if}
	</section>

</main>

<style>
	/* 為 SVG 圖像添加濾鏡，使其顯示為 cream-white 顏色 */
	.filter-cream-white {
		filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
	}
</style>
