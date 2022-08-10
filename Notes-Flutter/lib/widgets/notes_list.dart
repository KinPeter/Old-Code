import 'dart:async';

import 'package:flutter/material.dart';
import 'package:notes/providers/connection.dart';
import 'package:notes/providers/notes.dart';
import 'package:notes/widgets/note_card_wrapper.dart';
import 'package:notes/widgets/nothing_here.dart';
import 'package:provider/provider.dart';
import 'package:notes/providers/snackbar.dart';
import 'package:notes/util/snackbar.dart';

class NotesList extends StatelessWidget {
  Future<void> _refreshNotes(BuildContext context) async {
    await Provider.of<Notes>(context, listen: false).initNotes();
    await Provider.of<Connection>(context, listen: false).checkConnection();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<Notes>(context);
    final snackBars = Provider.of<SnackBars>(context);

    if (snackBars.showAdded) {
      Timer(Duration.zero, () => showSimpleSnackBar(context, 'Note added.'));
    }
    if (snackBars.showUpdated) {
      Timer(Duration.zero, () => showSimpleSnackBar(context, 'Note updated.'));
    }

    return RefreshIndicator(
      onRefresh: () => _refreshNotes(context),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: provider.notes != null && provider.notes.length > 0
            ? ListView.builder(
                itemCount: provider.notes.length,
                itemBuilder: (ctx, i) => NoteCardWrapper(provider.notes[i]),
              )
            : NothingHere(),
      ),
    );
  }
}
