import React, { useEffect, useState, useRef } from 'react';
import { Form, FormGroup, Input, Label, Alert, UncontrolledAlert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import authService from './api-authorization/AuthorizeService'
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserManager } from 'oidc-client';

import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    Filler } from 'chart.js';


import { Pie, Bar, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'

ChartJS.register(ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    PointElement,
    LineElement,
    Filler);





export function Dashboard(props) {
    const [graphData, setGraphData] = useState([]);

   //pie
    const pieData = {
        
        labels: ['Product 1', 'Product 1', 'Product 3'],
    
        datasets: [
            {
                label: 'Portion of Total Sales:',
                data: [12, 19, 3],
                backgroundColor: [
                    '#E6853099',
                    '#027D9999',
                    '#FFA14F99'
                    
                  
                ],
                //borderColor: [
                //    'rgba(255, 99, 132, 1)',
                //    'rgba(54, 162, 235, 1)',
                //    'rgba(255, 206, 86, 1)'
                   
                //],
                borderWidth: 2,
            },
        ],
        
            title: {
                display: true,
                text: 'Sales This Year',
            },
       
    };

  

    //bar
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const barData = {
        labels,
        datasets: [
            {
                fill: true,
               // label: 'Dataset 2',
                /*data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),*/
                data: graphData.map(dSet => dSet.x),
               // borderColor: 'rgb(53, 162, 235)',
                backgroundColor: '#FFA14FAA',
            },
        ],
    };
    const barOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                display: false
            },
            title: {
                display: true,
                text: 'Sales This Year',
            },
        },
    };

    //line

    const lineOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Top Selling 3 Products',
            },
        },
    };

    //const labels2 = ['January', 'February', 'March', 'April', 'May', 'June'];

    const lineData = {
        labels,
        datasets: [
            {
                label: 'Product 1',
                data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
                borderColor: '#995011FF',
                backgroundColor: '#99501122',
            },
            {
                label: 'Product 2',
                data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
                borderColor: '#027D99ff',
                backgroundColor: '#027D9922',
            },
            {
                label: 'Product 3',
                data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
                borderColor: '#47E6AAff',
                backgroundColor: '#47E6AA22',
            },


        ],
    };


    //line 2

    const lineOptions2 = {
   
        
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Annual Sales History ',
            },
        },
    };

   

    const lineData2 = {
        labels,
        datasets: [
           
            {
                fill: true,
                label: '2021',
                data: labels.map(() => faker.datatype.number({ min: 50000, max: 55000})),
                borderColor: '#47E6AA33',
                backgroundColor: '#47E6AA11',

            },
            {
                fill: true,
                label: '2022',
                data: labels.map(() => faker.datatype.number({ min: 50000, max: 55000 })),
                borderColor: '#99501122',
                backgroundColor: '#99501122',

            },
            {
                fill: true,
                label: '2023',
                data: labels.map(() => faker.datatype.number({ min: 50000, max: 55000 })),
                borderColor: '#027D99ff',
                backgroundColor: '#027D9944',

            },
        ],
    };




    useEffect(() => {
        const token = authService.getAccessToken();


        fetch('/api/graph', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    //setError(error)
                    throw error;
                }
            })
            .then(res => res.json())
            .then(res => {
                setGraphData(res)
            })
            .catch(error => { console.log('Error: ', error.message) })


    }, [])

    
    return (
        <>

            <h3 className="pageTitle"> Dashboard</h3>
            <div className="row ml-5 ml-2">
                <div className="col-lg-2 mx-5">
                    <Pie data={pieData}  />
                </div>
                <div className="col-lg-2 mx-5">
                    <Bar options={barOptions} data={barData}  />
                </div>
                <div className="col-lg-2 mx-5" >
                    <Line options={lineOptions} data={lineData} />
                </div>
            </div>
            <div className="row mt-5" >
                <div className="col-lg-8" >
                    <Line options={lineOptions2} data={lineData2} />
                </div>


            </div>
            
        </>
    )
} 