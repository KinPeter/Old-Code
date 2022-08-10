import 'package:flutter/material.dart';
import 'package:notes/providers/snackbar.dart';
import 'package:notes/widgets/add_link_dialog.dart';
import 'package:notes/widgets/edit_note_link_item.dart';
import 'package:provider/provider.dart';
import 'package:notes/models/note.dart';
import 'package:notes/models/link.dart';
import 'package:notes/providers/notes.dart';

import '../widgets/error_dialog.dart';

class EditNoteScreen extends StatefulWidget {
  static const routeName = '/edit-note';

  @override
  _EditNoteScreenState createState() => _EditNoteScreenState();
}

class _EditNoteScreenState extends State<EditNoteScreen> {
  Notes _notes;
  String _noteId;
  Note _editedNote = Note.getInitial();
  bool _isLoading = false;
  bool _isInitialLoad = true;

  @override
  void initState() {
    _notes = Provider.of<Notes>(context, listen: false);
    super.initState();
  }

  @override
  void didChangeDependencies() {
    if (_isInitialLoad) {
      _noteId = ModalRoute.of(context).settings.arguments as String;
      if (_noteId != null) {
        _editedNote =
            Note.clone(_notes.notes.firstWhere((e) => e.id == _noteId));
      }
    }
    _isInitialLoad = false;
    super.didChangeDependencies();
  }

  void setLoading(bool value) {
    setState(() {
      _isLoading = value;
    });
  }

  Future<void> _onSave() async {
    setLoading(true);
    try {
      if (_noteId == null) {
        // Add new note
        await _notes.addNote(_editedNote);
        Provider.of<SnackBars>(context, listen: false).triggerAdded();
      } else {
        // Update note
        await _notes.updateNote(_editedNote);
        Provider.of<SnackBars>(context, listen: false).triggerUpdated();
      }
      Navigator.of(context).pop();
    } catch (e) {
      print(e);
      showDialog(
          context: context,
          builder: (ctx) => ErrorDialog(
              ctx,
              _noteId == null
                  ? 'Could not add new note.'
                  : 'Could not update note.'));
    } finally {
      setLoading(false);
    }
  }

  Future<void> _showAddLinkDialog() async {
    Link newLink = await showDialog<Link>(
      context: context,
      builder: (ctx) => AddLinkDialog(ctx),
    );
    if (newLink != null) _addLink(newLink);
  }

  void _addLink(Link link) {
    if (_editedNote.links == null) {
      _editedNote.links = [];
    }
    setState(() {
      _editedNote.links.add(link);
    });
  }

  void _deleteLink(int i) {
    List<Link> newLinks = [..._editedNote.links];
    newLinks.removeAt(i);
    setState(() {
      _editedNote.links = newLinks.length == 0 ? null : newLinks;
    });
  }

  List<Widget> _getLinkItems() {
    if (_editedNote.links == null) return [];
    return _editedNote.links.asMap().entries.map((e) {
      final int i = e.key;
      final Link link = e.value;
      return EditNoteLinkItem(link, i, _deleteLink);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      appBar: AppBar(
        title: Text(_noteId != null ? 'Edit Note' : 'Add New Note'),
        actions: [
          if (_isLoading)
            Container(
              width: 56,
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
              ),
            )
          else
            IconButton(
              icon: Icon(Icons.save),
              onPressed: _editedNote.text.length > 0 ? _onSave : () {},
            )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 16.0),
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.0),
          ),
          child: Container(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                TextFormField(
                  autovalidateMode: AutovalidateMode.always,
                  decoration: const InputDecoration(labelText: 'Text'),
                  initialValue: _editedNote.text,
                  keyboardType: TextInputType.multiline,
                  minLines: 3,
                  maxLines: 10,
                  textInputAction: TextInputAction.newline,
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Must not be empty!';
                    }
                    return null;
                  },
                  onChanged: (value) {
                    setState(() {
                      _editedNote.text = value;
                    });
                  },
                  onSaved: (value) {
                    _editedNote.text = value;
                  },
                ),
                const SizedBox(
                  height: 24.0,
                ),
                ..._getLinkItems(),
                FlatButton(
                    textColor: Theme.of(context).accentColor,
                    onPressed: _showAddLinkDialog,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        const Icon(Icons.add),
                        const SizedBox(
                          width: 4,
                        ),
                        const Text('ADD LINK'),
                      ],
                    ))
              ],
            ),
          ),
        ),
      ),
    );
  }
}
