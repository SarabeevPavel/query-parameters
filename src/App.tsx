import { useEffect, useState } from "react"
import { getData } from "./utils/server"
import { DataItem } from "./utils/types"
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom"
import { useGetFilters } from "./hooks/useGetFilters"
import { useGetCategories } from "./hooks/useGetCategories"
import { FilterList } from "./components/FilterList"

function App() {
  const [data, setData] = useState<any[] | []>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const [valueQuery, setValueQuery] = useState(searchParams.get("q") || "")

  const handleSearch = () => {
    if (valueQuery === "") searchParams.delete("q")
    searchParams.set("q", valueQuery.toLocaleLowerCase())
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const stringParams = searchParams.get("q")
  }, [searchParams])

  const filters = useGetFilters(data)
  const categories = useGetCategories(data)

  useEffect(() => {
    getData()
      .then((res) => res)
      .then((data: any) => setData(data))
  }, [])

  return (
    <div className="w-screen h-screen bg-blue-100">
      <div className="flex flex-col p-5">
        <a
          href="/"
          className="mx-auto flex justify-center items-center bg-green-200 w-20 h-10 font-bold rounded-xl hover:shadow-lg hover:bg-green-500"
        >
          Reset
        </a>
        <div className="flex justify-center items-center mt-10">
          <input
            placeholder="Search"
            value={valueQuery}
            onChange={(e) => setValueQuery(e.target.value)}
            className="bg-gray-100 text-black/70 w-40 h-10 rounded-lg px-3 "
          />

          <button
            onClick={handleSearch}
            className="w-20 h-10 bg-blue-500 text-white hover:bg-blue-800 hover:shadow-lg ml-5 rounded-lg"
          >
            Search
          </button>
        </div>
        <div className="">
          <FilterList filters={filters} />
        </div>
      </div>
    </div>
  )
}

export default App
