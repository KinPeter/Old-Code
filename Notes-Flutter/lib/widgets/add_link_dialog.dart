import 'package:flutter/material.dart';
import 'package:notes/models/link.dart';

class AddLinkDialog extends StatelessWidget {
  final BuildContext ctx;

  AddLinkDialog(this.ctx);

  final _nameController = TextEditingController();
  final _urlController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Add Link'),
      scrollable: true,
      content: Container(
        height: 130,
        child: Column(
          children: [
            TextField(
              decoration: const InputDecoration(labelText: 'Name'),
              controller: _nameController,
              textInputAction: TextInputAction.next,
              keyboardType: TextInputType.text,
            ),
            TextField(
              decoration: const InputDecoration(labelText: 'URL'),
              controller: _urlController,
              textInputAction: TextInputAction.done,
              keyboardType: TextInputType.url,
            ),
          ],
        ),
      ),
      actions: [
        FlatButton(
          textColor: Colors.grey,
          child: Text('Cancel'),
          onPressed: () {
            Navigator.of(ctx).pop(null);
          },
        ),
        FlatButton(
          textColor: Theme.of(context).accentColor,
          child: Text('Add'),
          onPressed: () {
            Navigator.of(ctx)
                .pop(Link(_nameController.text, _urlController.text));
          },
        ),
      ],
    );
  }
}
