import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import { Link } from 'react-router-dom';

export class Leads extends Component {
    static displayName = Leads.name;

    constructor(props) {
        super(props);
        this.state = { Leads: [], loading: true };
    }

    componentDidMount() {
        this.populateLeadsData();
    }

    static renderLeadsTable(Leads) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {Leads.map(lead =>
                        <tr key={lead.leadId}>
                            <td>{lead.firstName} {lead.lastName}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Leads.renderLeadsTable(this.state.Leads);

        return (
            <div>
                <h1 id="tabelLabel" >Leads  <Link className='mx-1' to='/AddForm/lead'>Add Lead</Link></h1>
                {contents}
            </div>
        );
    }

    async populateLeadsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('/api/leads', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}`}
        });

        console.log(response.body.toString())
        const data = await response.json();
        this.setState({ Leads: data, loading: false });
    }
}
