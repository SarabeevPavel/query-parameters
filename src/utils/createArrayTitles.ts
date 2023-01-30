import { DataItem } from "./types"

export const createArrayTitles = (data: DataItem[], params: string[]) => {
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
        if (allParamsArray.length) {
          if (
            allParamsArray[0]
              .split(" ")
              .every((item) =>
                valuesArray.join("").replaceAll(" ", "").includes(item)
              )
          ) {
            newTitles.push(item.title)
          }
        }
      }
    )
    valuesArray = []
    return {}
  })
  return newTitles
}
