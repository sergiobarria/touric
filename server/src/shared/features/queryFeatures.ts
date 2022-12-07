import { HydratedDocument, QueryWithHelpers } from 'mongoose'
import { TourMethods, TourSchema } from '@/models'
import { GetAllToursInput } from '@/modules/tours'
import { omit } from 'lodash'

/**
 * @description - This class implements all the filter, sorting and pagination logic
 * @params - it receives a mongoose query object and the query object from the request
 */
export class QueryFeatures {
  public query: QueryWithHelpers<
  Array<HydratedDocument<TourSchema, TourMethods, {}>>,
  HydratedDocument<TourSchema, TourMethods, {}>,
  {},
  TourSchema
  >

  public queryString: GetAllToursInput['query']

  constructor (
    query: QueryWithHelpers<
    Array<HydratedDocument<TourSchema, TourMethods, {}>>,
    HydratedDocument<TourSchema, TourMethods, {}>,
    {},
    TourSchema
    >,
    queryObj: GetAllToursInput['query']
  ) {
    this.query = query
    this.queryString = queryObj
  }

  filter (): QueryFeatures {
    let queryObj = { ...this.queryString }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    queryObj = omit(queryObj, excludedFields)

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    this.query = this.query?.find(JSON.parse(queryStr))
    return this
  }

  sort (): QueryFeatures {
    if (this.queryString.sort !== undefined) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this
  }

  limitFields (): QueryFeatures {
    if (this.queryString.fields !== undefined) {
      const fields = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }

    return this
  }

  paginate (): QueryFeatures {
    const page = Number(this.queryString.page) ?? 1
    const limit = Number(this.queryString.limit) ?? 20
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}
