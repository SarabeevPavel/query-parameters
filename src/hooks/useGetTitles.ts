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
    const newTitles: any[] = []
    let valuesArray: string[] = []
    data.map((item) => {
      Object.entries(item).forEach(
        ([key, value]: [string, string[] | string]) => {
          if (typeof value === "object") {
            valuesArray = [...valuesArray, ...value]
          }

          if (typeof value === "string") {
            const splitValue = value.split(" ")
            valuesArray = [...valuesArray, ...splitValue]
          }

          const allParamsArray: string[] = []
          params.forEach((param) => allParamsArray.push(...param.split("&")))

          if (allParamsArray.every((item) => valuesArray.includes(item))) {
            newTitles.push(item.title)
          }
        }
      )
      valuesArray = []
      return {}
    })

    setTitles(Array.from(new Set(newTitles)))
  }, [params, data])

  return titles
}
