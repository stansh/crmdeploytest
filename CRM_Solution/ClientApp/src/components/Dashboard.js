import React, { useEffect, useState, useRef } from 'react';
import { Form, FormGroup, Input, Label, Alert, UncontrolledAlert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import authService from './api-authorization/AuthorizeService'
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserManager } from 'oidc-client';
import { Chart } from 'react-chartjs-2';
import { DoughnutComp, PieComp, LineComp, BarComp, AreaComp,PolarAreaComp,ScatterComp} from './Charts';
import { KpiCom } from './Kpi';
import { Products } from './Products';
import { faker } from '@faker-js/faker'




export function Dashboard(props) {
    const [kpiData, setKpiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const barLabels = ['January', 'February', 'March', 'April'];

    const chartData = {
        doughnut1: {
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: '# of Votes',
                data: [4,2,12,66,45],
                backgroundColor: [
                    '#D7CEEB',
                    '#C6ADFF',
                    '#F2F2F2',
                    '#9484B8',
                    '#584585'
    
                ],
                borderWidth: 0,
                updateMode:"active",
                redraw: true,
                
              },
            ],
         
        },
        doughnut2: {
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: '# of Votes',
                data: [44,30,19],
                backgroundColor: [
                    '#D7CEEB',
                    '#C6ADFF',
                    '#F2F2F2',
                    '#9484B8',
                    '#584585'
    
                ],
                borderWidth: 0,
                updateMode:"active",
                redraw: true,
                
              },
            ],
         
        },
        pieData: {
            // labels: ['Merging with SDB','Merging with SDB','Merging with SDB','Merging with SDB'],
            maintainAspectRatio:false,
            datasets: [
                {
                    label: 'Product',
                    data: [22,35,30,14],
                    backgroundColor: [
                        '#D7CEEB',
                        '#C6ADFF',
                        '#F2F2F2',
                        '#584585'
                    ],
        
                    borderWidth: 0,
                },
            ],
            title: {
                display: false,
                text: 'Sales This Year',
            },
        }
       
    }


    useEffect(() => {
        setLoading(true);
        const token = authService.getAccessToken();
        fetch('/api/kpidata', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                setLoading(false);
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
            setKpiData(res)
        })
        .catch(error => { console.log('Error: ', error.message) })

    }, [])

    
    return (
        <>
            {/* <h3 className="pageTitle"> Dashboard</h3> */}
                <div className="row gx-md-2 gx-1 ">
                    {kpiData.map(ds=>
                         <div className="col col-md-2 my-1">
                            <div className="d-flex justify-content-center h-100">
                                {loading &&  <Spinner className="text-dark" children="" />}
                                <KpiCom kpiName={ds.kpiName} kpiValue={ds.kpiValue}/>    
                            </div>
                        </div>
                    )}
                    <div className="col col-md-4 my-1">
                        <div className="d-flex justify-content-center">
                            <div className="areaComp w-100" >
                                <span className="chartName text-dark">Deals & Revenue</span>
                                <AreaComp />
                            </div>
                          
                        </div>  
                    </div>
                </div>
                <div className="row gx-md-3 gx-1">
                    <div className="col col-md-2 my-1 ">
                        <span className="chartName">Top Revenue Channels</span>
                        <div class="chartCard d-flex justify-content-center ">
                            <DoughnutComp data={chartData.doughnut1}/>    
                        </div>
                    </div>
                    <div className="col col-md-2 my-1" >
                        <span className="chartName">Top Products</span>
                        <div class="chartCard d-flex justify-content-center ">
                            <DoughnutComp data={chartData.doughnut2}/>
                        </div>
                    </div>
                    <div className="col col-md-3 my-1 ">
                     <span className="chartName">Monthly Income</span>
                        <div class="chartCard d-flex justify-content-center">
                            <BarComp/>
                        </div> 
                    </div>
                    <div className="col col-md-3 my-1 ">
                        <span className="chartName">Engagement</span>
                        <div class="chartCard d-flex justify-content-center ">
                            <LineComp/>
                        </div> 
                    </div>
                    <div className="col col-md-2 my-1">
                        <span className="chartName">Ongoing Projects</span>
                        <div class="chartCard d-flex justify-content-center ">
                            <PieComp data={chartData.pieData} />                          
                        </div> 
                    </div>
                </div>
                <div className='row'>
                    <div className="col col-md-7 my-1">
                        <span className="chartName">Quarter Sales</span>
                        <div class="chartCard d-flex justify-content-center ">
                            <LineComp />
                        </div> 
                    </div>
                    <div className="col col-md-2 my-1">
                         <span className="chartName">Project Compeletion</span>
                        <div class="chartCard d-flex justify-content-center ">
                            <PolarAreaComp/>
                        </div> 
                    </div>
                    <div className="col col-md-3 my-1">
                        <span className="chartName">Sales By State</span>
                        <div class="chartCard d-flex justify-content-center ">
                            <ScatterComp />
                        </div> 
                    </div>
                    {/* <div className="col col-md-1 my-1">
                        <div class="chartCard d-flex justify-content-center ">
                            <LineComp />
                        </div> 
                    </div> */}
                    <div className="col col-md-12 mt-md-4 ">
                        <div class="">
                            <Products />
                        </div> 
                    </div>
                   
                </div>
               
             
                 {/* <div class="container">
                    <div class="row gx-5">
                        <div class="col">
                            <div class="bg-light">Custom column padding</div>
                        </div>
                        <div class="col">
                            <div class="bg-light">Custom column padding</div>
                        </div>
                    </div>
                </div> */}
               
               
            
            
        </>
    )
} 