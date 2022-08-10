import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:notes/models/note.dart';
import 'package:notes/providers/auth.dart';
import 'package:notes/providers/connection.dart';
import 'package:notes/providers/notes.dart';
import 'package:notes/screens/edit_note.dart';
import 'package:notes/widgets/link_button.dart';
import 'package:provider/provider.dart';

class NoteCard extends StatelessWidget {
  final Note note;

  NoteCard(this.note);

  @override
  Widget build(BuildContext context) {
    final notes = Provider.of<Notes>(context);
    final auth = Provider.of<Auth>(context);
    final connection = Provider.of<Connection>(context);

    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(vertical: 4.0),
      child: Card(
        elevation: 4,
        child: Container(
          padding: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: note.archived ? Colors.grey.shade300 : Colors.white,
            borderRadius: BorderRadius.all(Radius.circular(4)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (note.text.length > 1)
                Text(
                  note.text,
                  style: TextStyle(
                      fontSize: 16.0,
                      fontWeight: FontWeight.w500,
                      color:
                          note.archived ? Colors.grey.shade400 : Colors.black),
                ),
              if (note.text.length > 1)
                const SizedBox(
                  height: 8.0,
                ),
              if (note.links != null && note.links.length > 0)
                ...note.links.map((e) => LinkButton(e, note.archived)).toList(),
              if (note.links != null && note.links.length > 0)
                const SizedBox(
                  height: 8.0,
                ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    DateFormat('yyyy.MM.dd HH:mm').format(note.added),
                    style: TextStyle(
                        color: note.archived
                            ? Colors.grey.shade400
                            : Colors.grey.shade600),
                  ),
                  if (auth.isAuth && connection.isConnected)
                    InkWell(
                        child: Icon(
                          Icons.edit,
                          color: note.archived
                              ? Colors.grey.shade400
                              : Theme.of(context).primaryColor,
                        ),
                        onTap: () {
                          Navigator.of(context).pushNamed(
                              EditNoteScreen.routeName,
                              arguments: note.id);
                        }),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
