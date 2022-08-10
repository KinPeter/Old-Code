import 'package:flutter/material.dart';
import 'package:notes/providers/auth.dart';
import 'package:notes/providers/connection.dart';
import 'package:notes/providers/notes.dart';
import 'package:notes/screens/edit_note.dart';
import 'package:notes/widgets/app_drawer.dart';
import 'package:notes/widgets/error_dialog.dart';
import 'package:notes/widgets/notes_list.dart';
import 'package:notes/widgets/search_box.dart';
import 'package:provider/provider.dart';

class NotesMainScreen extends StatefulWidget {
  static const routeName = '/notes';

  @override
  _NotesMainScreenState createState() => _NotesMainScreenState();
}

class _NotesMainScreenState extends State<NotesMainScreen> {
  bool _isLoading = true;
  bool _isSearching = false;

  void _setLoading(bool value) {
    setState(() {
      _isLoading = value;
    });
  }

  void _onError(e) {
    showDialog(
      context: context,
      builder: (ctx) => ErrorDialog(ctx, 'Could not load your notes.'),
    );
  }

  @override
  void initState() {
    _setLoading(true);
    Provider.of<Notes>(context, listen: false)
        .initNotes()
        .then((_) {})
        .catchError(_onError)
        .whenComplete(() => _setLoading(false));
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final notes = Provider.of<Notes>(context);
    final connection = Provider.of<Connection>(context);
    final auth = Provider.of<Auth>(context);

    return Scaffold(
        backgroundColor: Theme.of(context).backgroundColor,
        appBar: AppBar(
          title: _isSearching ? SearchBox() : Text('Notes'),
          actions: [
            IconButton(
                icon: Icon(_isSearching ? Icons.close : Icons.search),
                onPressed: () {
                  if (_isSearching) {
                    notes.resetFiltered();
                  }
                  setState(() {
                    _isSearching = !_isSearching;
                  });
                }),
            if (!connection.isConnected)
              IconButton(
                icon: Icon(Icons.wifi_off),
                onPressed: () {},
              ),
            if (connection.isConnected && auth.isAuth)
              IconButton(
                  icon: Icon(Icons.add),
                  onPressed: () {
                    Navigator.of(context).pushNamed(EditNoteScreen.routeName);
                  }),
          ],
        ),
        body: _isLoading
            ? Center(child: CircularProgressIndicator())
            : NotesList(),
        drawer: AppDrawer(),
        floatingActionButton:
            !auth.isAuth || _isLoading || !connection.isConnected
                ? Container()
                : FloatingActionButton(
                    child: Icon(Icons.add),
                    onPressed: () {
                      Navigator.of(context).pushNamed(EditNoteScreen.routeName);
                    },
                  ));
  }
}
