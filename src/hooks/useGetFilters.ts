import { DataItem, Filter } from "../utils/types"

export const useGetFilters = (data: DataItem[]) => {
  const filters: Filter[] = []

  data.forEach((item) =>
    Object.entries(item).forEach(
      ([key, value]: [string, string | string[]]) => {
        if (Array.isArray(value)) {
          value.forEach((filterName) => {
            const newFilter = {
              category: key,
              name: filterName,
            }

            filters.push(newFilter)
          })
        }
      }
    )
  )

  const uniqueFilters = filters.filter((obj, index) => {
    return (
      index ===
      filters.findIndex(
        (item) => obj.name === item.name && obj.category === item.category
      )
    )
  })

  return uniqueFilters
}
