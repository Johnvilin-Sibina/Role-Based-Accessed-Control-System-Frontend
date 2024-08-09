import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setRoleId } from '../Redux/Slice/roleSlice';
const Role = () => {
    const [roles,setRoles] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [deleteRole,setDeleteRole] = useState([])

    //Fetch when the component is mounting
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async()=>{
        try {
            await axios.get('http://localhost:5000/api/role/get-roles')
            .then((res)=>{
                toast.success(res.data.message)
                setRoles(res.data.result)
            })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    //Function to navigate to create page
    const handleClick = ()=>{
        navigate('/createrole')
    }

    const handleEdit = (id)=>{
      dispatch(setRoleId(id))
      navigate(`/editrole/${id}`)
    }

    //Function to handle delete
    const handleDelete = async(id)=>{
      try {
      await axios.delete(`http://localhost:5000/api/role/delete-role/${id}`)
      .then((res)=>{
        toast.success(res.data.message)
        setDeleteRole(res.data)
      })
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    //Fetch whenever a role is deleted
    useEffect(()=>{
      fetchData()
    },[deleteRole])
    return (
        <>
      <h1 className="text-center">Roles</h1>
      <div className="table-responsive">
        <table className="table text-center shadow">
          <thead>
            <tr className="shadow">
              <th className="shadow">Role</th>
              <th className="shadow">Responsibilities</th>
              <th colSpan="2" className="shadow">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((ele) => {
              return (
                <tr key={ele._id} className="shadow">
                  <td className="shadow">{ele.role}</td>
                  <td className="shadow">{ele.responsibilities}</td>
                  <td className="shadow">
                    <button className="btn btn-outline-info" onClick={()=>handleEdit(ele._id)}>Edit</button>
                  </td>
                  <td className="shadow">
                    <button className="btn btn-outline-danger" onClick={()=>handleDelete(ele._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      <div className='d-flex justify-content-center'><button className='btn btn-success' onClick={handleClick}>Create</button></div>
      </div>
    </>
    );
};

export default Role;