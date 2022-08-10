import 'dart:io';

Future<bool> hasConnection() async {
  try {
    final result = await InternetAddress.lookup('example.com');
    if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
      print('[+] Internet connected');
      return true;
    }
  } on SocketException catch (_) {
    print('[-] Internet not connected');
    return false;
  } catch (e) {
    print('[-] Could not check connection');
    return false;
  }
  return false;
}
