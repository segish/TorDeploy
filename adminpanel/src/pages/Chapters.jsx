import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from '../axios';
import Popup from '../Components/Popup';
import ConfirmationPopup from '../Components/ConfirmationPopup';


const Chapters = () => {

  const queryClient = useQueryClient();

  const [Chapters, SetChapters] = useState()

  const [Addchapters, setAddchapters] = useState([])

  const courseID = useLocation().pathname.split("/")[2]

  const [showConfPopup, setShowConfPopup] = useState(false);
  const [showConfPopupdelete, setShowConfPopupdelete] = useState(false);
  const [showConfPopupADD, setShowConfPopupADD] = useState(false);

  const [deletedId, setdeletedId] = useState(null)
  const [showPopup, setShowPopup] = useState(false);
  const [ChapterIndex, setChapterIndex] = useState(null)
  const [showPopupdelete, setShowPopupdelete] = useState(false);
  const [showPopupADD, setShowPopupADD] = useState(false);

  const showConfirmationPopup = (event, id) => {
    event.preventDefault();
    setdeletedId(id)
    setShowPopupdelete(true);
  };
  const showUpdatePopup = (e, index) => {
    e.preventDefault();
    setChapterIndex(index)
    setShowPopup(true);
  };
  const ShowPopupADD = (e) => {
    e.preventDefault();
    setShowPopupADD(true);
  };

  const mutation = useMutation(
    (updatechapters) => {
      return makeRequest.post("courses/updatechapter/" + courseID, updatechapters);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["chapters"]);
      },
    }
  );

  const addmutation = useMutation(
    (addchapters) => {
      return makeRequest.post("courses/addchapter/" + courseID, addchapters);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["chapters"]);
      },
    }
  );

  const deletemutation = useMutation(
    (deleted) => {
      return makeRequest.delete("courses/" + courseID + "/deletechapter/" + deleted);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["chapters"]);
      },
    }
  );
  const { isLoading, error, data } = useQuery(["chapters"], () =>
    makeRequest.get("courses/" + courseID).then((res) => {
      return res.data
    })
  )

  useEffect(() => {
    SetChapters(data?.section)
  }, [data])


  const handleAddChange = (e) => {
    setAddchapters(((prev) => ({ ...prev, [e.target.name]: e.target.value })))
  }

  const handlechange = (e, index) => {
    e.preventDefault()
    const updatedArray = Chapters.map((obj, i) => {
      if (i === index) {
        return { ...obj, [e.target.name]: e.target.value }
      }
      return obj
    })
    SetChapters(updatedArray)
  }

  const handleUpdateSubmit = (e, index) => {
    e.preventDefault()
    mutation.mutate(Chapters[index])
    setChapterIndex(null)
    setShowPopup(false)
    setShowConfPopup(true);
  }

  const handleChapterSubmit = (e) => {
    e.preventDefault()
    addmutation.mutate(Addchapters)
    setShowPopupADD(false)
    setShowConfPopupADD(true)
  }

  const handelDelete = (e, id) => {
    e.preventDefault()
    deletemutation.mutate(id);
    setdeletedId(null)
    setShowPopupdelete(false)
    setShowConfPopupdelete(true);
  }


  return (
    <div className="m-0 md:m-6 mt-0">
      <div className="flex items-center justify-center h-16 text-gray-400 dark:text-gray-200 text-xl dark:bg-slate-950 font-bold text-center sticky top-0 bg-white  border-2 dark:border-white border-t-2">
        <span >{data?.title} CHAPTERS</span>
      </div>
      <TableContainer component={Paper} className="scrollbar-hidden border-2 dark:bg-slate-950" >
        <Table className='border-2'>
          <TableHead className='sticky top-0 border-b-2'>
            <TableRow className='border-b-2'>
              <TableCell align="center" className='w-30 dark:text-gray-200 dark:bg-slate-950 '>id</TableCell>
              <TableCell align="center" className='w-30 dark:text-gray-200 dark:bg-slate-950'>chapter title</TableCell>
              <TableCell align="center" className='w-30 dark:text-gray-200 dark:bg-slate-950'>type</TableCell>
              <TableCell align="center" className='w-30 dark:text-gray-200 dark:bg-slate-950'>Description</TableCell>
              <TableCell align="center" className='w-30 dark:text-gray-200 dark:bg-slate-950'>Link</TableCell>
              <TableCell colSpan="2" align="center" className='w-30 dark:text-gray-200 dark:bg-slate-950 text-center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='w-full dark:bg-slate-950'>
            {
              isLoading ? <TableRow><TableCell colSpan={9}><div className="flex items-center justify-center w-full"><div className="custom-loader"></div></div></TableCell></TableRow>
                : error ? <TableRow><TableCell colSpan={9}><div className="flex items-center justify-center w-full"><div className="text-red-700">somthing went wrong!</div></div></TableCell></TableRow>
                  : data?.section.map((row, index) => (
                    <TableRow
                      key={row._id}>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950'>{row._id}</TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950' ><input name="title" className="dark:bg-slate-700 h-12 border-2 rounded-md p-2" type="text" defaultValue={row.title} onChange={(e) => handlechange(e, index)} /> </TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950' >
                        <select value={Chapters ? Chapters[index].type : null} onChange={(e) => handlechange(e, index)} className="dark:bg-slate-700 h-12 border-2 rounded-md p-2" name="type">
                          <option className="dark:bg-slate-900 text-lg text-center" value="free">free</option>
                          <option className="dark:bg-slate-900 text-lg text-center" value="premium">premium</option>
                        </select>
                      </TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950 '><textarea name="descreption" className="dark:bg-slate-700 h-12 border-2 rounded-md p-2 hover:h-24" rows={3} cols={30} defaultValue={row.descreption} onChange={(e) => handlechange(e, index)} /></TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950 '><input name="youtubeLink" className="dark:bg-slate-700 h-12 border-2 rounded-md p-2" type="text" defaultValue={`${row.youtubeLink}`} onChange={(e) => handlechange(e, index)} /></TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950  '><button className="border-2 rounded-md border-purple-600 p-3" onClick={(e) => showUpdatePopup(e, index)}>update</button> </TableCell>
                      <TableCell className=' dark:text-gray-200 dark:bg-slate-950  '><button className="border-2 rounded-md border-orange-600 p-3" onClick={(e) => showConfirmationPopup(e, row._id)}>delete</button> </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex flex-col items-center justify-center dark:text-slate-200">
        <label className="font-bold text-2xl py-7  ">ADD CHAPTER HERE</label>
        <div className="flex flex-wrap m-7 border-2 rounded-md items-center justify-center">
          <div className=" flex-col flex items-start m-4 w-full lg:w-2/5">
            <label className="font-bold text-lg "> Title</label>
            <input type="text" name="title" className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full  rounded-md text-lg" placeholder="I.E ROBOTICSqwsc" onChange={handleAddChange} />
          </div>
          <div className=" flex  flex-col items-start m-4 w-full lg:w-2/5">
            <label className="font-bold text-lg">Chapter Description</label>
            <textarea className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" name="descreption" id="" rows="3" onChange={handleAddChange}></textarea>
          </div>
          <div className=" flex-col flex items-start m-4 w-full lg:w-2/5">
            <label className="font-bold text-lg">Youtube link</label>
            <input type="text" name="youtubeLink" className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full  rounded-md text-lg" placeholder="https://www.youtube.com/embed/GVGeTshQ7iU" onChange={handleAddChange} />
          </div>
          <div className=" flex-col flex items-start m-4 w-full lg:w-2/5">
            <label className="font-bold text-lg">Course Type</label>
            <select id="selectInputchapter" value={Addchapters.type} onChange={handleAddChange} className="dark:bg-slate-800 border-b-2 dark:border-gray-500  p-3 px-1 w-full rounded-md text-lg" name="type">
              <option className="dark:bg-slate-900 text-lg text-center" value="free">free</option>
              <option className="dark:bg-slate-900 text-lg text-center" value="premium">premium</option>
            </select>
          </div>
        </div>
        <button className=" rounded-md h-16 bg-slate-400 dark:text-orange-600 dark:bg-slate-800 dark:border-orange-600 text-slate-200  p-3 w-[200px] px-12 border-2 hover:shadow-md hover:text-slate-100 mx-4 sm:mx-14 mb-4" onClick={(e) => ShowPopupADD(e)}>Add Chapter</button>
      </div>
      <div className="absolute top-1/3 left-1/3 ">
        {showPopupdelete && (
          <Popup onConfirm={(e) => handelDelete(e, deletedId)} onCancel={() => setShowPopupdelete(false)} message={"Do You Want To Delete This Item ?"} />
        )}
        {showConfPopupdelete && (
          <ConfirmationPopup onCancel={() => setShowConfPopupdelete(false)} confmessage={"Item Deleted successfully"} />
        )}
      </div>
      <div className="absolute top-1/3 left-1/3">
        {showPopup && (
          <Popup onConfirm={(e) => handleUpdateSubmit(e, ChapterIndex)} onCancel={() => setShowPopup(false)} message={"Do You Want To Update This Chapter ?"} />
        )}
        {showConfPopup && (
          <ConfirmationPopup onCancel={() => setShowConfPopup(false)} confmessage={"Chapter Updated successfully"} />
        )}

      </div>
      <div className="absolute top-1/2 left-1/3">
        {showPopupADD && (
          <Popup onConfirm={(e) => handleChapterSubmit(e)} onCancel={() => setShowPopupADD(false)} message={"Do You Want To Add This Chapter ?"} />
        )}
        {showConfPopupADD && (
          <ConfirmationPopup onCancel={() => setShowConfPopupADD(false)} confmessage={"Chapter Added successfully"} />
        )}

      </div>
    </div>
  )
}
export default Chapters