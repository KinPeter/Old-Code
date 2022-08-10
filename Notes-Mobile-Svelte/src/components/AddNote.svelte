<script>
    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import * as store from '../store';

    const dispatch = createEventDispatcher();

    let text;

    const submit = () => {
        store.noteStore.addNote(text);
        dispatch('close');
    }

</script>

<div class="add-note-modal">
    <div class="overlay" transition:fade on:click={() => {dispatch('close')}}></div>
    <div class="add-note" transition:fly={{y: -300}}>        
        <form on:submit|preventDefault={submit}>
            <textarea 
                id="text" 
                placeholder="Text" 
                bind:value={text} 
                rows="4"
                autofocus />
            
            <footer>
                <button 
                    class="save-btn"
                    type="submit" 
                    disabled={!text}>
                    Save
                </button>
            </footer>
        </form>
    </div>
</div>