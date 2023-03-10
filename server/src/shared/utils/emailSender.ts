import nodemailer from 'nodemailer'

import { config } from '@/config'

interface MailOptions {
  from?: string
  to: string
  subject: string
  message: string
}

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = config

export const sendEmail = async (options: MailOptions): Promise<any> => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
  })

  // 2) Define the email options
  const mailOptions = {
    from: options.from ?? 'Sergio B <sergio@touric.com>',
    to: options.to,
    subject: options.subject,
    text: options.message
  }

  // 3) Actually send the email
  await transporter.sendMail(mailOptions)
}
