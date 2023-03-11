import { NextFunction, Response } from 'express'

import { APIError } from '@/shared/utils/apiError'

import { ValidatedUserRequest } from './protectRoute.middleware'

/**
 * @desc: Restrict access to certain routes for unauthenticated users
 * @endpoint: N/A (middleware)
 */
export const restrictTo = (...roles: string[]) => {
  return (req: ValidatedUserRequest, res: Response, next: NextFunction) => {
    // roles is an array of strings ['admin', 'lead-guide']
    if (!roles.includes(req.user?.role as string)) {
      return next(APIError.forbidden('You do not have permission to perform this action'))
    }

    next()
  }
}
