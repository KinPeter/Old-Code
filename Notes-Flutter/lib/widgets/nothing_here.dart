import 'package:flutter/material.dart';

class NothingHere extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.sentiment_dissatisfied_outlined,
            color: Colors.grey.shade600,
            size: 32,
          ),
          const SizedBox(
            height: 12,
          ),
          Text(
            'Nothing here...',
            style: TextStyle(color: Colors.grey.shade600),
          )
        ],
      ),
    );
  }
}
