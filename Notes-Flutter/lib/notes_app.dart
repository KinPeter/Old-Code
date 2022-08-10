import 'package:flutter/material.dart';
import 'package:notes/material_theme.dart';
import 'package:notes/providers/auth.dart';
import 'package:notes/providers/connection.dart';
import 'package:notes/providers/notes.dart';
import 'package:notes/providers/snackbar.dart';
import 'package:notes/screens/edit_note.dart';
import 'package:notes/screens/login.dart';
import 'package:notes/screens/notes_main.dart';
import 'package:provider/provider.dart';

class NotesApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (ctx) => Connection()),
        ChangeNotifierProvider(create: (ctx) => Auth()),
        ChangeNotifierProvider(create: (ctx) => Notes()),
        ChangeNotifierProvider(create: (ctx) => SnackBars()),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Notes',
        theme: notesTheme,
        home: NotesMainScreen(),
        routes: {
          LoginScreen.routeName: (ctx) => LoginScreen(),
          NotesMainScreen.routeName: (ctx) => NotesMainScreen(),
          EditNoteScreen.routeName: (ctx) => EditNoteScreen(),
        },
      ),
    );
  }
}
