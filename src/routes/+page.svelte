<script lang="ts">
	import { scale, slide } from 'svelte/transition';
	import { Plus, Minus } from 'lucide-svelte';
	let expandedStates = $state<Record<string, boolean>>({
		about: false,
		release: false,
		contact: false
	});
</script>

{#snippet expandButton(label: string)}
	<button onclick={() => (expandedStates[label] = !expandedStates[label])}>
		{#if expandedStates[label]}
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

<main class="bg-background text-foreground h-full w-full px-8 opacity-80 md:w-xl">
	<!-- Artist Name -->
	<section class="">
		<h1 class="text-[4rem] uppercase md:text-[8rem]">xinl</h1>
	</section>
	<!-- About -->
	<section class="mb-4">
		<div class="flex items-center gap-2">
			{@render expandButton('about')}
			<h2 class="text-2xl uppercase">about</h2>
		</div>
		{#if expandedStates.about}
			<article transition:slide class="bg-middleground mt-2 h-[200px] w-full">
				<!-- 內容區塊 -->
			</article>
		{/if}
	</section>
	<!-- Release -->
	<section class="mb-4">
		<div class="flex items-center gap-2">
			{@render expandButton('release')}
			<h2 class="text-2xl uppercase">release</h2>
		</div>
		{#if expandedStates.release}
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
		{#if expandedStates.contact}
			<article transition:slide class="bg-middleground mt-2 h-[200px] w-full">
				<!-- 內容區塊 -->
			</article>
		{/if}
	</section>
</main>
