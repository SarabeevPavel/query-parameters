import { useSearchParams } from "react-router-dom"
import { Filter } from "../utils/types"
import { useEffect, useState } from "react"

interface FiltersProps {
  filters: Filter[]
}

interface CurrentFilter {
  name: string
  category: string
  isSelected: boolean
}

export const Filters: React.FC<FiltersProps> = ({ filters }) => {
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
    const { name: selectFilterName, category: selectFilterCategory } = filter

    currentFilters.forEach((currentFilter) => {
      const { name: currentFilterName, category: currentFilterCategory } =
        currentFilter

      if (!searchParams.getAll(currentFilterCategory).length) {
        searchParams.delete(currentFilterCategory)
      }
      if (currentFilterName.toLowerCase() === selectFilterName.toLowerCase()) {
        const currentParams = searchParams.get(currentFilterCategory)

        if (!currentParams) {
          searchParams.set(selectFilterCategory, selectFilterName)
        } else if (currentParams === currentFilterName) {
          searchParams.delete(currentFilterCategory)
        } else if (!currentParams.split("&").includes(selectFilterName)) {
          searchParams.set(
            selectFilterCategory,
            currentParams.split(",").concat(currentFilterName).join("&")
          )
        } else {
          searchParams.set(
            currentFilterCategory,
            currentParams
              .split("&")
              .filter((param) => param !== selectFilterName)
              .join(",")
          )
        }
      }
    })
    setSearchParams(searchParams)
  }

  return (
    <div className="flex mb-10 mt-10">
      <h2 className="w-1/6 text-xl font-semibold m-2">Filters:</h2>
      <div className="w-5/6 flex justify-start items-center flex-wrap">
        {currentFilters.length &&
          currentFilters.map((filter, i) => (
            <div
              key={i}
              className={`m-2 w-28 h-12 ${
                filter.isSelected
                  ? "bg-green-300 hover:bg-green-500"
                  : "bg-yellow-300 hover:bg-yellow-500"
              } text-sm font-normal rounded-lg  flex justify-center items-center`}
              onClick={() => handleSelectFilter(filter)}
            >
              {filter.name}
            </div>
          ))}
      </div>
    </div>
  )
}
