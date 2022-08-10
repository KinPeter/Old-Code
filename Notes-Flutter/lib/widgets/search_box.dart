import 'package:flutter/material.dart';
import 'package:notes/providers/notes.dart';
import 'package:provider/provider.dart';

class SearchBox extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final notes = Provider.of<Notes>(context, listen: false);

    return TextFormField(
      decoration: InputDecoration(
        filled: true,
        fillColor: Colors.blue.shade800,
        border: InputBorder.none,
        isDense: true,
      ),
      style: TextStyle(
        color: Colors.white,
      ),
      // controller: controller,
      textInputAction: TextInputAction.search,
      onChanged: (value) {
        if (value.length >= 3) {
          notes.searchNotes(value);
        } else {
          notes.resetFiltered();
        }
      },
      onFieldSubmitted: (value) {
        notes.searchNotes(value);
      },
    );
  }
}
