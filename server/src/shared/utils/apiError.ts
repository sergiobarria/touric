export class APIError extends Error {
  public status: string | number;
  public statusCode: number;
  public message: string;
  public isOperational: boolean;
  public stack: string | undefined;

  constructor(message: string, statusCode: number) {
    super(message);

    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.message = message;
    this.stack = new Error().stack;

    Error.captureStackTrace(this, this.constructor);
  }
}
