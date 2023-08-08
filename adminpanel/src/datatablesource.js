//temporary data

export const Userrows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', username:'nueman',email: "nueman@gmail.com" },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', username:'behsir',email: "nueman@gmail.com" },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', username:'sega',email: "nueman@gmail.com" },
    { id: 4, lastName: 'Stark', firstName: 'Arya', username:'chubaw',email: "nueman@gmail.com" },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', username:'drake',email: "nueman@gmail.com"},
    { id: 6, lastName: 'Melisandre', firstName: 'null', username:'wee',email: "nueman@gmail.com" },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', username:'adem',email: "nueman@gmail.com" },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', username:'oke',email: "nueman@gmail.com" },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', username:'nueyyyyman',email: "nueman@gmail.com" },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', username:'nueyyyyman',email: "nueman@gmail.com" },

  ];
   export const Usercolumns=[

    { field: 'id', headerName: 'ID', width: 50 },
  { field: 'firstName', headerName: 'First name', width: 120 },
  { field: 'lastName', headerName: 'Last name', width: 120 },
  {
    field: 'email',
    headerName: 'Email',
    width: 170,
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 0,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
   ]