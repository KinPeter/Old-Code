<script>
	import GameItem from "./GameItem.svelte";
	export let games;
</script>

<main>
	<h1>Games</h1>
	<p>Visit <a href="https://www.p-kin.com">P-Kin.com</a> to learn more about them.</p>
	<div class="game-list">
		{#each games as game}
			<GameItem game={game} />
		{/each}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 0;
		margin: 0 auto;
	}

	@media (min-width: 750px) {
		main {
			padding: 1rem;
		}
	}

	.game-list {
		margin-top: 4rem;
	}

	h1 {
		color: var(--primary-color);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>
