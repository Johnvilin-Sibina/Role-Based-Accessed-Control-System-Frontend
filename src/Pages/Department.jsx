import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setDepartmentId } from '../Redux/Slice/departmentSlice';


const Department = () => {
    const [departments,setDepartments] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {departmentId} = useSelector((state)=>state.department)
    const [deleteDepartment,setDeleteDepartment] = useState([])

    //Fetch when the component is mounting
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async()=>{
        try {
            await axios.get('http://localhost:5000/api/department/get-departments')
            .then((res)=>{
                toast.success(res.data.message)
                setDepartments(res.data.result)
            })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    //Function to navigate to create page
    const handleClick = ()=>{
        navigate('/createdepartment')
    }

    const handleEdit = (id)=>{
      dispatch(setDepartmentId(id))
      navigate(`/editdepartment/${departmentId}`)
    }

    //Function to handle delete
    const handleDelete = async(id)=>{
      try {
        dispatch(setDepartmentId(id))
      await axios.delete(`http://localhost:5000/api/department/delete-department/${departmentId}`)
      .then((res)=>{
        toast.success(res.data.message)
        setDeleteDepartment(res.data)
      })
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    //Fetch whenever a department is deleted
    useEffect(()=>{
      fetchData()
    },[deleteDepartment])
    return (
        <>
      <h1 className="text-center">Departments</h1>
      <div className="table-responsive">
        <table className="table text-center shadow">
          <thead>
            <tr className="shadow">
              <th className="shadow">Department Name</th>
              <th className="shadow">Description</th>
              <th colSpan="2" className="shadow">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => {
              return (
                <tr key={department._id} className="shadow">
                  <td className="shadow">{department.departmentName}</td>
                  <td className="shadow">{department.description}</td>
                  <td className="shadow">
                    <button className="btn btn-outline-info" onClick={()=>handleEdit(department._id)}>Edit</button>
                  </td>
                  <td className="shadow">
                    <button className="btn btn-outline-danger" onClick={()=>handleDelete(department._id)}>Delete</button>
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

export default Department;