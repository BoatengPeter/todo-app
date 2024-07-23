import Comments from "../../../components/common/Comments"
const PageHeader = () => {
    return (
        <div className="w-full h-20 flex items-center   sticky top-0 bg-white z-20 shadow-sm ">
            <div>
                <Comments />
            </div>
        </div>
    )
}

export default PageHeader
