import { Suspense } from "react"
import PageSkeleton from "./PageSkeleton"

const LazyPage = ({ children }) => (
    <Suspense fallback={<PageSkeleton />}>
        {children}
    </Suspense>
)

export default LazyPage