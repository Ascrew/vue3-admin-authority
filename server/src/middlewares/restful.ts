export class Result {
  code: number;
  data: any;
  message: string

  constructor (code = 0, data = {}, message: string) {
    this.code = code
    this.data = data
    this.message = message
  }
}
