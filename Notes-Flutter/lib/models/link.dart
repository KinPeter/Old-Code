import 'dart:convert';

class Link {
  String name;
  String url;

  Link(this.name, this.url);

  Link.fromJSON(String jsonStr) {
    Map<String, dynamic> map = json.decode(jsonStr);
    name = map['name'];
    url = map['url'];
  }

  String toJSON() {
    return json.encode({'name': name, 'url': url});
  }
}
