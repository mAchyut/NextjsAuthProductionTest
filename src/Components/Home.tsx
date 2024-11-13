import Link from "next/link"

function HOMEPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
        <h1>
            HOMEPage
            <Link href={"/login"}> <br /> Login</Link>
        </h1>
    </div>
  )
}

export default HOMEPage