/* eslint-disable @typescript-eslint/space-before-function-paren */
declare module 'xss-clean' {
  import { RequestHandler } from 'express'
  function xss(options?: {
    whiteList?: Record<string, string[] | boolean>
    stripIgnoreTag?: boolean
    stripIgnoreTagBody?: string[]
    escapeHtml?: (str: string) => string
  }): RequestHandler
  export = xss
}
