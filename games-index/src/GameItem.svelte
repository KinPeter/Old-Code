<script>
  import { Platform } from "./games";

  export let game;

  const isBrowserGame = (game) => {
    return game.platform === Platform.BROWSER
  }
</script>

<article>
  <img src={game.thumbnail} alt="{game.name}">
  <div class="details">
    <h1>{game.name}</h1>
    <p>
      <b>Type:</b> {game.type}
    </p>
    {#if isBrowserGame(game)}
      <p>
        <a href={game.link} target="_blank">
          Play now in your browser!
        </a>
        <small>(Size: {game.size})</small>
      </p>
    {:else}
      <p>
        <a href={game.link} target="_blank">
          Download for Windows and play!
        </a>
        <small>(Size: {game.size})</small>
      </p>
    {/if}
    {#if 'linuxLink' in game}
      <p>
        <a href={game.linuxLink} target="_blank">
          Download for Linux and play!
        </a>
        <small>(Size: {game.linuxSize})</small>
      </p>
    {/if}
  </div>
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    margin: 0 0 2rem;
    padding: 1rem;
    max-width: 700px;
    text-align: left;
  }

  .details {
    padding: .5rem;
  }

  img {
    border: 3px solid var(--background-color-secondary);
    max-width: 320px;
  }

  h1 {
    font-weight: lighter;
    font-size: 2.5rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--background-color-secondary);
    margin-top: 0;
  }

  @media (min-width: 750px) {
    article {
      flex-direction: row;
      align-items: center;
      margin: 0 auto 4rem;
      padding: 2rem;
      border-left: 1px solid var(--primary-color);
    }

    .details {
      padding: 2rem;
    }
  }


</style>
