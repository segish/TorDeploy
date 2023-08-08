import Widgets from "../Components/Widgets"
import Charttt from "../Components/Charttt"

const Home = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center pl-6">
            <div className="w-full flex flex-col sm:flex-row gap-7 my-10 mx-5 ">
                <Widgets type="students" />
                <Widgets type="courses" />
                <Widgets type="instructors" />
            </div>
            <div className="w-full items-center justify-center flex hover:shadow-xl h-[400px]  shadow-sm pl-6 shadow-gray-600 rounded-t-xl  overflow-hidden ">
                <Charttt />
            </div>
        </div>
    )
}
export default Home