
interface Params{
  id: string
}

async function page({params}:{params:Promise<Params>}) {
    const paramValue = await params
  return (
    <div className="text-center mt-40 text-amber-300">Dynamic route {paramValue.id}</div>
  )
}

export default page