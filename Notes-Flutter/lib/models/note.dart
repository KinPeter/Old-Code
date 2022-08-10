import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:notes/models/link.dart';

class Note {
  String id;
  DateTime added; // convert: Timestamp.fromDate(DateTime date)
  bool archived;
  List<Link> links;
  String text;

  Note.fromDocumentSnapshot(DocumentSnapshot doc) {
    Map<String, dynamic> data = doc.data();

    id = doc.id;
    added = (data['added'] as Timestamp).toDate();
    archived = data['archived'];
    text = data['text'];
    links = data['links'] != null
        ? (data['links'] as List<dynamic>).map((e) {
            return Link(e['name'], e['url']);
          }).toList()
        : null;
  }

  Note.fromJSON(String jsonStr) {
    Map<String, dynamic> data = json.decode(jsonStr);

    id = data['id'];
    added = DateTime.parse(data['added']);
    archived = data['archived'];
    text = data['text'];
    links = data['links'] != null
        ? (data['links'] as List<dynamic>).map((e) => Link.fromJSON(e)).toList()
        : null;
  }

  Note.getInitial() {
    text = '';
    links = [];
    archived = false;
  }

  Note.clone(Note note) {
    id = note.id;
    added = DateTime.parse(note.added.toIso8601String());
    archived = note.archived;
    text = note.text;
    links = note.links == null
        ? null
        : note.links.map((e) => Link(e.name, e.url)).toList();
  }

  String toJSON() {
    return json.encode({
      'id': id,
      'added': added.toString(),
      'archived': archived,
      'text': text,
      'links': links == null ? null : links.map((e) => e.toJSON()).toList(),
    });
  }

  Map<String, dynamic> toMap() {
    return {
      'added': Timestamp.fromDate(DateTime.now()),
      'archived': archived,
      'text': text,
      'links': links != null
          ? links.map((l) => {'name': l.name, 'url': l.url}).toList()
          : null
    };
  }
}
