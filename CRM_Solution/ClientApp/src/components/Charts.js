import React, { useEffect, useState, useRef } from 'react';
import { Form, FormGroup, Input, Label, Alert, UncontrolledAlert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import authService from './api-authorization/AuthorizeService'
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserManager } from 'oidc-client';
import { Doughnut,Pie, Line, Bar,Chart, PolarArea,Scatter  } from 'react-chartjs-2';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler
     } from 'chart.js';

import { faker } from '@faker-js/faker'

ChartJS.register(ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    Filler,
    RadialLinearScale
    
);

export function DoughnutComp({data}) {
    return (
        <Doughnut data={data} />   
    ); 
}

export function PieComp({data}){
    return(
        <>
            <Pie data={data} />
        </>
        
    )

}

export function BarComp(props){
    const labels =  ['January', 'February', 'March', 'April'];
    const barData = {
        labels,
        datasets: [
            {
                label: 'sdf',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 100})),
                backgroundColor: '#D7CEEB',
                cubicInterpolationMode: 'monotone',
             
            },
            {
                label: 'adfasdf',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 100})),
                backgroundColor: '#584585',
                cubicInterpolationMode: 'monotone',
             
            },
            {
                label: 'sdf',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                backgroundColor: '#D7CEEB',
                cubicInterpolationMode: 'monotone',
             
            },
            {
                label: 'ads',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                backgroundColor: '#C6ADFF',
                cubicInterpolationMode: 'monotone',
             
            }
           
        ],
    };
    const barOptions = {
        maintainAspectRatio:false,
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                display: false
            },
            title: {
                display: false,
                text: 'Sales This Year',
            },
        },
       
      
    };
    
    return(
        <Bar data={barData} options={barOptions}/>
    )
};

export function LineComp(props){
    const lineOptions = {
        maintainAspectRatio:false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: '',
            },
            }
        
    };

    const labels =  ['January', 'February', 'March','January'];  
    let lineData= {
        labels,
        datasets: [
            {
                fill: false,
                label: 'January',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: '#9484B8',
                backgroundColor: '#F0F0F0',
                cubicInterpolationMode: 'monotone',
                },

                {
                fill: false,
                label: 'February',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: '#D7CEEB',
                backgroundColor: '#F0F0F0',
                cubicInterpolationMode: 'monotone',
                },
                {
                fill: false,
                label: 'March',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: '#C6ADFF',
                backgroundColor: '#F0F0F0',
                cubicInterpolationMode: 'monotone',
                },
                {
                fill: false,
                label: 'January',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: '#C6ADFF',
                backgroundColor: '#F0F0F0',
                cubicInterpolationMode: 'monotone',
                }
            
            
            ]
    };

    return (
            <Line data={lineData} options={lineOptions} />
            
    )

}

export function AreaComp(props){
    const options = {
    maintainAspectRatio:false,
    responsive: true,
    
    plugins: {
        legend: {
         position: 'top',
         display:false
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
    };
      
      const labels = ['433', '434', '435', '436'];
      
    const data = {
    labels,
    datasets: [
        {
        fill: true,
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1 })),
        borderColor: '#2b1a52',
     
        cubicInterpolationMode: 'monotone',
    
        },
    ],
    };
    return(
        <Line options={options} data={data} />
    )
}

export function PolarAreaComp(props){

    const data = {
        labels: ['T-indexes inout'],
        datasets: [
          {
            label: '',
            data: [70, 89, 78,25, 86],
            backgroundColor: [
                '#D7CEEB',
                '#C6ADFF',
                '#F2F2F2',
                '#9484B8',
                '#584585'
            ],
            borderWidth: 0,
          },
        ],
    };

    const options = {
        maintainAspectRatio:true,
        responsive: true,
        plugins: {
            legend: {
             position: 'bottom',
             display:false
            },
            title: {
                display: false,
                text: '',
            },
        },
        };
    

    return (
        <PolarArea data={data} options={options} />
    )

}

export function ScatterComp(props){

    const options = {
        maintainAspectRatio:false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        }
       
    };
      
    const data = {
        datasets: [
          {
            label: 'IPNM Fed Data',
            data: Array.from({ length: 100 }, () => ({
              x: faker.datatype.number({ min: -20, max: 50 }),
              y: faker.datatype.number({ min: -20, max: 20 }),
            })),
            backgroundColor: '#F2F2F2',
          },
        ],
    };

    return (
        <Scatter options={options} data={data} />
    )

}


    




// export function Dashboard(props) {
//     const [graphData, setGraphData] = useState([]);

//    //Pie
//     const pieData = {
//         labels: [],
//         datasets: [
//             {
//                 label: 'Portion of Total Sales:',
//                 data: [4, 9, 3],
//                 backgroundColor: [
//                     '#D7CEEB',
//                     '#C6ADFF',
//                     '#F2F2F2'
                    
                  
//                 ],
//                 // borderColor: [
//                 //    'rgba(255, 99, 132, 1)',
//                 //    'rgba(54, 162, 235, 1)',
//                 //    'rgba(255, 206, 86, 1)'
                   
//                 // ],
//                 borderWidth: 0,
//             },
//         ],
        
//             title: {
//                 display: false,
//                 text: 'Sales This Year',
//             },
       
//     };
//    // Doughnut
//     const doughnutData = {
//         // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [
//           {
//             label: '# of Votes',
//             data: [12, 19, 3, 5,4],
//             backgroundColor: [
//                 '#D7CEEB',
//                 '#C6ADFF',
//                 '#F2F2F2',
//                 '#9484B8',
//                 '#584585'

//             ],
//             borderWidth: 0,
//             updateMode:"active",
//             redraw: true
//           },
//         ],
//       };

  

//    // Bar
//     const labels =  ['January', 'February', 'March', 'April'];
//     const barData = {
//         labels,
//         datasets: [
//             {
//                 label: 'sdf',
//                 data: labels.map(() => faker.datatype.number({ min: 0, max: 100})),
//                 backgroundColor: '#D7CEEB',
//                 cubicInterpolationMode: 'monotone',
             
//             },
//             {
//                 label: 'adfasdf',
//                 data: labels.map(() => faker.datatype.number({ min: 0, max: 100})),
//                 backgroundColor: '#584585',
//                 cubicInterpolationMode: 'monotone',
             
//             },
//             {
//                 label: 'sdf',
//                 data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
//                 backgroundColor: '#D7CEEB',
//                 cubicInterpolationMode: 'monotone',
             
//             },
//             {
//                 label: 'ads',
//                 data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
//                 backgroundColor: '#C6ADFF',
//                 cubicInterpolationMode: 'monotone',
             
//             }
           
//           ],
//     };
//     const barOptions = {
//         maintainAspectRatio:false,
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'right',
//                 display: false
//             },
//             title: {
//                 display: false,
//                 text: 'Sales This Year',
//             },
//         },
       
      
//     };

//     // Line

//     const lineOptions = {
//         maintainAspectRatio:false,
//         responsive: true,
//         plugins: {
//             legend: {
//               position: 'top',
//               display: false,
//             },
//             title: {
//               display: false,
//               text: 'Chart.js Line Chart',
//             },
//           }
       
//     };

//     const lineLabels =  ['January', 'February', 'March','January'];

//     const lineData = {
//         labels,
//         datasets: [
//             {
//                 fill: false,
//                 label: 'Dataset 2',
//                 data: lineLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//                 borderColor: '#9484B8',
//                 backgroundColor: '#F0F0F0',
//                 cubicInterpolationMode: 'monotone',
//               },

//               {
//                 fill: false,
//                 label: 'Dataset 2',
//                 data: lineLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//                 borderColor: '#D7CEEB',
//                 backgroundColor: '#F0F0F0',
//                 cubicInterpolationMode: 'monotone',
//               },
//               {
//                 fill: false,
//                 label: 'Dataset 2',
//                 data: lineLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//                 borderColor: '#C6ADFF',
//                 backgroundColor: '#F0F0F0',
//                 cubicInterpolationMode: 'monotone',
//               }
           
          
//           ]
//     };


 



//     // useEffect(() => {
//     //     const token = authService.getAccessToken();
//     //     fetch('/api/graph', {
//     //         headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
//     //     })
//     //         .then(response => {
//     //             if (response.ok) {
//     //                 return response;
//     //             } else {
//     //                 const error = new Error(`Error ${response.status}: ${response.statusText}`);
//     //                 error.response = response;
//     //                 //setError(error)
//     //                 throw error;
//     //             }
//     //         })
//     //         .then(res => res.json())
//     //         .then(res => {
//     //             setGraphData(res)
//     //         })
//     //         .catch(error => { console.log('Error: ', error.message) })


//     // }, [])

    
//     return (
//         <>
//             {/* <h3 className="pageTitle"> Dashboard</h3> */}
          
//                 <div className="row gx-md-3 gx-1">
//                     <div className="col col-md-2 mt-sm-1 ">
//                         <div class="chartCard d-flex justify-content-center ">
//                             <Doughnut data={doughnutData} />    
//                         </div>
//                     </div>
//                     <div className="col col-md-2" >
//                         <div class="chartCard d-flex justify-content-center ">
//                             <Doughnut data={doughnutData} />
//                         </div>
//                     </div>
//                     <div className="col col-md-3 ">
//                         <div class="chartCard d-flex justify-content-center ">
//                             <Bar data={barData} options={barOptions} />
//                         </div> 
//                     </div>
//                     <div className="col col-md-3 ">
//                         <div class="chartCard d-flex justify-content-center ">
//                             <Line data={lineData} options={lineOptions} />
//                         </div> 
//                     </div>
//                     <div className="col col-md-2 ">
//                         <div class="chartCard d-flex justify-content-center ">
//                         <Pie data={pieData} />
                           
//                         </div> 
//                     </div>
//                 </div>
//                 <div className='row'>
//                     <div className="col col-md-7 ">
//                         <div class="chartCard d-flex justify-content-center ">
//                             <Line data={lineData} options={lineOptions} />
//                         </div> 
//                     </div>
//                     <div className="col col-md-3 ">
//                         <div class="chartCard d-flex justify-content-center ">
//                             <Line className='' data={lineData} options={lineOptions} />
//                         </div> 
//                     </div>
//                     <div className="col col-md-1 ">
//                         <div class="chartCard d-flex justify-content-center ">
//                             <Line data={lineData} options={lineOptions} />
//                         </div> 
//                     </div>
//                     <div className="col col-md-1 ">
//                         <div class="chartCard d-flex justify-content-center ">
//                             <Line data={lineData} options={lineOptions} />
//                         </div> 
//                     </div>
                   
//                 </div>
               
             
//                  {/* <div class="container">
//                     <div class="row gx-5">
//                         <div class="col">
//                             <div class="bg-light">Custom column padding</div>
//                         </div>
//                         <div class="col">
//                             <div class="bg-light">Custom column padding</div>
//                         </div>
//                     </div>
//                 </div> */}
               
               
            
            
//         </>
//     )
// } 

