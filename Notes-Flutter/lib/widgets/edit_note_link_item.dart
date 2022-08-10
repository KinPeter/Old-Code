import 'package:flutter/material.dart';

import 'package:notes/models/link.dart';

class EditNoteLinkItem extends StatelessWidget {
  final Link _link;
  final int _index;
  final void Function(int) _deleteLinkFn;

  EditNoteLinkItem(this._link, this._index, this._deleteLinkFn);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        Row(
          children: [
            const Icon(Icons.link),
            const SizedBox(width: 4),
            Text(
              _link.name,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
        InkWell(
            child: Icon(
              Icons.close,
              color: Theme.of(context).errorColor,
            ),
            onTap: () => _deleteLinkFn(_index))
      ]),
    );
  }
}
