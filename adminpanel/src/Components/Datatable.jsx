import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from 'react';
import { makeRequest } from '../axios';
import Popup from './Popup';
import ConfirmationPopup from './ConfirmationPopup'; 


const Datatable = () => {

  const queryClient = useQueryClient();

  const [showConfPopup, setShowConfPopup] = useState(false);
  const [deletedId, setdeletedId] = useState(null)
  const [showPopup, setShowPopup] = useState(false);
  // first popup is set here
  const showConfirmationPopup = (event, id) => {

    event.preventDefault();
    setdeletedId(id)
    setShowPopup(true);
  };

  //second popup is unset here
  const hideConfPopup = () => {
    setShowConfPopup(false);
  };

  const { isLoading, data } = useQuery(["students"], () =>
    makeRequest.get("users/getall").then((res) => {
      return res.data || null;
    })
  );

  const deletemutation = useMutation(
    (deleted) => {
      return makeRequest.delete("users/delete/" + deleted);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["students"]);
      },
    }
  );

  const handelDelete = (e, id) => {
    e.preventDefault();
    deletemutation.mutate(id)
    setdeletedId(null)
    setShowPopup(false)
    setShowConfPopup(true);
  }

  const Usercolumns = [

    { field: 'firstName', headerName: 'First name', width: 120 },
    { field: 'lastName', headerName: 'Last name', width: 120 },
    { field: 'email', headerName: 'Email', width: 170, },
    { field: 'phone', headerName: 'Phone', width: 170, },
    { field: 'paymentStatus', headerName: 'Type', width: 100, },
    { field: 'username', headerName: 'Username', width: 170, },
    { field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160, valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`, },
  ]


  const actionColumn = [{
    field: "action", headerName: "Action", width: 200, sortable: false, renderCell: (params) => {
      return (
        <div className=" flex items-center gap-3 ">
          <Link to={'/students/' + params.row._id} >
            <div className="border-2 rounded-sm text-purple-600 border-purple-600 p-3 pb-1 pt-1 cursor-pointer"><DriveFileRenameOutlineIcon /></div>
          </Link>
          <button className="border-2 rounded-sm text-red-900 border-red-600 p-3 py-1 cursor-pointer" onClick={(e) => showConfirmationPopup(e, params.row._id)}>delete</button>
        </div>
      )
    },
  }]
  return (
    <div className="">
      <div className='overflow-auto w-full flex flex-col dark:border-orange-600'>
        {
          isLoading ? <div className='custom-loader self-center mt-28'></div>
            : <DataGrid
              rows={data || []}
              columns={Usercolumns.concat(actionColumn)}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 9 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              getRowId={row => row._id}
              className='dark:text-gray-400' />
        }
      </div>

      <div className="absolute top-1/2 left-1/2">
        {showPopup && (
          <Popup onConfirm={(e) => handelDelete(e, deletedId)} onCancel={() => setShowPopup(false)} message={"Do You Want To Delete This Item ?"} />
        )}
        {showConfPopup && (
          <ConfirmationPopup onCancel={hideConfPopup} confmessage={"Item Deleted successfully"} />
        )}
      </div>
    </div>
  )
}
export default Datatable