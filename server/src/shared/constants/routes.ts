const VERSION = 'v1'

export const routes = {
  prefix: `/api/${VERSION}`,
  healthcheck: '/healthcheck',

  // Tours routes
  tours: '/tours',
  tour: '/tours/:id',

  // Users routes
  users: '/users',
  user: '/users/:id'

  // Auth routes
  // ...
}
