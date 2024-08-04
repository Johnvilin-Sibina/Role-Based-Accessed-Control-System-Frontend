import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const [resdata,setResData] = useState([])
    useEffect(()=>{
fetchData()
    },[])
const {currentUser} = useSelector((state)=>state.employee)
    const fetchData = async()=>{
        await axios.get('http://localhost:5000/api/get-emp',{
            //For header method
            // headers:{
            //     Authorization:token
            // }
            //For bearer method
            headers:{
                'Content-Type':'application/json',//This line is optional
                'Authorization':`Bearer ${currentUser.token}`
            }
        })
        .then((res)=>{
            setResData(res.data.data)
            toast.success(res.data.message)
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.response.data.message)
        })
    }
    return (
        <div>
            <Header />
            <Sidebar />
        </div>
    );
};

export default Dashboard;