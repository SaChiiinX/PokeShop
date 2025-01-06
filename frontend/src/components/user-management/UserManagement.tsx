import './user_m.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { User } from '../../interfaces/user';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authContext } from '../../App';


function User_m() {
    const auth = useContext(authContext)
    const [userList, setUserList] = useState<User[] | null>([])
    const [showModal,setShowModal] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<User>(
        { userId: null,
        username: "",
        password: "",
        role: "",
        coins: 0,
        lastLogin: null
    })

    const getUserList = ()=>{
        axios.get("http://localhost:8080/users")
        .then((res)=>setUserList(res.data))
        .catch((err)=>console.log("Cannot get user list due to " + err.message))
    }

    // Delete a user
  const handleUserDelete = (event: SyntheticEvent<HTMLButtonElement>) => {
    const userId = event.currentTarget.getAttribute('data-id');
    axios
      .delete(`http://localhost:8080/users/deleteUser/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setUserList((prevList) => prevList?.filter((p) => p.userId !== Number(userId)) || null);
        } else {
          alert('From backend, unexpected error while deleting the user id ' + userId);
        }
      })
      .catch((err) => {
        alert('Unexpected error while deleting the user, user ' + err.message);
      });
  };

   // Open Add modal
   const handleAdd = () => {
    setFormData({ userId:null, username: '', password: '', role: '', lastLogin: null, coins: 0 });
    setIsEditing(false);
    setShowModal(true);
  };

  // Open Edit modal
  const handleEdit = (event: SyntheticEvent<HTMLButtonElement>) => {
    const userId = event.currentTarget.getAttribute('data-id');
    const userToEdit = userList?.find((p) => p.userId === Number(userId));

    if (userToEdit) {
      setFormData(userToEdit);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  // Handle form input changes
  const handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  // Submit the form (Add or Edit)
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (isEditing) {
      console.log(formData)
      axios
        .put(`http://localhost:8080/users/edituser`, formData)
        .then(() => {
          getUserList();
          setShowModal(false);
        })
        .catch((err) => {
          alert('From backend, cannot edit the user: ' + err.message);
        });
    } else {
      axios
        .post('http://localhost:8080/users/register', formData)
        .then(() => {
          getUserList();
          setShowModal(false);
        })
        .catch((err) => {
          alert('Error while adding the user: ' + err.message);
        });
    }
  };
  
  
  useEffect(()=>getUserList(), []);

  return (
    <div className="listContainer">

        {auth?.role === "ADMIN" && <div id="userList" className="list">
            <h3>User Management(can edit user name and role below)</h3>
            <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">UserID</th>
              <th scope="col">User Name</th>
              <th scope="col">Role</th>
              <th scope="col">Coin</th>
              <th scope="col">Last Login</th>
              <th scope="col">Add</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            {userList?.map((user) => (
              <tr key={user.userId}>
                <th scope="row">{user.userId}</th>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.coins}</td>
                <td>{user.lastLogin?.toString()}</td>
                <td>
                  <button className="btn btn-success" onClick={handleAdd} >
                    Add
                  </button>
                </td>
                <td>
                  <button className="btn btn-warning" data-id={user.userId} onClick={handleEdit}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" data-id={user.userId} onClick={handleUserDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>}  
        


        {showModal && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? 'Edit User' : 'Add User'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <label>User Id</label>
                  <input type="number" name="userId" placeholder="userId" value={formData.userId || ''} onChange={handleInputChange} disabled={!isEditing} className="form-control mb-2" required />
                  <label>User name</label>
                  <input type="text" name="username" placeholder="username" value={formData.username || ''} onChange={handleInputChange} className="form-control mb-2" required />
                  <label>Password</label>
                  <input type="text" name="password" placeholder="password" value={formData.password || ''} onChange={handleInputChange} className="form-control mb-2" required />
                  <label>Role</label>
                  <input type="text" name="role" placeholder="role" value={formData.role || ''} onChange={handleInputChange} className="form-control mb-2" />
                  <label>Coins</label>
                  <input type="number" name="coins" placeholder="coins" value={formData.coins || 0} onChange={handleInputChange} className="form-control mb-2" required />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update' : 'Register'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default User_m