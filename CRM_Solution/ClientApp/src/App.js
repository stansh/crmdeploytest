import React, { Component, useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
/*import { FetchData } from './components/FetchData';*/
import { Customers } from './components/Customers';
import { Products } from './components/Products';
import { Leads } from './components/Leads';
import { Dashboard } from './components/Dashboard';
import AddForm from './components/AddForm';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import './custom.css'

//export default class App extends Component {
//    static displayName = App.name;

//    static x = UserManager;
    

//  render () {
//    return (
//      <Layout>
//        <Route exact path='/' component={Home} />
//        <Route path='/counter' component={Counter} />
//            {/*<AuthorizeRoute path='/fetch-data' component={FetchData} />*/}
//            <AuthorizeRoute path='/customers' component={Customers} />
//            <AuthorizeRoute path='/products' component={Products} />
//            <AuthorizeRoute path='/leads' component={Leads} />
//            <AuthorizeRoute path='/addForm' component={AddForm} />
//            <AuthorizeRoute path='/dashboard' component={Dashboard} />

//        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
//      </Layout>
//    );
//  }
//}


function App(props) {
    //const [user, setUser] = useState(null)

    console.log(localStorage.getItem("userRole"))
 

    useEffect(() => {
       
        
        
    },[])

    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <AuthorizeRoute path='/customers' component={Customers} />
            <AuthorizeRoute path='/products' component={Products} />
            <AuthorizeRoute path='/leads' component={Leads} />
            <AuthorizeRoute path='/addForm' component={AddForm} />
            <AuthorizeRoute path='/dashboard' component={Dashboard} />

            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        </Layout>
        

        );
}

export default App;
