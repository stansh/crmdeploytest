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
    Title
    } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'

ChartJS.register(ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);





export function Dashboard(props) {

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 10,
            },
        ],
    };
    const data2 = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };


    useEffect(() => {
       // setLoading(true)
        const token = authService.getAccessToken();

        //authService.getUser().then(res => setUser(res))
        //console.log(user)

        fetch('/api/GraphController', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (response.ok) {
                    //setLoading(false);
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                   // setError(error)
                    throw error;
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);

            })
            .catch(error => { console.log('Error: ', error.message) })


    }, [])


    return (
        <>

            <h3> Dashboard</h3>
            <div className="row">
                <div className="col-5">
                    <Pie data={data}  />
                </div>
                <div className="col-5">
                    <Bar options={options} data={data2}  />
                </div>
               
                

            </div>
            
        </>
    )
}