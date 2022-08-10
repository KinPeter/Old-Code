import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class Auth with ChangeNotifier {
  bool _isAuth;

  get isAuth {
    return _isAuth;
  }

  Auth() {
    _isAuth = FirebaseAuth.instance.currentUser != null;
  }

  Future<void> logIn(String email, String password) async {
    try {
      UserCredential userCredential = await FirebaseAuth.instance
          .signInWithEmailAndPassword(email: email, password: password);
      print('Logged in: ' + userCredential.toString());
      _isAuth = true;
      notifyListeners();
    } on FirebaseAuthException catch (e) {
      if (e.code == 'user-not-found') {
        print('No user found for that email.');
      } else if (e.code == 'wrong-password') {
        print('Wrong password provided for that user.');
      }
      rethrow;
    } catch (e) {
      rethrow;
    }
  }

  Future<void> logOut() async {
    await FirebaseAuth.instance.signOut();
    _isAuth = false;
    notifyListeners();
  }
}
