
async function page({params}:any) {
    const paramValue = await params
  return (
    <div className="text-center mt-40 text-amber-300">Dynamic route {paramValue.id}</div>
  )
}

export default page