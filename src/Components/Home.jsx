import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers,deleteUser } from '../Store/Slices/UserSlice'
import { Link } from 'react-router-dom'


export default function Home() {
    const dispatch = useDispatch()
    const { users, loading } = useSelector((state) => state.userDetail)
    // console.log(users)
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    return (
        <>
            {
                loading ? <h3 className='text-light text-center p-2 mt-2 bg-success'>Loading...</h3> :
                    <>
                        <h4 className='text-center text-light p-2 mt-4 mb-2 bg-success rounded'>All Users Details</h4>
                        <table className='table table-responsive table-striped table-bordered'>
                            <thead>
                                <tr>
                                    <th className='text-center'>User_Id</th>
                                    <th className='text-center'>Name</th>
                                    <th className='text-center'>Username</th>
                                    <th className='text-center'>Email</th>
                                    <th colSpan={3} className='text-center'>Address</th>
                                    <th className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.city}</td>
                                        <td>{user.pin}</td>
                                        <td>{user.state}</td>
                                        <td>
                                            <Link to={`/updateUser/${user._id}`} className='btn btn-primary mx-1'>Edit</Link>
                                            <button onClick={()=>dispatch(deleteUser(`${user._id}`))} className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
            }
        </>

    )
}
