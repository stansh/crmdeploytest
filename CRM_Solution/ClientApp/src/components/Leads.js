import React, { useEffect, useState, useRef } from 'react';
import { Form, FormGroup, Input, Label, Alert, UncontrolledAlert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import authService from './api-authorization/AuthorizeService'
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserManager } from 'oidc-client';


export function Leads(props) {
    const [Leads, setLeads] = useState([]);
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
        }, "3500");


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


    }


    const toggle2 = (event) => {
        setModal2(!modal2);
        if (modal2 === false) {
            setId(Leads[event.target.id].id);
            let lead = Leads[event.target.id];
            setFirstName(lead.firstName);
            setLastName(lead.lastName);
            setEmail(lead.email);
            setPhone(lead.phone);
            setStreet(lead.street);
            setCity(lead.city);
            setState(lead.state);
            setZipcode(lead.zipcode);
        }

    };
    const toggle3 = (event) => {

        setModal3(!modal3);
        if (modal3 === false) {
            setId(Leads[event.target.id].id);
        }

    }



    useEffect(() => {
        setLoading(true)
        const token = authService.getAccessToken();

        //authService.getUser().then(res => setUser(res))
        //console.log(user)

        fetch('/api/leads', {
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
                setLeads(res);

            })
            .catch(error => { console.log('Error: ', error.message) })


    }, [])

    const postLead = () => {


        const newLeadData = {

            firstName: document.querySelector("#addLeadForm").leadFirstName.value,
            lastName: document.querySelector("#addLeadForm").leadLastName.value,
            phone: document.querySelector("#addLeadForm").leadPhone.value,
            email: document.querySelector("#addLeadForm").leadEmail.value,


        }
        const token = authService.getAccessToken();
        return fetch('/api/leads', {
            method: "POST",
            body: JSON.stringify(newLeadData),
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
                toggle();
                alertToggle();


            })
            .catch(error => { console.log('Error: ', error.message) })
    }


    const editLead = (event) => {

        const updatedLead = {
            id: id,
            firstName: document.querySelector("#editLeadForm").leadFirstName.value,
            lastName: document.querySelector("#editLeadForm").leadLastName.value,
            phone: document.querySelector("#editLeadForm").leadPhone.value,
            email: document.querySelector("#editLeadForm").leadEmail.value,
            street: document.querySelector("#editLeadForm").leadStreet.value,
            city: document.querySelector("#editLeadForm").leadCity.value,
            state: document.querySelector("#editLeadForm").leadState.value,
            zipcode: document.querySelector("#editLeadForm").leadZipcode.value,

        }
        const token = authService.getAccessToken();
        return fetch(`/api/leads/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedLead),
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


    const deleteLead = () => {


        const token = authService.getAccessToken();
        return fetch(`/api/leads/${id}`, {
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
            <h3 className="pageTitle">Leads</h3>
            {loading && !error && <Spinner children="" />}
            {error && <h3>{error.message}</h3>}
            {!error && <Button color="secondary" onClick={toggle}>Add Lead</Button>}
            <Alert color="info" isOpen={alert} toggle={alertToggle} fade={true}>New Lead successfully added!</Alert>
            <Alert color="info" isOpen={alert2} toggle={alertToggle2} fade={true}>Lead updated!</Alert>
            <Alert color="info" isOpen={alert3} toggle={alertToggle3} fade={true}>Lead deleted succerfully.</Alert>

            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {Leads.map((lead, index) =>
                        <tr key={index}>
                            <td>{lead.firstName} {lead.lastName}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td><Button color="secondary" className='btn btn-xs' outline onClick={toggle2} id={index}>Edit</Button></td>
                            <td><Button color="danger" className='btn btn-xs' outline onClick={toggle3} id={index}>Delete</Button></td>

                        </tr>
                    )}
                </tbody>
            </table>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader closeButton>
                    New Lead
                </ModalHeader>
                <ModalBody>
                    <Form id="addLeadForm">
                        <FormGroup>
                            <Label for="leadFirstName">
                                First Name
                            </Label>
                            <Input
                                id="leadFirstName"
                                name="firstName"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="leadLastName">
                                Last Name
                            </Label>
                            <Input
                                id="leadLastName"
                                name="lastName"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="leadPhone">
                                Phone Number
                            </Label>
                            <Input
                                id="leadPhone"
                                name="leadPhone"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="leadEmail">
                                Email
                            </Label>
                            <Input
                                id="leadEmail"
                                name="leadEmail"
                                placeholder=""
                                type="email"
                            />
                        </FormGroup>
                       
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={postLead}>
                        Submit
                    </Button>
                    <Button variant="primary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modal2} toggle={toggle2} id="editLeadModal">
                <ModalHeader closeButton>
                    Edit Lead Information
                </ModalHeader>
                <ModalBody className="row" >
                    <div id="currentLeadData" className="col" >
                        <h6><i>Name: </i><br />{firstName} {lastName}</h6>
                        <h6><i>Phone: </i><br />{phone}</h6>
                        <h6><i>E-mail: </i><br />{email}</h6>


                    </div>
                    <div className="col">
                        <Form id="editLeadForm" className="d-inline"  >
                            <FormGroup>
                                <Label for="leadFirstName">
                                    First Name
                                </Label>
                                <Input
                                    id="leadFirstName"
                                    name="firstName"
                                    placeholder=""
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="leadLastName">
                                    Last Name
                                </Label>
                                <Input
                                    id="leadLastName"
                                    name="lastName"
                                    placeholder=""
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="leadPhone">
                                    Phone Number
                                </Label>
                                <Input
                                    id="leadPhone"
                                    name="leadPhone"
                                    placeholder=""
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="leadEmail">
                                    Email
                                </Label>
                                <Input
                                    id="leadEmail"
                                    name="leadEmail"
                                    placeholder=""
                                    type="email"
                                />
                            </FormGroup>

                        </Form>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={editLead}>
                        Submit
                    </Button>
                    <Button variant="primary" onClick={toggle2}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modal3} toggle={toggle3} id="deleteleadModal">
                <ModalHeader closeButton>
                    Delete Lead
                </ModalHeader>
                <ModalBody className="row" >

                    <h6>Are sure that you want to delete the lead?</h6>

                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={deleteLead}>
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


