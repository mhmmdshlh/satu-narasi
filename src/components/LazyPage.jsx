import { Suspense } from "react"
import PageSkeleton from "./PageSkeleton"

const LazyPage = ({ children, fallback }) => (
    <Suspense fallback={fallback || <PageSkeleton />}>
        {children}
    </Suspense>
)

export default LazyPage