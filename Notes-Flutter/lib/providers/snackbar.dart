import 'dart:async';

import 'package:flutter/material.dart';

class SnackBars with ChangeNotifier {
  bool _showAdded = false;
  bool _showUpdated = false;

  bool get showAdded {
    return _showAdded;
  }

  bool get showUpdated {
    return _showUpdated;
  }

  void triggerAdded() {
    _showAdded = true;
    notifyListeners();
    Timer(Duration(seconds: 3), () {
      _showAdded = false;
      notifyListeners();
    });
  }

  void triggerUpdated() {
    _showUpdated = true;
    notifyListeners();
    Timer(Duration(seconds: 3), () {
      _showUpdated = false;
      notifyListeners();
    });
  }
}
