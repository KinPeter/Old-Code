<script>
    import { fade, fly } from 'svelte/transition';
    import Notes from './components/Notes.svelte';
    import AddNote from './components/AddNote.svelte';
    import Login from './components/Login.svelte';    
    import Spinner from './components/Spinner.svelte';    
    import * as store from './store';

    let addingNote = false;
    let loggingIn = false;

    // loading status
    let loading;
    store.isLoading.subscribe((value) => {
        loading = value;
    });

    // auth status
    let isLoggedIn = false;
    store.auth.subscribe((value) => {
        isLoggedIn = value;
    });

    // controllers
    const login = () => {
        loggingIn = true;
    };
    const logout = () => {
        store.auth.logOut();
    };

</script>

<header>
    <h1>Notes</h1>
    <div>
        {#if isLoggedIn}
            <div 
                in:fade={{delay: 400}}
                out:fade
                on:click={logout}>
                <i class="icon icon-logout"></i>
            </div>
        {:else}
            <div 
                in:fade={{delay: 400}}
                out:fade
                on:click={login}>
                <i class="icon icon-login"></i>
            </div>
        {/if}
    </div>
</header>

{#if loading}
    <Spinner />
{/if}

<Notes {isLoggedIn} />

{#if loggingIn}
    <Login on:close={() => {loggingIn = false}} />
{/if}

{#if addingNote}
    <AddNote on:close={() => {addingNote = false}} />
{/if}

<footer>
    {#if isLoggedIn && !addingNote}
        <div class="open-add-note" on:click={() => {addingNote = true}} transition:fly={{y: 100}}>
            <i class="icon icon-plus"></i>
        </div>
    {/if}
</footer>

