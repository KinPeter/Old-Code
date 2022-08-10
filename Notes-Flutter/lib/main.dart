import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:notes/widgets/notes_init_helper.dart';

import 'notes_app.dart';

Future<void> main() async {
  await DotEnv().load('.env');
  WidgetsFlutterBinding.ensureInitialized();
  runApp(InitApp());
}

class InitApp extends StatelessWidget {
  // Create the initialization Future outside of `build`:
  final Future<FirebaseApp> _initialization = Firebase.initializeApp();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      // Initialize FlutterFire:
      future: _initialization,
      builder: (context, snapshot) {
        // Check for errors
        if (snapshot.hasError) {
          print('[-] Firebase initialization failed.');
          return NotesInitHelper('Firebase initialization failed.');
        }

        // Once complete, show your application
        if (snapshot.connectionState == ConnectionState.done) {
          print('[+] Firebase initialized!');
          return NotesApp();
        }

        // Otherwise, show something whilst waiting for initialization to complete
        return NotesInitHelper('Initializing...');
      },
    );
  }
}
