import { createArrayTitles } from "./../utils/createArrayTitles"
import { DataItem } from "./../utils/types"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useGetTitles = (data: DataItem[]) => {
  const [titles, setTitles] = useState<any[]>([])
  const [searchParams] = useSearchParams()
  const [params, setParams] = useState<string[]>([])

  useEffect(() => {
    let newSearchParamsValues: string[] = Object.entries(
      Object.fromEntries(searchParams)
    )
      .map(([key, value]: [string, string]) => value.split(","))
      .flat()

    setParams(newSearchParamsValues)
  }, [searchParams])

  useEffect(() => {
    const newTitles = createArrayTitles(data, params)

    setTitles(Array.from(new Set(newTitles)))
  }, [params, data])

  return titles
}
