import React, { useEffect, useState, useRef  } from 'react';
import { Form, FormGroup, Input, Label, Alert, UncontrolledAlert, Button,Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import authService from './api-authorization/AuthorizeService'
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


export function Customers(props) {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alert2, setAlert2] = useState(false);

  
    const alertToggle = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false)
        }, "3000");
    }

    const alertToggle2 = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false)
        }, "3000");
    }
    

    const toggle = () => setModal(!modal);

    useEffect(() => {
        setLoading(true)
        const token = authService.getAccessToken();

        fetch('/api/customers', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                setLoading(false)
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(res => res.json())
        .then(res => setCustomers(res))
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
                    throw error;
                }
            },
                error => { throw error; }
            )

            .then(() =>{
                toggle();
                alertToggle();
                
            })
            .catch(error => { console.log('Error: ', error.message) })
    }


    const editCustomer = (event) => {
        console.log(event)
       // console.log(customers.find(x => x.customerId === int))
        //const newCustomerData = {

        //    customerId
        //    firstName: document.querySelector("#addCustomerForm").custFirstName.value,
        //    lastName: document.querySelector("#addCustomerForm").custLastName.value,
        //    phone: document.querySelector("#addCustomerForm").custPhone.value,
        //    email: document.querySelector("#addCustomerForm").custEmail.value,
        //    street: document.querySelector("#addCustomerForm").custStreet.value,
        //    city: document.querySelector("#addCustomerForm").custCity.value,
        //    state: document.querySelector("#addCustomerForm").custState.value,
        //    zipcode: document.querySelector("#addCustomerForm").custZipcode.value,


        //}
        //const token = authService.getAccessToken();
        //return fetch('/api/customers', {
        //    method: "POST",
        //  /*  body: JSON.stringify(updatedCustomer),*/
        //    headers: !token ? {} : { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" }
        //})
        //    .then(response => {
        //        if (response.ok) {
        //            return response;

        //        } else {
        //            const error = new Error(`Error ${response.status}: ${response.statusText}`);
        //            error.response = response;
        //            throw error;
        //        }
        //    },
        //        error => { throw error; }
        //    )

        //    .then(() => {
        //        toggle();
        //        alertToggle();

        //    })
        //    .catch(error => { console.log('Error: ', error.message) })
    }


    return (
            <>
            <h3>Customers</h3>
            {loading && <Spinner animation="none"/>}
            <Button color="info" onClick={toggle}>Add Cutomer</Button>
            <Alert color="info" isOpen={alert} toggle={alertToggle} fade={true}>New customer successfully added!</Alert>

                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer =>
                            <tr key={customer.customerId}>
                                <td>{customer.firstName} {customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.street}, {customer.city}, {customer.state} {customer.zipcode}</td>
                                <td><Button color="secondary" onClick={editCustomer} value={customer.customerId}>Edit</Button></td>

                            </tr>
                        )}
                    </tbody>
            </table>
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
           

            </>
    )





}

//export default Customers;
