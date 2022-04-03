class HttpException extends Error {
  code: number;

  error: string;

  constructor(code: number, error: string) {
    super();
    this.code = code;
    this.error = error;
  }
}

export default HttpException;
