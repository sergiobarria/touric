const VERSION = 'v1'

export const routes = {
  prefix: `/api/${VERSION}`,
  healthcheck: '/healthcheck',

  // Tours routes
  tours: '/tours',
  tour: '/tours/:id'

  // Auth routes
  // ...
}
