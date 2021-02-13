export class MockUserService {
  public async signUp(_email: string, _password: string, _displayName: string): Promise<boolean> {
    return true
  }
}
