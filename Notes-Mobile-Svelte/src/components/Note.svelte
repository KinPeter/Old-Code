<script>
    import { fade } from 'svelte/transition';
    import * as store from '../store';

    export let note;
    export let isLoggedIn;

    let isConfirmingDeletion = false;

    const archive = () => {
        store.noteStore.archiveNote(note.id, note.archived);
    }

    const confirmDelete = () => {
        store.noteStore.deleteNote(note.id);
    }

    const cancelDelete = () => {
        isConfirmingDeletion = false;
    }

    const getAddedDate = (data) => {
        const d = new Date(data.seconds * 1000);
        const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        return `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()} ${d.getHours()}:${minutes}`;
    }

</script>

<div class="note-wrapper" transition:fade>
    <div class="note" class:archived={note.archived}>
        {#if note.text.length > 1}
            <p class="note-text">{ note.text }</p>
        {/if}
        {#if note.links}
            <ul class="note-links">
                {#each note.links as link}
                    <li>
                        <a href="{ link.url }" target="_blank">
                            { link.name }
                        </a>
                    </li>
                {/each}
            </ul>
        {/if}  

        <footer>
            <span class="note-added">{ getAddedDate(note.added) }</span>
            <span class="note-buttons">
                {#if isLoggedIn}
                    <i 
                        on:click={archive}
                        class="icon icon-archive"
                        >
                    </i>
                    <i 
                        class="icon icon-trash"
                        on:click={() => {isConfirmingDeletion = true}}
                        >
                    </i>
                {/if}
            </span>
        </footer>
        {#if isConfirmingDeletion}
            <section class="delete-confirm-wrapper">
                <div 
                    class="confirm-delete"
                    on:click={confirmDelete}>
                    <i class="icon icon-trash"></i>
                </div>
                <div 
                    class="cancel-delete"
                    on:click={cancelDelete}>
                    <i class="icon icon-times"></i>
                </div>
            </section>
        {/if}
    </div>
</div>