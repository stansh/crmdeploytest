import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Col, Button} from 'reactstrap';

import authService from './api-authorization/AuthorizeService'
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


//export class qqCustomers extends Component {
//    static displayName = Customers.name;
    

//    constructor(props) {
//        super(props);
//        this.state = { customers: [], loading: true, modal: false };
//        this.toggle = this.toggle.bind(this);
        
//    }

//    toggle() {
//        this.setState({
//            modal: !this.state.modal
//        });
//    }

//    componentDidMount() {
//        this.populateCustomersData();
//    }

//    static renderCustomersTable(customers) {
//        return (
//            <table className='table table-striped' aria-labelledby="tabelLabel">
//                <thead>
//                    <tr>
//                        <th>Name</th>
//                        <th>Email</th>
//                        <th>Phone</th>
//                        <th>Address</th>
                       
//                    </tr>
//                </thead>
//                <tbody>
//                    {customers.map(customer =>
//                        <tr key={customer.customerId}>
//                            <td>{customer.firstName} {customer.lastName}</td>
//                            <td>{customer.email}</td>
//                            <td>{customer.phone}</td>
//                            <td>{customer.street}, {customer.city}, {customer.state} {customer.zipcode}</td>
                         
//                        </tr>
//                    )}
//                </tbody>
//            </table>
//        );
//    }

//     async handleSubmit() {
            
         
//            const newCustomerData = {

//                firstName: document.querySelector("#addCustomerForm").custFirstName.value,
//                lastName: document.querySelector("#addCustomerForm").custLastName.value,
//                phone: document.querySelector("#addCustomerForm").custPhone.value,
//                email: document.querySelector("#addCustomerForm").custEmail.value,
//                street: document.querySelector("#addCustomerForm").custStreet.value,
//                city: document.querySelector("#addCustomerForm").custCity.value,
//                state: document.querySelector("#addCustomerForm").custState.value,
//                zipcode: document.querySelector("#addCustomerForm").custZipcode.value,


//            }

//            const response = await fetch('/api/customers', {
//                method: "POST",
//                body: JSON.stringify(newCustomerData),
//                headers: { "Content-Type": "application/json", "Accept": "*/*" }
//            })
//                .then(response => {
//                    if (response.ok) {
//                        return response;

//                    } else {
//                        const error = new Error(`Error ${response.status}: ${response.statusText}`);
//                        error.response = response;
//                        throw error;
//                    }
//                },
//                    error => { throw error; }
//            )
                
//                //.then(
//                //    /*alert("<h1> New customer added.</h1>");*/
                    
//                //    )
//                .catch(error => { console.log('Error: ', error.message) })

//         if (response.ok) {
//             console.log('fuck')
//             this.setState({ modal: this.state.modal })

//         }
//}



    

   


//    //render() {
//    //    let contents = this.state.loading
//    //        ? <p><em>Loading...</em></p>
//    //        : Customers.renderCustomersTable(this.state.customers);

//    //    return (
//    //        <div>
//    //            <h1 id="tabelLabel" >Customers {/*<Link className='mx-1' to='/AddForm/customer'>Add Customer</Link>*/}</h1>
//    //            <Button color="info" onClick={this.toggle}>Fuck</Button>
//    //            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
//    //                <ModalHeader toggle={this.toggle}>Add Customer</ModalHeader>
//    //                <ModalBody>
//    //                    <Form id="addCustomerForm">
//    //                        <FormGroup>
//    //                            <Label for="custFirstName">
//    //                                First Name
//    //                            </Label>
//    //                            <Input
//    //                                id="custFirstName"
//    //                                name="firstName"
//    //                                placeholder=""
//    //                                type="text"
//    //                            />
//    //                        </FormGroup>
//    //                        <FormGroup>
//    //                            <Label for="custLastName">
//    //                                Last Name
//    //                            </Label>
//    //                            <Input
//    //                                id="custLastName"
//    //                                name="lastName"
//    //                                placeholder=""
//    //                                type="text"
//    //                            />
//    //                        </FormGroup>
//    //                        <FormGroup>
//    //                            <Label for="custPhone">
//    //                                Phone Number
//    //                            </Label>
//    //                            <Input
//    //                                id="custPhone"
//    //                                name="custPhone"
//    //                                placeholder=""
//    //                                type="text"
//    //                            />
//    //                        </FormGroup>
//    //                        <FormGroup>
//    //                            <Label for="custEmail">
//    //                                Email
//    //                            </Label>
//    //                            <Input
//    //                                id="custEmail"
//    //                                name="custEmail"
//    //                                placeholder=""
//    //                                type="email"
//    //                            />
//    //                        </FormGroup>
//    //                        <FormGroup>
//    //                            <Label for="custStreet">
//    //                                Street
//    //                            </Label>
//    //                            <Input
//    //                                id="custStreet"
//    //                                name="ccustStreet"
//    //                                placeholder=""
//    //                                type="text"
//    //                            />
//    //                        </FormGroup>
//    //                        <FormGroup>
//    //                            <Label for="custCity">
//    //                                City
//    //                            </Label>
//    //                            <Input
//    //                                id="custCity"
//    //                                name="custCity"
//    //                                placeholder=""
//    //                                type="text"
//    //                            />
//    //                        </FormGroup>
//    //                        <FormGroup>
//    //                            <Label for="custState">
//    //                                State
//    //                            </Label>
//    //                            <Input
//    //                                id="custState"
//    //                                name="custState"
//    //                                placeholder=""
//    //                                type="text"
//    //                            />
//    //                        </FormGroup>
//    //                        <FormGroup>
//    //                            <Label for="custZipcode">
//    //                                Zipcode
//    //                            </Label>
//    //                            <Input
//    //                                id="custZipcode"
//    //                                name="custZipcode"
//    //                                placeholder=""
//    //                                type="text"
//    //                            />
//    //                        </FormGroup>

//    //                    </Form>

//    //                </ModalBody>
//    //                <ModalFooter>
//    //                    <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
//    //                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
//    //                </ModalFooter>
//    //            </Modal>
//    //            {contents}
//    //        </div>
//    //    );
//    //}

//    //async populateCustomersData() {
//    //    const token = await authService.getAccessToken();
//    //     .then(response => {
//    //         if (response.ok) {
//    //             return response;
//    //         } else {
//    //             const error = new Error(`Error ${response.status}: ${response.statusText}`);
//    //             error.response = response;
//    //             throw error;
//    //         }
//    //     },
//    //         error => {
//    //             const errMess = new Error(error.message);
//    //             throw errMess;
//    //         }
//    //     )
//    //        .then(res => res.json())
//    //        .then(res => dispatch(cartItemsSuccess(res)))
//    //        .catch(error => dispatch(cartItemsFailed(error)))
//    //}

   

//}
