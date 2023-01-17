import { DataItem } from "./../utils/types"

export const useGetCategories = (data: DataItem[]) => {
  const categories: string[] = []

  data.forEach((item) => {
    return Object.keys(item).forEach(
      (key) => categories.includes(key) === false && categories.push(key)
    )
  })

  return categories
}
