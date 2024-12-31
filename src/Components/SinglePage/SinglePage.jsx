import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SinglePage.css';
import { Button } from '@mui/material';
import {useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';

const SinglePage = () => {
    const navigate = useNavigate()
    const { user_id } = useParams();
    const [userData,setUserData] = useState({})
    const EditDetails = (id) => {
        navigate(`/users/update/${id}`)
    
      }

    useEffect(()=>{
        fetch('http://localhost:8000/userRows/'+ user_id)
        .then((res)=> res.json())
        .then((data)=>{
           setUserData(data)
           console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },[])
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
  return (
   <div>
    {
        userData && (
                <div className="single">
                    <div className="view">
                        <div className="topInfo">
                            <div className="info">
                                <img src="" alt="" />
                                <h1>{userData.userName}</h1>
                                <div className="update">
                                    <Button variant="contained" onClick={()=>EditDetails(user_id)}>Update</Button>
                                </div>
                            </div>
                        </div>
                        <div className="details">
                            <div className="item">
                                <div className="itemTitle">ID:</div>
                                <div className="itemValue">{userData.id}</div>
                            </div>
                            <div className="item">
                                <div className="itemTitle">UserName:</div>
                                <div className="itemValue">{userData.userName}</div>
                            </div>
                            <div className="item">
                                <div className="itemTitle">Email:</div>
                                <div className="itemValue">{userData.email}</div>
                            </div>
                            <div className="item">
                                <div className="itemTitle">Phone:</div>
                                <div className="itemValue">{userData.phone}</div>
                            </div>
                            <div className="item">
                                <div className="itemTitle">Status:</div>
                                <Button variant='contained' className="itemValue">{userData.status}</Button>

                            </div>
                        </div>
                        <div className="chart">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="activities">
                        <h2>Latest Activites</h2>
                        <ul>
                            <li>
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    <time>3 days ago</time>
                                </div>
                            </li> <li>
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    <time>3 days ago</time>
                                </div>
                            </li> <li>
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    <time>3 days ago</time>
                                </div>
                            </li> <li>
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    <time>3 days ago</time>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        
        }
   </div>
    
  )
}

export default SinglePage
