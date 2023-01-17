import { useGetCategories } from "./useGetCategories"
import { DataItem, Filter } from "../utils/types"

export const useGetFilters = (data: DataItem[]) => {
  //   const categories = useGetCategories(data)
  //   const [filters, setFilters] = useState<Filter[] | []>([])
  const filters: Filter[] = []

  //   categories.forEach((category) => {
  //     if (category !== "title") {
  //       Object.assign(filters, {
  //         [category]: data.map((item) => item),
  //       })
  //     }
  //   })

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

// [string, string | string[]]

// data.map((item: DataItem) => {
//       return Object.entries(item).map(
//         ([key, value]: [string, string | string[]]) => {
//           return value
//         }
//       )
//     }),
//   })
//   data.forEach((item: DataItem) => {
//     Object.entries(item).forEach(
//       ([key, value]: [string, string | string[]]) => {
//         if (key !== "title") {
//           // Object.keys(filters).includes(key) ? filters[key] = [] : return
//           key = key in filters ? " " : ""
//         }
//       }
//     )
//   })
// Object.entries(item).forEach(([category, value]) => {
//   //   const [category, value] = field

//   if (category === "title") {
//     return
//   } else {
//     return (filters = {
//       ...filters,
//       [category]: [...filters[category], value],
//     })
//   }

//   if (typeof value === "object") {
//     filters = { ...filters, [category]: [...filters[category], ...value] }
//   } else {
//     filters = { ...filters, [category]: [...filters[category], value] }
//   }

//   if (Object.keys(filters).includes(category)) {
//     filters = {
//       ...filters,
//       [category]: [...filters, ...value],
//     }
//   } else {

//   }
//     typeof filters[category] === "object"
//       ? (filters[category] = [...filters[category], value])
//       : (filters[category] = [filters[category], value])
//   }
// })
//   )
