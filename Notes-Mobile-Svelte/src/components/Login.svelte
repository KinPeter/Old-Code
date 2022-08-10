<script>
    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import * as store from '../store';

    const dispatch = createEventDispatcher();

    let email;
    let password;

    const storedData = localStorage.getItem('mobileNotesData');
    if (storedData) {
        const data = JSON.parse(storedData);
        email = data.email;
        password = data.phrase;
    }

    const submit = () => {
        store.auth.logIn(email, password);
        dispatch('close');
        if (!storedData) {
            const toStore = JSON.stringify({email: email, phrase: password});
            localStorage.setItem('mobileNotesData', toStore);
        }
    }

</script>

<div class="login-modal" >
    <div class="overlay" transition:fade on:click={() => {dispatch('close')}}></div>
    <div class="modal-body" transition:fly={{y: -300}}>
        <form on:submit|preventDefault={submit}>
            <label for="email">Email</label>
            <input 
                type="email" 
                id="email"  
                bind:value={email} 
                autofocus >
            <label for="password">Password</label>
            <input 
                type="password" 
                id="password"  
                bind:value={password} >
            <button 
                type="submit" 
                disabled={ !email || !password }>
                Log in
            </button>
        </form>
    </div>
</div>