import 'package:flutter/material.dart';
import 'package:notes/material_theme.dart';

class NotesInitHelper extends StatelessWidget {
  final String message;

  NotesInitHelper(this.message);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: notesTheme,
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Notes'),
        ),
        body: Center(
          child: Text(message),
        ),
      ),
    );
  }
}
