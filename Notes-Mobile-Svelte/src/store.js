import { writable } from 'svelte/store';
import * as firebaseModule from 'firebase/app';
import { firebaseConfig } from './firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebase = firebaseModule.__moduleExports;
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const notes = writable([]);
const user = writable(false);
const loading = writable(false);

export const isLoading = {
    subscribe: loading.subscribe,
    loading: () => {
        loading.set(true);
    },
    finished: () => {
        loading.set(false);
    }
}

export const auth = {
    subscribe: user.subscribe,
    logIn: (email, password) => {
        isLoading.loading();
        firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
            user.set(true);
        }).catch((error) => {
            console.log(error);
            user.set(false);
        }).finally(() => {
            isLoading.finished();
        });
    },
    logOut: () => {
        isLoading.loading();
        firebase.auth().signOut().then(() => {
            user.set(false);
        }).catch((error) => {
            console.log(error);
            user.set(false);
        }).finally(() => {
            isLoading.finished();
        });
    }

};

export const noteStore = {
    subscribe: notes.subscribe,
    fetchNotes: () => {
        isLoading.loading();
        db.collection('notes').orderBy('added', 'desc').get().then((res) => {
            const notesArray = distributeAndSortNotes(res);
            notes.set(notesArray);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            isLoading.finished();
        });
    },
    addNote: (text) => {
        isLoading.loading();
        db.collection('notes').add({
            text: text,
            added: new Date(),
            archived: false,
            links: null
        }).then((res) => {
            noteStore.fetchNotes();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            isLoading.finished();
        });
    },
    archiveNote: (id, archived) => {
        isLoading.loading();
        db.collection('notes').doc(id).update({
            archived: !archived
        }).then((res) => {
            noteStore.fetchNotes();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            isLoading.finished();
        });
    },
    deleteNote: (id) => {
        isLoading.loading();
        db.collection('notes').doc(id).delete()
        .then((res) => {
            noteStore.fetchNotes();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            isLoading.finished();
        });
    }
};

const distributeAndSortNotes = (data) => {
    const active = [];
    const archived = [];
    data.docs.forEach((doc) => {
        const obj = doc.data();
        const note = {
            id: doc.id,
            text: obj.text,
            added: obj.added,
            archived: obj.archived,
            links: obj.links ? [...obj.links] : null
        };
        if (obj.archived) { archived.push(note); } else { active.push(note); }
    });
    return active.concat(archived);
}
