<script>
    import { fade } from 'svelte/transition';
    import * as store from '../store';
    import Note from './Note.svelte';

    export let isLoggedIn;
    let scrolled = false;
    let element;

    store.noteStore.fetchNotes();
    let notes;
    store.noteStore.subscribe((notesArray) => {
        notes = notesArray;
    });

    const ifScrolled = () => {
        if (element.scrollTop > 0) {
            scrolled = true;
        } else {
            scrolled = false;
        }
    }

</script>

<section class="notes" bind:this={element} on:scroll={ifScrolled}>
    {#if scrolled}
        <div class="top-gradient" in:fade={{duration: 100}} out:fade={{duration: 40}}></div>
    {/if}
    {#each notes as note (note.added)}
        <Note {note} {isLoggedIn} />
    {/each}
    <div class="note-placeholder"></div>
    <div class="bottom-gradient"></div>
</section>