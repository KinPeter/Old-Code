import App from './App.svelte';
import { games } from "./games";

const app = new App({
	target: document.body,
	props: {
		games: games
	}
});

export default app;
