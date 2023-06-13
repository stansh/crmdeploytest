import React, { useEffect, useState, useRef } from 'react';
import { Form, FormGroup, Input, Label, Alert, UncontrolledAlert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import authService from './api-authorization/AuthorizeService'
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserManager } from 'oidc-client';


export function Products(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alert2, setAlert2] = useState(false);
    const [alert3, setAlert3] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
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
            setId(products[event.target.id].id);
            let prod = products[event.target.id];
            setName(prod.name);
            setDescription(prod.description);
            setPrice(prod.price);

        }

    };
    const toggle3 = (event) => {

        setModal3(!modal3);
        if (modal3 === false) {
            setId(products[event.target.id].id);
        }

    }



    useEffect(() => {
        setLoading(true)
        const token = authService.getAccessToken();

        fetch('/api/products', {
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
                setProducts(res);

            })
            .catch(error => { console.log('Error: ', error.message) })


    }, [])

    const postProduct = () => {


        const newProductData = {

            name: document.querySelector("#addProductForm").prodName.value,
            description:  document.querySelector("#addProductForm").prodDescription.value,
            price: '$' + document.querySelector("#addProductForm").prodPrice.value,



        }
        const token = authService.getAccessToken();
        return fetch('/api/products', {
            method: "POST",
            body: JSON.stringify(newProductData),
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


    const editProduct = (event) => {

        const updatedProduct = {
            id: id,
            name: document.querySelector("#editProductForm").prodName.value,
            description: document.querySelector("#editProductForm").prodDescription.value,
            price: document.querySelector("#editProductForm").prodPrice.value,
            

        }
        const token = authService.getAccessToken();
        return fetch(`/api/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedProduct),
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


    const deleteProduct = () => {


        const token = authService.getAccessToken();
        return fetch(`/api/products/${id}`, {
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
            <h3 className="pageTitle">Products</h3>
            {loading && !error && <Spinner children="" />}
            {error && <h3>{error.message}</h3>}
            {!error && <Button color="secondary" onClick={toggle}>Add Product</Button>}
            <Alert color="info" isOpen={alert} toggle={alertToggle} fade={true}>New Product successfully added!</Alert>
            <Alert color="info" isOpen={alert2} toggle={alertToggle2} fade={true}>Product updated!</Alert>
            <Alert color="info" isOpen={alert3} toggle={alertToggle3} fade={true}>Product deleted succerfully.</Alert>

            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {products.map((lead, index) =>
                        <tr key={index}>
                            <td>{lead.name}</td>
                            <td>{lead.description}</td>
                            <td>{lead.price}</td>
                            <td><Button color="secondary" className='btn btn-xs' outline onClick={toggle2} id={index}>Edit</Button></td>
                            <td><Button color="danger" className='btn btn-xs' outline onClick={toggle3} id={index}>Delete</Button></td>

                        </tr>
                    )}
                </tbody>
            </table>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader closeButton>
                    New Product
                </ModalHeader>
                <ModalBody>
                    <Form id="addProductForm">
                        <FormGroup>
                            <Label for="prodName">
                                Name
                            </Label>
                            <Input
                                id="prodName"
                                name="prodName"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="prodDescription">
                                Description
                            </Label>
                            <Input
                                id="prodDescription"
                                name="prodDescription"
                                placeholder=""
                                type="textarea"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="prodPrice">
                                Price
                            </Label>
                            <Input
                                id="prodPrice"
                                name="prodPrice"
                                placeholder=""
                                type="text"
                            />
                        </FormGroup>

                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={postProduct}>
                        Submit
                    </Button>
                    <Button variant="primary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modal2} toggle={toggle2} id="editProductModal">
                <ModalHeader closeButton>
                    Edit Product Information
                </ModalHeader>
                <ModalBody className="row" >
                    <div id="currentProductData" className="col" >
                        <h6><i>Name: </i><br />{name}</h6>
                        <p><i>Description: </i><br />{description}</p>
                        <h6><i>Price: </i><br />{price}</h6>


                    </div>
                    <div className="col">
                        <Form id="editProductForm" className="d-inline"  >
                            <FormGroup>
                                <Label for="prodName">
                                    Name
                                </Label>
                                <Input
                                    id="prodName"
                                    name="prodName"
                                    placeholder=""
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="prodDescription">
                                    Description
                                </Label>
                                <Input
                                    id="prodDescription"
                                    name="prodDescription"
                                    placeholder=""
                                    type="textarea"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="prodPrice">
                                    Price
                                </Label>
                                <Input
                                    id="prodPrice"
                                    name="prodPrice"
                                    placeholder=""
                                    type="text"
                                />
                            </FormGroup>

                        </Form>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={editProduct}>
                        Submit
                    </Button>
                    <Button variant="primary" onClick={toggle2}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modal3} toggle={toggle3} id="deleteProductModal">
                <ModalHeader closeButton>
                    Delete Product
                </ModalHeader>
                <ModalBody className="row" >

                    <h6>Are you sure that you want to delete the product?</h6>

                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={deleteProduct}>
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


