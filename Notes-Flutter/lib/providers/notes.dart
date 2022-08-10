import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:notes/models/note.dart';
import 'package:notes/util/utils.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Notes with ChangeNotifier {
  static const storageKey = 'pk-notes';

  CollectionReference _fs = FirebaseFirestore.instance.collection('notes');

  List<Note> _notes;
  List<Note> _filteredNotes;

  List<Note> get notes {
    return _filteredNotes.isEmpty ? null : [..._filteredNotes];
  }

  Future<void> initNotes() async {
    if (await hasConnection()) {
      await _fetchNotes();
    } else {
      await _loadLocalNotes();
    }
  }

  void searchNotes(String value) {
    _filteredNotes = _notes.where((note) {
      if (note.text.toLowerCase().contains(value.toLowerCase())) {
        return true;
      } else if (note.links != null &&
          note.links.any((link) =>
              link.name.toLowerCase().contains(value.toLowerCase()))) {
        return true;
      }
      return false;
    }).toList();
    notifyListeners();
  }

  void resetFiltered() {
    _filteredNotes = [..._notes];
    notifyListeners();
  }

  Future<void> addNote(Note note) async {
    try {
      await _fs.add(note.toMap());
      await _fetchNotes();
    } catch (e, s) {
      print(e);
      print(s);
      rethrow;
    }
  }

  Future<void> archiveNote(String id) async {
    Note note = _notes.firstWhere((note) => note.id == id);
    if (note == null) throw Exception('Note not found!');
    note.archived = !note.archived;
    await updateNote(note);
  }

  Future<void> updateNote(Note note) async {
    try {
      await _fs.doc(note.id).update(note.toMap());
      await _fetchNotes();
    } catch (e, s) {
      print(e);
      print(s);
      rethrow;
    }
  }

  Future<void> deleteNote(String id) async {
    try {
      await _fs.doc(id).delete();
      await _fetchNotes();
    } catch (e, s) {
      print(e);
      print(s);
      rethrow;
    }
  }

  Future<void> _fetchNotes() async {
    try {
      QuerySnapshot querySnapshot = await _fs.get();
      List<Note> fetchedNotes = querySnapshot.docs
          .map((doc) => Note.fromDocumentSnapshot(doc))
          .toList();
      _notes = _reorderNotes(fetchedNotes);
      _filteredNotes = [..._notes];
      await _storeNotesLocally();
      print('[+] Notes fetched from Firebase, stored locally.');
      notifyListeners();
    } catch (e, s) {
      print(e);
      print(s);
      rethrow;
    }
  }

  Future<void> _storeNotesLocally() async {
    final prefs = await SharedPreferences.getInstance();
    final serialized = json.encode(_notes.map((e) => e.toJSON()).toList());
    prefs.setString(storageKey, serialized);
  }

  Future<void> _loadLocalNotes() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey(storageKey)) return;
    final jsonList = json.decode(prefs.getString(storageKey)) as List<dynamic>;
    _notes = jsonList.map((e) => Note.fromJSON(e)).toList();
    _filteredNotes = [..._notes];
    print('[+] No internet connection, notes fetched from device storage.');
    notifyListeners();
  }

  List<Note> _reorderNotes(List<Note> raw) {
    List<Note> archived = [];
    List<Note> active = [];
    raw.forEach((n) => n.archived ? archived.add(n) : active.add(n));
    archived.sort((a, b) => -a.added.compareTo(b.added));
    active.sort((a, b) => -a.added.compareTo(b.added));
    return [...active, ...archived];
  }
}
