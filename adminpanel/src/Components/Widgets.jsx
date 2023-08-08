import { Link } from "react-router-dom";
import {useQuery} from"@tanstack/react-query"
import { makeRequest } from "../axios";

const Widgets=({type})=>{
  const {data:studentlen}=useQuery(["users"],() =>
    makeRequest.get("users/getall").then((res) => {
      return res.data || null
  })
  )
  const {data:courselen}=useQuery(["courses"],() =>
    makeRequest.get("courses/getall").then((res) => {
      return res.data || null
  })
  )
  const {data:instructlen}=useQuery(["instructors"],() =>
    makeRequest.get("instructors/getall").then((res) => {
      return res.data || null
  })
  )
    let data
    switch (type) {
        case "students":
          data = {
            title: "students",
            number:studentlen?.length,
            list:"view all students"
          };
          break;
        case "courses":
          data = {
            title: "courses",
            number:courselen?.length,
            list:"view all courses"
     };
          break;
        case "instructors":
          data = {
            title: "instructors",
            number:instructlen?.length,
            list:"view all instructors"
          };
          break;
        default:
          break;
      }
    return(
        <div className="flex h-15  m-3 p-7 justify-between flex-1 shadow-sm rounded-2xl shadow-gray-600 hover:shadow-lg dark: border-2 dark:text-gray-500 ">
            <div className="flex-col flex justify-between">
                <span className= {`  text-sm text-gray-500 `}>{data.title}</span>
                <Link to={"/"+data.title}>
                <span className="w-max text-md border-b-2 cursor-pointer text-gray-600  ">{data.list}</span>
                </Link>
            </div>
            <div className=" text-xl text-gray-500">{data.number}</div>
        </div>
    )
}
export default Widgets