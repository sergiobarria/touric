import { isEmpty, isObject } from 'lodash'

/**
 * @desc: Given an object with string keys, parse the values to number if the key is in the fields array
 */
export function parseStrToInt(obj: Record<string, any>, fields: string[]): Record<string, any> {
    if (isEmpty(obj)) return obj

    for (const [key, value] of Object.entries(obj)) {
        if (isObject(value)) {
            obj[key] = parseStrToInt(value, ['lte', 'gte', 'lt', 'gt'])
        } else if (!isObject(value) && fields.includes(key)) {
            obj[key] = Number(value)
        }
    }

    return obj
}
