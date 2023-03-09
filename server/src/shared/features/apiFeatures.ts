/* eslint-disable @typescript-eslint/space-before-function-paren */
import { Document, FilterQuery, Query } from 'mongoose'

import { removeFieldsFromObject } from '@/shared/utils/helpers'

interface QueryString {
  sort?: string
  fields?: string
  page?: string
  limit?: string
  [key: string]: any
}

/**
 * @desc: This class contains all the methods to filter, sort, and paginate resources
 * @param: {Object} query - The mongoose query object
 * @param: {Object} queryStr - The query string from the request object
 */
export class APIFeatures<T extends Document, U = {}> {
  query: Query<T[] & U, T, unknown>
  queryStr: QueryString

  constructor(query: Query<T[] & U, T, unknown>, queryStr: QueryString) {
    this.query = query
    this.queryStr = queryStr
  }

  filter(): APIFeatures<T, FilterQuery<T> & U> {
    let queryObj = { ...this.queryStr }
    const excludedFields = ['page', 'sort', 'limit', 'fields']

    queryObj = removeFieldsFromObject(queryObj, excludedFields)

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr)) as Query<T[] & FilterQuery<T> & U, T, unknown>

    return this as APIFeatures<T, FilterQuery<T> & U>
  }

  sort(): APIFeatures<T, U> {
    if (this.queryStr.sort !== undefined) {
      const sortBy = this.queryStr.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this as APIFeatures<T, U>
  }

  limitFields(): APIFeatures<T, U> {
    if (this.queryStr.fields !== undefined) {
      const fields = this.queryStr.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }

    return this as APIFeatures<T, U>
  }

  paginate(): APIFeatures<T, U> {
    const page = Number(this.queryStr.page) ?? 1
    const limit = Number(this.queryStr.limit) ?? 100
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this as APIFeatures<T, U>
  }
}
