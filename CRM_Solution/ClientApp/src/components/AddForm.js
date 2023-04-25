import React, { Component, useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Col, Button } from 'reactstrap';
import { useLocation, useNavigate, useHistory } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'



function AddForm(props){
    const [entity, setEntity ] = useState("");
    const location = useLocation();
 
    useEffect(() => {
        setEntity(location.pathname.split('/')[2])
    }, []);
    
    return (
        <div>
            <h1>{entity}</h1>
        </div>
    );
};

export default AddForm;













