
export default function Loading() {
    return (
        <div className="flex flex-row flex-wrap gap-7 row-span-5 place-content-center items-center">
            {Array.from(Array(100).keys()).map((index) => {
                return <div key={index} className=" animate-pulse bg-slate-700 border border-white flex flex-col place-content-center items-center w-48 h-48">{"Loading pokemon..."}</div>
            })
            }
        </div>
    )
}