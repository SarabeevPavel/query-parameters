interface TitlesProps {
  titles: string[]
}

export const Titles: React.FC<TitlesProps> = ({ titles }) => {
  return (
    <div className="flex">
      <h2 className="w-1/6 text-xl font-semibold m-2">Questions:</h2>
      <div className="w-5/6 flex flex-wrap">
        {titles.map((title, i) => (
          <div
            key={i}
            className="flex justify-center items-center p-2 bg-white w-1/5 ring-1 ring-blue-500 rounded-md m-2 text-center"
          >
            <p>{title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
