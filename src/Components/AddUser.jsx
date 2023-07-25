import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { addUser, getAllUsers } from '../Store/Slices/UserSlice';
import {useNavigate} from 'react-router-dom';

export default function AddUser() {
    const [user,setuser]=useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function getUserData(e){
        const name = e.target.name
        const value = e.target.value
        setuser({
            ...user,
            [name]:value
        })
    }
    function handleSubmit(e){
        // e.preventDefault()
        dispatch(addUser(user))
        dispatch(getAllUsers())
        navigate("/")
    }
    return (
        <>
            <div className="container-fluid w-50 m-auto my-3">
            <h4 className='text-center text-light bg-success p-2 mt-2'>Add User</h4>
                <form onSubmit={handleSubmit} autoComplete="on">
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" required onChange={getUserData} id="name" name='name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" required onChange={getUserData} id="username" name='username' />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" required onChange={getUserData} id="phone" name='phone' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email<span className='text-danger'>*</span></label>
                                <input type="email" className="form-control" required onChange={getUserData} id="email" name='email' />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" required onChange={getUserData} id="address" name="address" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" required onChange={getUserData} id="city" name='city' />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="pin" className="form-label">Pin<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" required onChange={getUserData} id="pin" name="pin" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" required onChange={getUserData} id="state" name='state' />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password<span className='text-danger'>*</span></label>
                                <input type="password" className="form-control" required onChange={getUserData} id="password" name="password" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success p-2 mb-4 w-100">Add User</button>
                </form>
            </div>
        </>
    )
}
