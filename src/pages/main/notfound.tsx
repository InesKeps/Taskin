import { MdErrorOutline } from "react-icons/md";

const NotFound = () => {
    return(
        <>
            <section className="flex flex-col items-center justify-center gap-4 bg-[#212845] h-dvh">
                <MdErrorOutline className="text-8xl text-white" />
                <h1 className="text-9xl text-white font-medium">404</h1>
                <p className="flex items-center text-2xl font-medium text-[#ed6d8b]">Sorry, Page not found !</p>
            </section>
        </>
    )
}

export default NotFound;