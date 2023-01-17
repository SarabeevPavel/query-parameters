import { useSearchParams } from "react-router-dom"
import { Filter } from "../utils/types"
import { useEffect, useState } from "react"

interface FilterListProps {
  filters: Filter[]
}

interface CurrentFilter {
  name: string
  category: string
  isSelected: boolean
}

export const FilterList = ({ filters }: FilterListProps) => {
  const [currentFilters, setCurrentFilters] = useState<CurrentFilter[] | []>([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const updatedFilters = filters.map((filter) => {
      if (searchParams.get(filter.category)?.includes(filter.name)) {
        return {
          ...filter,
          isSelected: true,
        }
      } else {
        return {
          ...filter,
          isSelected: false,
        }
      }
    })
    setCurrentFilters(updatedFilters)
  }, [searchParams, filters])

  const handleSelectFilter = (filter: Filter) => {
    currentFilters.forEach((currentFilter) => {
      if (currentFilter.name.toLowerCase() === filter.name.toLowerCase()) {
        const params = searchParams.get(currentFilter.category)
        if (!params) {
          searchParams.set(filter.category, filter.name) // if category undefined - set this category
        }
        // if (params === currentFilter.name) {
        //   //if category is defined - check params on equal for current filter name
        //   searchParams.delete(filter.category)
        // } else {
        //     !params?.split(",").includes(filter.name){
        //         searchParams.set(currentFilter.category, params?.split(',').concat(filter.name).join(","))
        //     }
        // }
      }
    })

    //   const params = searchParams.set(filter.category, filter.name)
    // searchParams.set(`${filter.category}`, filter.name.toLocaleLowerCase())
    setSearchParams(searchParams)
  }

  return (
    <div className="px-20 py-10 flex justify-start items-center flex-wrap">
      {currentFilters.length &&
        currentFilters.map((filter, i) => (
          <div
            key={i}
            className={`m-2 w-28 h-12 ${
              filter.isSelected ? "bg-green-300" : "bg-yellow-300"
            } text-sm font-normal rounded-lg hover:bg-yellow-500 flex justify-center items-center`}
            onClick={() => handleSelectFilter(filter)}
          >
            {filter.name}
          </div>
        ))}
    </div>
  )
}
