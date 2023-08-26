import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from '../axios';
import Popup from '../Components/Popup';
import ConfirmationPopup from '../Components/ConfirmationPopup';

const Courseslist = () => {

  const queryClient = useQueryClient();

  const [Courseslist, SetCourseslist] = useState()
  const [showConfPopup, setShowConfPopup] = useState(false);
  const [showConfPopupdelete, setShowConfPopupdelete] = useState(false);

  const [deletedId, setdeletedId] = useState(null)
  const [CourseIndex, SetCourseIndex] = useState(null)
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupdelete, setShowPopupdelete] = useState(false);

  const showConfirmationPopup = (event, id) => {
    event.preventDefault()
    setdeletedId(id)
    setShowPopupdelete(true);
  };
  const showpopupUpdate = (e, index) => {
    e.preventDefault()
    setShowPopup(true)
    SetCourseIndex(index)
  }

  const mutation = useMutation(
    (updatecourse) => {
      return makeRequest.post("courses/update", updatecourse);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["courses"]);
      },
    }
  );

  const deletemutation = useMutation(
    (deleted) => {
      return makeRequest.delete("courses/delete/" + deleted);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["courses"]);
      },
    }
  );

  const { isLoading, error, data } = useQuery(["courses"], () =>
    makeRequest.get("courses/getall").then((res) => {
      return res.data || null
    })
  )

  const { data: instructs } = useQuery(["instructors"], () =>
    makeRequest.get("instructors/getall").then((res) => {
      return res.data;
    })
  );


  useEffect(() => {
    SetCourseslist(data)
  }, [data])

  const handlechange = (e, index) => {
    const updatedArray = Courseslist?.map((obj, i) => {
      if (i === index) {
        console.log([e.target.name], e.target.value)
        return { ...obj, [e.target.name]: e.target.value }
      }
      return obj
    })
    SetCourseslist(updatedArray)
  }

  const handleSubmit = (e, index) => {
    e.preventDefault()
    mutation.mutate(Courseslist[index])
    SetCourseIndex(false)
    setShowPopup(false)
    setShowConfPopup(true);
  }

  const handelDelete = (e, id) => {
    e.preventDefault()
    deletemutation.mutate(id);
    setdeletedId(null)
    setShowPopupdelete(false)
    setShowConfPopupdelete(true);
  }

  const customCss = {
    height: "calc(100vh - 100px)",
  }

  return (
    <div className="m-0 md:m-6 mt-0 ">
      <div className="flex items-center justify-center h-16 text-gray-400 dark:text-gray-200 text-xl dark:bg-slate-950 font-bold text-center sticky top-0 bg-white  border-2 dark:border-white border-t-2">
        <span >Courses list</span>
      </div>
      <TableContainer component={Paper} style={customCss} className="scrollbar-hidden dark:bg-slate-950">
        <Table className='border-2'>
          <TableHead className='sticky top-0 border-b-2 bg-white'>
            <TableRow className='border-b-2'>
              <TableCell className='w-30 dark:text-gray-200 dark:bg-slate-950'>id</TableCell>
              <TableCell className='w-30 dark:text-gray-200 dark:bg-slate-950'>Course title</TableCell>
              <TableCell className='w-30 dark:text-gray-200 dark:bg-slate-950'>Catagory</TableCell>
              <TableCell className='w-30 dark:text-gray-200 dark:bg-slate-950'>Description</TableCell>
              <TableCell className='w-30 dark:text-gray-200 dark:bg-slate-950'>Instructor</TableCell>
              <TableCell className='w-30 dark:text-gray-200 dark:bg-slate-950'>Type</TableCell>
              <TableCell className='w-30 dark:text-gray-200 dark:bg-slate-950'>Chapter#</TableCell>
              <TableCell className='w-30 dark:text-gray-200 dark:bg-slate-950' align='center' colSpan={2}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='w-full dark:bg-slate-950'>
            {
              isLoading ? <TableRow><TableCell colSpan={9}><div className="flex items-center justify-center w-full"><div className="custom-loader"></div></div></TableCell></TableRow>
                : error ? <TableRow><TableCell colSpan={9}><div className="flex items-center justify-center w-full"><div className="text-red-700">somthing went wrong!</div></div></TableCell></TableRow>
                  : data?.map((row, index) => (
                    <TableRow
                      key={row._id}>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950'>{row._id}</TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950' ><input name="title" className="dark:bg-slate-700 h-12 border-2 rounded-md p-2" type="text" defaultValue={row.title} onChange={(e) => handlechange(e, index)} /> </TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950' > <input name="category" className="dark:bg-slate-700 h-12 border-2 rounded-md p-2" type="text" defaultValue={row.category} onChange={(e) => handlechange(e, index)} /></TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950 '><textarea name="descreption" className="dark:bg-slate-700 h-12 border-2 rounded-md p-2 hover:h-24" rows={3} cols={30} defaultValue={row.descreption} onChange={(e) => handlechange(e, index)} /></TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950 '>
                        {/* <input name="instructor" className="dark:bg-slate-700 h-12 border-2 rounded-md p-2" type="text" defaultValue={row.instructor} onChange={(e) => handlechange(e, index)} /> */}
                        <select value={Courseslist ? Courseslist[index].instructor : row.instructor} onChange={(e) => handlechange(e, index)} className="dark:bg-slate-700 h-12 border-2 rounded-md p-2" name="instructor">
                          {instructs?.map(instructors => (
                            data?.length === 0 ? <option className="dark:bg-slate-900 text-center" value="">No instruct available</option>
                              : <option className="dark:bg-slate-900 text-lg text-center" value={instructors.firstName + " " + instructors.lastName + "/:/" + instructors._id}>{instructors.firstName + " " + instructors.lastName}</option>
                          ))
                          }
                        </select>
                      </TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950 '>
                        <select value={Courseslist ? Courseslist[index].type : null} onChange={(e) => handlechange(e, index)} className="dark:bg-slate-700 h-12 border-2 rounded-md p-2" name="type">
                          <option className="dark:bg-slate-900 text-lg text-center" value="free">free</option>
                          <option className="dark:bg-slate-900 text-lg text-center" value="premium">premium</option>
                        </select>
                      </TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950 '><Link to={"/courses?id=" + row._id}><div className="" > +<EditIcon className="w-3 h-1" /> {row.section.length}</div></Link></TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950  '><button className="border-2 rounded-md border-purple-600 p-3" onClick={(e) => showpopupUpdate(e, index)}>update</button> </TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950  '><button className="border-2 rounded-md border-red-600 p-3" onClick={(e) => showConfirmationPopup(e, row._id)} >delete</button> </TableCell>
                    </TableRow>
                  ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <div className="absolute top-1/3 left-1/3">
        {showPopupdelete && (
          <Popup onConfirm={(e) => handelDelete(e, deletedId)} onCancel={() => setShowPopupdelete(false)} message={"Do You Want To Delete This Item ?"} />
        )}
        {showConfPopupdelete && (
          <ConfirmationPopup onCancel={() => setShowConfPopupdelete(false)} confmessage={"Item Deleted successfully"} />
        )}
      </div>
      <div className="absolute top-1/3 left-1/3">
        {showPopup && (
          <Popup onConfirm={(e) => handleSubmit(e, CourseIndex)} onCancel={() => setShowPopup(false)} message={"Do You Want To Update This Item ?"} />
        )}
        {showConfPopup && (
          <ConfirmationPopup onCancel={() => setShowConfPopup(false)} confmessage={"Item Updated successfully"} />
        )}
      </div>
    </div>
  )
}
export default Courseslist