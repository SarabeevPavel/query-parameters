import { useEffect, useState } from "react"
import { getData } from "./utils/server"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useGetFilters } from "./hooks/useGetFilters"
// import { useGetCategories } from "./hooks/useGetCategories"
import { Filters } from "./components/Filters"
import { useGetTitles } from "./hooks/useGetTitles"
import { Titles } from "./components/Titles"

function App() {
  const [data, setData] = useState<any[] | []>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [valueQuery, setValueQuery] = useState(searchParams.get("q") || "")

  useEffect(() => {
    if (valueQuery.trim() === "") {
      searchParams.delete("q")
    } else {
      searchParams.set("q", valueQuery.toLowerCase())
    }
    setSearchParams(searchParams)
  }, [valueQuery, searchParams, setSearchParams])

  useEffect(() => {
    if (searchParams.get("q") === "") {
      searchParams.delete("q")
    }
  }, [searchParams])

  const filters = useGetFilters(data)
  const titles = useGetTitles(data)

  useEffect(() => {
    getData()
      .then((res) => res)
      .then((data: any) => setData(data))
  }, [])

  return (
    <div className="w-screen h-screen bg-blue-100">
      <div className="flex flex-col p-5">
        <button
          onClick={() => navigate("/")}
          className="mx-auto flex justify-center items-center bg-green-200 w-20 h-10 font-bold rounded-xl hover:shadow-lg hover:bg-green-500"
        >
          Reset
        </button>
        <div className="flex justify-center items-center mt-10">
          <input
            placeholder="Search"
            value={valueQuery}
            onChange={(e) => setValueQuery(e.target.value)}
            className="bg-gray-100 text-black/70 w-40 h-10 rounded-lg px-3 "
          />
        </div>
        <div className="">
          <Filters filters={filters} />
          <Titles titles={titles} />
        </div>
      </div>
    </div>
  )
}

export default App
