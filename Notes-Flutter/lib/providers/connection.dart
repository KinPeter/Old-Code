import 'package:flutter/material.dart';
import 'package:notes/util/utils.dart';

class Connection with ChangeNotifier {
  bool _isConnected = false;

  bool get isConnected {
    return _isConnected;
  }

  Connection() {
    hasConnection().then((value) {
      _isConnected = value;
      notifyListeners();
    });
  }

  Future<void> checkConnection() async {
    _isConnected = await hasConnection();
    notifyListeners();
  }
}
