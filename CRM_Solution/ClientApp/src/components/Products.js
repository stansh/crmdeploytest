import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import { Link } from 'react-router-dom';

export class Products extends Component {
    static displayName = Products.name;

    constructor(props) {
        super(props);
        this.state = { Products: [], loading: true };
    }

    componentDidMount() {
        this.populateProductsData();
    }

    static renderProductsTable(Products) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {Products.map(product =>
                        <tr key={product.productId}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>

                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Products.renderProductsTable(this.state.Products);

        return (
            <div>
                <h1 id="tabelLabel" >Products  <Link className='mx-1' to='/AddForm/product'>Add Product</Link></h1>
                {contents}
            </div>
        );
    }

    async populateProductsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('/api/products', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}
        });

        console.log(response.body.toString())
        const data = await response.json();
        this.setState({ Products: data, loading: false });
    }
}
