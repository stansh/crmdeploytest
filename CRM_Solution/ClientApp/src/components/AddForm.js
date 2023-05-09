import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Col, Button } from 'reactstrap';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'
import { createImportTypeNode } from 'typescript';
import { extend } from 'jquery';



function AddForm (props) {
    const [entity, setEntity ] = useState("");
    const location = useLocation();

  


    useEffect(() => {
        setEntity(location.pathname.split('/')[2])
    }, []);

    //componentDidMount() {
    //    this.setState(location.pathname.split('/')[2])
    //}

    async function onSubmit(event) {
        console.log(event)

        const newCustomerData = {

            //firstName: event.target.custFirstName,
            //lastName: event.target.custLastName,
            //phone: event.target.custPhone,
            //email: event.target.custEmail,
            //street: event.target.custStreet,
            //city: event.target.custCity,
            //state: event.target.custState,
            //zipcode: event.target.custZipcode,


            id: 0,
            firstName: "test--tessttt",
            lastName: "string",
            phone: "string",
            email: "string",
            street: "string",
            city: "string",
            state: "string",
            zipcode: "string"

        }

        console.log(newCustomerData)

        const token = await authService.getAccessToken();
        return fetch('/api/customers', {
            method: "POST",
            body: JSON.stringify(newCustomerData),
            headers: !token ? {} : { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" , "Accept" : "*/*" }
            //*headers:  { "Content-Type": "application/json" , "Accept" : "*/*"}
        })
        .then(response => {
            if (response.ok) {
               //edirect('/Customers');
                console.log(response)
                return response;

            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(res => res.json())
        .catch(error => { console.log('Error: ', error.message) })



    }



 

        return (
            <div>
                <h1>Add new {entity}</h1>

                <Form onSubmit={event => onSubmit(event)} id="addCustomerForm">
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



                    <Button type="submit" >Submit</Button>
                </Form>



            </div>
        );
    

}

export default AddForm;













