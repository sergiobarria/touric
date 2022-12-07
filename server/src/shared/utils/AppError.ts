export class AppError extends Error {
  public isOperational: boolean
  public statusCode: number
  public status: string
  public message: string
  public stack: string | undefined

  public path: string

  public value: string

  public errmsg: string

  constructor (message: string, statusCode: number) {
    super(message)

    this.isOperational = true
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.message = message
    this.stack = new Error().stack
    this.path = ''
    this.value = ''
    this.errmsg = ''

    Error.captureStackTrace(this, this.constructor)
  }
}
