// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { DataGrid } from '@mui/x-data-grid';
// import "./Home.css";
// const Home = () => {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const fetchUsers = async () => {
//         try {
//           const response = await axios.post("http://localhost:7100/user/list");
//           // Rename _id to id for each user
//           const usersWithId = response.data.data.map(user => ({
//             ...user,
//             id: user._id, // Rename _id to id
//           }));
//           setUsers(usersWithId);  // Set users from backend response
//           setLoading(false);  // Data has been fetched
//         } catch (err) {
//           setError("Failed to load users. Please try again.");
//           setLoading(false);
//         }
//       };
  
//       fetchUsers();
//     }, []); // Empty array ensures this runs only once when component mounts
  
//     if (loading) {
//       return <div>Loading users...</div>;
//     }
  
//     if (error) {
//       return <div>{error}</div>;
//     }
  
//     // Define columns for the DataGrid
//     const columns = [
//         {
//             field: 'id', headerName: 'ID', width: 20,
//             renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
//         },
//         {
//             field: 'name',
//             headerName: 'Name',
//             width: 180,
//             renderCell: (params) => {
//               // Combine first_name and last_name to create the full name
//               return <span>{`${params.row.first_name} ${params.row.last_name}`}</span>;
//             }
//           },
//       { field: 'email', headerName: 'Email', width: 250 },
//       { field: 'phone', headerName: 'Phone', width: 180 },
//     //   { field: 'status', headerName: 'Status', width: 150 },
//     ];
  
//     return (
//       <div className="home-container">
//         <h1>Users List</h1>
//         <div style={{ height: 400, width: '100%' }}>
//           <DataGrid
//             rows={users}
//             columns={columns}
//             pageSize={5}  // Number of rows per page
//             rowsPerPageOptions={[5]}
//             checkboxSelection  // Optional: Allow checkbox selection
//           />
//         </div>
//       </div>
//     );
//   };
  
//   export default Home;
  

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { DataGrid } from '@mui/x-data-grid';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Snackbar } from "@mui/material";
// import "./Home.css";

// const Home = () => {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [openDialog, setOpenDialog] = useState(false);  
//     const [currentUser, setCurrentUser] = useState(null);  
//     const [successMessage, setSuccessMessage] = useState("");  

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.post("http://localhost:7100/user/list");
//                 const usersWithId = response.data.data.map(user => ({
//                     ...user,
//                     id: user._id, 
//                 }));
//                 setUsers(usersWithId);
//                 setLoading(false);
//             } catch (err) {
//                 setError("Failed to load users. Please try again.");
//                 setLoading(false);
//             }
//         };

//         fetchUsers();
//     }, []);

//     if (loading) {
//         return <div>Loading users...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     // Define columns for the DataGrid
//     const columns = [
//         {
//             field: 'id', headerName: 'ID', width: 20,
//             renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
//         },
//         {
//             field: 'name', headerName: 'Name', width: 180,
//             renderCell: (params) => `${params.row.first_name} ${params.row.last_name}`,
//         },
//         { field: 'email', headerName: 'Email', width: 250 },
//         { field: 'phone', headerName: 'Phone', width: 180 },
//         {
//             field: 'actions', headerName: 'Actions', width: 180, renderCell: (params) => {
//                 return (
//                     <>
//                         <Button onClick={() => handleEditClick(params.row)} color="primary">Edit</Button>
//                         {/* <Button onClick={() => handleDeleteClick(params.row._id)} color="secondary">Delete</Button> */}
//                     </>
//                 );
//             }
//         },
//     ];

//     // Handle opening the edit dialog
//     const handleEditClick = (user) => {
//         setCurrentUser(user);
//         setOpenDialog(true);
//     };

//     // Handle closing the dialog
//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setCurrentUser(null);
//     };

//     // Handle form changes in the dialog
//     const handleChange = (e) => {
//         setCurrentUser({
//             ...currentUser,
//             [e.target.name]: e.target.value
//         });
//     };

//     // Handle form submission to update user
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.patch("http://localhost:7100/user/edit", currentUser);
//             setSuccessMessage("User updated successfully!");
//             // Update users list after successful update
//             setUsers(users.map(user => user.id === currentUser.id ? response.data.data : user));
//             handleCloseDialog();
//         } catch (err) {
//             setError("Failed to update user.");
//         }
//     };

//     // Handle delete user
//     const handleDeleteClick = async (userId) => {
//         try {
//             await axios.delete(`http://localhost:7100/user/delete/${userId}`);
//             setUsers(users.filter(user => user.id !== userId));
//             setSuccessMessage("User deleted successfully!");
//         } catch (err) {
//             setError("Failed to delete user.");
//         }
//     };

//     return (
//         <div className="home-container">
//             <h1>Users List</h1>
//             <div style={{ height: 400, width: '100%' }}>
//                 <DataGrid
//                     rows={users}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5]}
//                     checkboxSelection
//                     getRowId={(row) => row._id} 
//                 />
//             </div>

//             {/* Edit User Dialog */}
//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>Edit User</DialogTitle>
//                 <DialogContent>
//                     <form onSubmit={handleSubmit}>
//                         <TextField
//                             label="First Name"
//                             name="first_name"
//                             value={currentUser?.first_name || ''}
//                             onChange={handleChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             label="Last Name"
//                             name="last_name"
//                             value={currentUser?.last_name || ''}
//                             onChange={handleChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             label="Phone"
//                             name="phone"
//                             value={currentUser?.phone || ''}
//                             onChange={handleChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             label="Email"
//                             name="email"
//                             value={currentUser?.email || ''}
//                             onChange={handleChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             label="Status"
//                             name="status"
//                             value={currentUser?.status || ''}
//                             onChange={handleChange}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <DialogActions>
//                             <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
//                             <Button type="submit" color="primary">Save</Button>
//                         </DialogActions>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             {/* Success message Snackbar */}
//             <Snackbar
//                 open={!!successMessage}
//                 autoHideDuration={6000}
//                 onClose={() => setSuccessMessage('')}
//                 message={successMessage}
//             />
//         </div>
//     );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Snackbar } from "@mui/material";
import "./Home.css";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);  
    const [currentUser, setCurrentUser] = useState(null);  
    const [successMessage, setSuccessMessage] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);  // Store user to delete

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.post("http://localhost:7100/user/list");
                const usersWithId = response.data.data.map(user => ({
                    ...user,
                    id: user._id, 
                }));
                setUsers(usersWithId);
                setLoading(false);
            } catch (err) {
                setError("Failed to load users. Please try again.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Define columns for the DataGrid
    const columns = [
        {
            field: 'id', headerName: 'ID', width: 20,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
        },
        {
            field: 'name', headerName: 'Name', width: 180,
            renderCell: (params) => `${params.row.first_name} ${params.row.last_name}`,
        },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 180 },
        {
            field: 'actions', headerName: 'Actions', width: 180, renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => handleEditClick(params.row)} color="primary">Edit</Button>
                    </>
                );
            }
        },
    ];

    // Handle opening the edit dialog
    const handleEditClick = (user) => {
        setCurrentUser(user);
        setOpenDialog(true);
    };

    // Handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentUser(null);
    };

    // Handle form changes in the dialog
    const handleChange = (e) => {
        setCurrentUser({
            ...currentUser,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission to update user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch("http://localhost:7100/user/edit", currentUser);
            setSuccessMessage("User updated successfully!");
            // Update users list after successful update
            setUsers(users.map(user => user.id === currentUser.id ? response.data.data : user));
            handleCloseDialog();
        } catch (err) {
            setError("Failed to update user.");
        }
    };




    return (
        <div className="home-container">
            <h1>Users List</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    getRowId={(row) => row._id} 
                />
            </div>

            {/* Edit User Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            name="first_name"
                            value={currentUser?.first_name || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Last Name"
                            name="last_name"
                            value={currentUser?.last_name || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={currentUser?.phone || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={currentUser?.email || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                       
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                            <Button type="submit" color="primary">Save</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>           

            {/* Success message Snackbar */}
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage('')}
                message={successMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  // Top-right position
            />
        </div>
    );
};

export default Home;
