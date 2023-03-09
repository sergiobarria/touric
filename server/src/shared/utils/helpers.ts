export const removeFieldsFromObject = (
  obj: Record<string, string>,
  fields: string[]
): Record<string, string> => {
  const objMap = new Map(Object.entries(obj))

  fields.forEach(field => objMap.delete(field))

  return Object.fromEntries(objMap)
}
