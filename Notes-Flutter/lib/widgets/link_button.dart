import 'package:flutter/material.dart';
import 'package:notes/models/link.dart';
import 'package:url_launcher/url_launcher.dart';

class LinkButton extends StatelessWidget {
  final Link link;
  final bool archived;

  LinkButton(this.link, this.archived);

  Future<void> openLink() async {
    final url = link.url;
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return FlatButton(
        onPressed: openLink,
        textColor:
            archived ? Colors.grey.shade400 : Theme.of(context).accentColor,
        padding: const EdgeInsets.symmetric(horizontal: 4.0, vertical: 0),
        height: 12.0,
        visualDensity:
            const VisualDensity(vertical: VisualDensity.minimumDensity),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const Icon(Icons.link),
            const SizedBox(
              width: 4.0,
            ),
            Text(
              link.name,
              style: TextStyle(fontWeight: FontWeight.bold),
            )
          ],
        ));
  }
}
