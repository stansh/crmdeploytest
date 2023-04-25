import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Col, Button } from 'reactstrap';
import authService from './api-authorization/AuthorizeService'
import { Link } from 'react-router-dom';


export class Customers extends Component {
    static displayName = Customers.name;
   

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true };
        
    }

    componentDidMount() {
        this.populateCustomersData();
    }

    static renderCustomersTable(customers) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer =>
                        <tr key={customer.customerId}>
                            <td>{customer.firstName} {customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.createdDate.substr(0,10)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Customers.renderCustomersTable(this.state.customers);

        return (
            <div>
                <h1 id="tabelLabel" >Customers  <Link className='mx-1' to ='/AddForm/customer'>Add Customer</Link></h1>
                {contents}
            </div>
        );
    }

    async populateCustomersData() {
        const token = await authService.getAccessToken();
        const response = await fetch('/api/customers', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}`}
        });

        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }
}
