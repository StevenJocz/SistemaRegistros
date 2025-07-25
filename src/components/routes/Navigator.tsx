import { Route } from "@/models"
import Link from "next/link"

interface Prosp {
    pathNames: Route[]
}

function Navigator({ pathNames }: Prosp) {
    return (
        <ul>
            {pathNames.map(pathNames => (
                <Link key={pathNames.path}  href={pathNames.path}><li>{pathNames.name}</li></Link>
            ))}
        </ul>
    )
}

export default Navigator;