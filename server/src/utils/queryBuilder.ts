import type { Prisma } from '@prisma/client'
import { omit, isEmpty, isString, isNumber } from 'lodash'

type FilterValue = string | number | Record<string, string | number>

interface QueryBuilderOptions {
    numberFields: string[]
    excludedFields: string[]
}

export class QueryBuilder {
    private readonly queryObj: Record<string, any>
    private readonly options: QueryBuilderOptions

    constructor(queryObj: Record<string, FilterValue>, options?: QueryBuilderOptions) {
        this.queryObj = queryObj
        this.options = options ?? { numberFields: [], excludedFields: [] }
    }

    where(): Prisma.toursWhereInput | undefined {
        const whereObj = this.parseWhere()
        return !isEmpty(whereObj) ? whereObj : undefined
    }

    orderBy(): Array<Record<string, string>> | undefined {
        let orderBy = []

        if (this.queryObj?.sort !== undefined) {
            const sortArr = this.queryObj.sort?.split(',') ?? []
            orderBy = sortArr.map((el: string) => {
                const order = el.startsWith('-') ? 'desc' : 'asc'
                const field = el.replace(/^-/, '')
                return { [field]: order }
            })
        } else {
            orderBy = [{ createdAt: 'desc' }]
        }

        return orderBy.length > 0 ? orderBy : undefined
    }

    select(): Record<string, boolean> | undefined {
        let select = {}
        if (this.queryObj?.fields !== undefined) {
            const fieldsArr = this.queryObj.fields.split(',').map((el: string) => el.trim())
            select = fieldsArr.reduce((acc: Record<string, any>, curr: string) => {
                return { ...acc, [curr]: true }
            }, {})
        }

        return !isEmpty(select) ? select : undefined
    }

    paginate(): { skip: number; take: number } {
        const page = this.queryObj?.page !== undefined ? parseInt(this.queryObj.page, 10) : 1
        const limit = this.queryObj?.limit !== undefined ? parseInt(this.queryObj.limit, 10) : 100
        const skip = (page - 1) * limit

        return { skip, take: limit }
    }

    private parseWhere(): Prisma.toursWhereInput {
        const { numberFields, excludedFields } = this.options
        const obj: object = omit(this.queryObj, excludedFields)

        return Object.entries(obj)
            .filter(([_, value]) => typeof value !== 'undefined')
            .reduce((acc, [key, value]) => {
                if (isString(value) || isNumber(value)) {
                    return { ...acc, [key]: value }
                } else {
                    const operator = Object.keys(value)[0]
                    const fieldValue = value[operator]
                    const parsedValue = numberFields.includes(key) ? parseInt(fieldValue as string, 10) : fieldValue
                    return { ...acc, [key]: { [operator]: parsedValue } }
                }
            }, {})
    }
}
