export class UserError extends Error {

  errorInfos: string[];

  constructor (errorInfos: string[]) {
    super();
    this.errorInfos = errorInfos;

  }
}
