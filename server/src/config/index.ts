export const config = {
  PORT: process.env.PORT ?? 3000,
  API_VERSION: process.env.API_VERSION ?? 'v1',
  HOST: '0.0.0.0',
  EMAIL_HOST: process.env.EMAIL_HOST as string,
  EMAIL_PORT: process.env.EMAIL_PORT as unknown as number,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME as string,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string
}
