export default function MaxWidthWrapper({children}) {
    return(
        <div className="w-full md:w-[69%] lg:w-[69%] mx-auto px-1 sm:px-2 md:px-0 lg:px-0 bg-transparent">
            {children}
        </div>
    )
}