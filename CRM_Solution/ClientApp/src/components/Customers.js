﻿import React, { useEffect, useState, useRef  } from 'react';
import { Form, FormGroup, Input, Label, Alert, UncontrolledAlert, Button,Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import authService from './api-authorization/AuthorizeService'
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserManager } from 'oidc-client';


export function Customers(props) {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alert2, setAlert2] = useState(false);
    const [alert3, setAlert3] = useState(false);
    const [id, setId] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [street, setStreet] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zipcode, setZipcode] = useState(null);

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);


    //successful add Alert
    const alertToggle = () => {
        
        setAlert(true);
        setTimeout(() => {
            setAlert(false)
        }, "3000");

        setTimeout(() => {
            window.location.reload()
        }, "3500" );

       
    }


    //successful edit Alert
    const alertToggle2 = () => {
        
        setAlert2(true);
        setTimeout(() => {
            setAlert2(false)   
        }, "3000");

        setTimeout(() => {
            window.location.reload()
        }, "3500");
       
       
    }


    //successful delete Alert
    const alertToggle3 = () => {
        setAlert3(true);
        setTimeout(() => {
            setAlert3(false)        
        }, "3000");

        setTimeout(() => {
            window.location.reload()
        }, "3500");
      

    }
    

    const toggle = () => {
        setModal(!modal);
        // const user = authService.getUser();
        //    console.log(user);

        
        //var x = authService.getAccessToken();
        //console.log(x)   

    }

    //edit customer
    const toggle2 = (event) => {
        setModal2(!modal2);
        if (modal2 === false) {
            setId(customers[event.target.id].id);
            let cust = customers[event.target.id];
            setFirstName(cust.firstName);
            setLastName(cust.lastName);
            setEmail(cust.email);
            setPhone(cust.phone);
            setStreet(cust.street);
            setCity(cust.city);
            setState(cust.state);
            setZipcode(cust.zipcode);  
        } 

    };

    //delete customer
    const toggle3 = (event) => {

        setModal3(!modal3);
        if (modal3 === false) {
            setId(customers[event.target.id].id);
        } 

    }



    useEffect(() => {
        setLoading(true)
        const token = authService.getAccessToken();

        //authService.getUser().then(res => setUser(res))
        //console.log(token)

        fetch('/api/customers', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                setLoading(false);
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                setError(error)
                throw error;
            }
        })
        .then(res => res.json())
        .then(res => {
            setCustomers(res);
            
            })
        .catch(error => { console.log('Error: ', error.message) })


    }, [])

    const postCustomer = () => {
        const newCustomerData = {
            firstName: document.querySelector("#addCustomerForm").custFirstName.value,
            lastName: document.querySelector("#addCustomerForm").custLastName.value,
            phone: document.querySelector("#addCustomerForm").custPhone.value,
            email: document.querySelector("#addCustomerForm").custEmail.value,
            street: document.querySelector("#addCustomerForm").custStreet.value,
            city: document.querySelector("#addCustomerForm").custCity.value,
            state: document.querySelector("#addCustomerForm").custState.value,
            zipcode: document.querySelector("#addCustomerForm").custZipcode.value,

        }
        const token = authService.getAccessToken();
        return fetch('/api/customers', {
            method: "POST",
            body: JSON.stringify(newCustomerData),
            headers: !token ? {} : { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json"}
        })
            .then(response => {
                if (response.ok) {
                    return response;

                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    setError(error)
                    throw error;
                }
            })
            .then(() =>{
                toggle();
                alertToggle();
                
                
            })
            .catch(error => { console.log('Error: ', error.message) })
    }

                    
    const editCustomer = (event) => {
        const updatedCustomer = {
            id:id,
            first_name: document.querySelector("#editCustomerForm").custFirstName.value,
            last_name: document.querySelector("#editCustomerForm").custLastName.value,
            phone: document.querySelector("#editCustomerForm").custPhone.value,
            email: document.querySelector("#editCustomerForm").custEmail.value,
            street: document.querySelector("#editCustomerForm").custStreet.value,
            city: document.querySelector("#editCustomerForm").custCity.value,
            state: document.querySelector("#editCustomerForm").custState.value,
            zipcode: document.querySelector("#editCustomerForm").custZipcode.value,

        }
        const token = authService.getAccessToken();
        return fetch(`/api/customers/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedCustomer),
            headers: !token ? {} : { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" }
        })
            .then(response => {
                if (response.ok) {
                    return response;

                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    setError(error)
                    throw error;
                }
            })

            .then(() => {
               
                toggle2();
                setId(null);
                alertToggle2();
               

            })
            .catch(error => { console.log('Error: ', error.message) })
    }


    const deleteCustomer = () => {

 
        const token = authService.getAccessToken();
        return fetch(`/api/customers/${id}`, {
            method: "DELETE",
            body: "",
            headers: !token ? {} : { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" }
        })
            .then(response => {
                if (response.ok) {
                    console.log(response)
                    return response;

                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    setError(error)
                    throw error;
                }
            })

            .then(() => {
                
                toggle3();
                setId(null);
                alertToggle3();
             

            })
            .catch(error => { console.log('Error: ', error.message) })
    }


 
    return (
            <>
                <h3 className = "pageTitle py-1 px-md-2 fs-5 text-center">Customers</h3>
                <div className="row">
                    <div className="col col-md-1">
                        {loading && !error &&  <Spinner className="text-light" children="" />}
                        {error && <h3>{error.message}</h3>}
                        {!error && <button className="w-100 py-4 py-md-1 fs-md-6" onClick={toggle}>Add Customer</button>}
                        <Alert color="info" isOpen={alert} toggle={alertToggle} fade={true}>New customer successfully added!</Alert>
                        <Alert color="info" isOpen={alert2} toggle={alertToggle2} fade={true}>Customer updated!</Alert>
                        <Alert color="info" isOpen={alert3} toggle={alertToggle3} fade={true}>Customer deleted succerfully.</Alert>
                    </div>
                </div>  

                

                <div className="row">
                    <div className="table-responsive">
                        <table className="tableClass table table-hover table-borderless mt-2 w-100" aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th colSpan={2}></th>

                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer,index) =>
                                    <tr key={index}>
                                        <td>{customer.first_name} {customer.last_name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.street}, {customer.city}, {customer.state} {customer.zipcode}</td>
                                        <td><button className="fs-6" onClick={toggle2}><i class="bi bi-pencil-fill" id={index}></i></button></td>
                                        <td><button className="fs-6" onClick={toggle3}><i class="bi bi-trash" id={index}></i></button></td>

                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    

                </div>
                
                <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader closeButton>
                        New Customer
                            </ModalHeader>
                        <ModalBody>
                            <Form id="addCustomerForm">
                                <FormGroup>
                                    <Label for="custFirstName">
                                        First Name
                                    </Label>
                                    <Input
                                        id="custFirstName"
                                        name="firstName"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custLastName">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="custLastName"
                                        name="lastName"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custPhone">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="custPhone"
                                        name="custPhone"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custEmail">
                                        Email
                                    </Label>
                                    <Input
                                        id="custEmail"
                                        name="custEmail"
                                        placeholder=""
                                        type="email"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custStreet">
                                        Street
                                    </Label>
                                    <Input
                                        id="custStreet"
                                        name="ccustStreet"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custCity">
                                        City
                                    </Label>
                                    <Input
                                        id="custCity"
                                        name="custCity"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custState">
                                        State
                                    </Label>
                                    <Input
                                        id="custState"
                                        name="custState"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custZipcode">
                                        Zipcode
                                    </Label>
                                    <Input
                                        id="custZipcode"
                                        name="custZipcode"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
            
                            </Form>

                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={postCustomer}>
                                Submit
                            </Button>
                            <Button variant="primary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                </Modal>
                <Modal isOpen={modal2} toggle={toggle2} id="editCustModal">
                    <ModalHeader closeButton>
                        Edit Customer Information
                    </ModalHeader>
                    <ModalBody className="row" >
                        <div id="currentCustData" className="col-5"  >
                            <h6><i>Name: </i><br/>{firstName} {lastName}</h6>
                            <h6><i>Phone: </i><br />{phone}</h6>
                            <h6><i>E-mail: </i><br />{email}</h6>
                            <h6><i>Address: </i><br />{street}, {city}, {state} {zipcode}</h6>

                            
                        </div>
                        <div className="col">
                            <Form id="editCustomerForm" className="d-inline"  >
                                <FormGroup>
                                    <Label for="custFirstName">
                                        First Name
                                    </Label>
                                    <Input
                                        id="custFirstName"
                                        name="firstName"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custLastName">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="custLastName"
                                        name="lastName"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custPhone">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="custPhone"
                                        name="custPhone"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custEmail">
                                        Email
                                    </Label>
                                    <Input
                                        id="custEmail"
                                        name="custEmail"
                                        placeholder=""
                                        type="email"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custStreet">
                                        Street
                                    </Label>
                                    <Input
                                        id="custStreet"
                                        name="ccustStreet"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custCity">
                                        City
                                    </Label>
                                    <Input
                                        id="custCity"
                                        name="custCity"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custState">
                                        State
                                    </Label>
                                    <Input
                                        id="custState"
                                        name="custState"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="custZipcode">
                                        Zipcode
                                    </Label>
                                    <Input
                                        id="custZipcode"
                                        name="custZipcode"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>

                            </Form>
                        </div>
                    

                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={editCustomer}>
                            Submit
                        </Button>
                        <Button variant="primary" onClick={toggle2}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modal3} toggle={toggle3} id="deleteCustModal">
                    <ModalHeader closeButton>
                        Delete Customer
                    </ModalHeader>
                    <ModalBody className="row" >
                    
                            <h6>Are you sure that you want to delete the customer?</h6>

                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={deleteCustomer}>
                            Delete
                        </Button>
                        <Button variant="primary" onClick={toggle3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </>
    )





}

//export default Customers;
