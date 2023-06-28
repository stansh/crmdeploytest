import React, { Component, useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Customers } from './components/Customers';
import { Products } from './components/Products';
import { Leads } from './components/Leads';
import { Dashboard } from './components/Dashboard';

import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import './custom.css'




function App(props) {
    //const [user, setUser] = useState(null)
    console.log(localStorage.getItem("userRole"))
 

    useEffect(() => {

    },[])

    return (
        <Layout>
            <Route exact path='/' component={Dashboard} />
            <Route path='/customers' component={Customers} />
            <Route path='/products' component={Products} />
            <Route path='/leads' component={Leads} />
            <Route path='/dashboard' component={Dashboard} />
            {/*<AuthorizeRoute path='/customers' component={Customers} />*/}
            {/*<AuthorizeRoute path='/products' component={Products} />*/}
            {/*<AuthorizeRoute path='/leads' component={Leads} />*/}
            {/*<AuthorizeRoute path='/dashboard' component={Dashboard} />*/}

            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        </Layout>
        

        );
}

export default App;
