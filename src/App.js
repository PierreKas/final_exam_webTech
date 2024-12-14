// import './App.css';
// import AddSellingPoint from './templates/selling_point/add_selling_point';
// import AddUser from './templates/users/add_user';
// import AddProduct from './templates/product/add_product';
// import AddTransaction from './templates/transactions/add_transaction';
// import AddClient from './templates/client/add_client';
// import HomePage from './templates/homepage';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Navbar from './templates/nav_br';
// import ClientsList from './templates/client/clients_list';
// import ProductList from './templates/product/product_list';
// import SellingPointList from './templates/selling_point/selling_points_list';
// import UsersList from './templates/users/users_list';
// import TransactionList from './templates/transactions/transactions_list';
// import Login from './templates/login';
// import OTP from './templates/otp';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Navbar />
//         <Switch>
//           <Route exact path='/'>
//             <Login />
//           </Route>
//           <Route exact path='/otp'>
//             <OTP />
//           </Route>
//           <Route exact path='/home'>
//             <HomePage />
//           </Route>
//           <Route exact path='/client'>
//             <ClientsList />
//           </Route>
//           <Route path='/client/add'>
//             <AddClient />
//           </Route>
//           <Route exact path='/user'>
//             <UsersList />
//           </Route>
//           <Route path='/user/add'>
//             <AddUser />
//           </Route>
//           <Route exact path='/product'>
//             <ProductList />
//           </Route>
//           <Route path='/product/add'>
//             <AddProduct />
//           </Route>
//           <Route exact path='/transaction'>
//             <TransactionList />
//           </Route>
//           <Route path='/transaction/add'>
//             <AddTransaction />
//           </Route>
//           <Route exact path='/selling-point'>
//             <SellingPointList />
//           </Route>
//           <Route path='/selling-point/add'>
//             <AddSellingPoint />
//           </Route>
//         </Switch>

//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


///////////////===========

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './templates/router_athorization';
import AddSellingPoint from './templates/selling_point/add_selling_point';
import AddUser from './templates/users/add_user';
import AddProduct from './templates/product/add_product';
import AddTransaction from './templates/transactions/add_transaction';
import AddClient from './templates/client/add_client';
import HomePage from './templates/homepage';
import Navbar from './templates/nav_br';
import ClientsList from './templates/client/clients_list';
import ProductList from './templates/product/product_list';
import SellingPointList from './templates/selling_point/selling_points_list';
import UsersList from './templates/users/users_list';
import TransactionList from './templates/transactions/transactions_list';
import Login from './templates/login';
import OTP from './templates/otp';
import ResetPassword from './templates/reset_password';
import Dashboard from './templates/dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          {/* Public Routes */}
          <Route exact path='/' component={Login} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route exact path='/otp' component={OTP} />

          {/* Protected Routes */}
          {/* Home - accessible to all logged-in users */}
          <ProtectedRoute
            exact
            path='/home'
            component={HomePage}
            allowedRoles={['ADMIN', 'MANAGER', 'SELLER']}
          />

          <ProtectedRoute
            exact
            path='/dashboard'
            component={Dashboard}
            allowedRoles={['ADMIN', 'MANAGER']}
          />

          {/* ADMIN Only Routes */}
          <ProtectedRoute
            exact
            path='/user'
            component={UsersList}
            allowedRoles={['ADMIN']}
          />
          <ProtectedRoute
            path='/user/add'
            component={AddUser}
            allowedRoles={['ADMIN']}
          />

          {/* ADMIN and MANAGER Routes */}
          <ProtectedRoute
            exact
            path='/client'
            component={ClientsList}
            allowedRoles={['ADMIN', 'MANAGER']}
          />
          <ProtectedRoute
            path='/client/add'
            component={AddClient}
            allowedRoles={['ADMIN', 'MANAGER']}
          />

          <ProtectedRoute
            exact
            path='/product'
            component={ProductList}
            allowedRoles={['ADMIN', 'MANAGER']}
          />
          <ProtectedRoute
            path='/product/add'
            component={AddProduct}
            allowedRoles={['ADMIN', 'MANAGER']}
          />

          <ProtectedRoute
            exact
            path='/selling-point'
            component={SellingPointList}
            allowedRoles={['ADMIN', 'MANAGER']}
          />
          <ProtectedRoute
            path='/selling-point/add'
            component={AddSellingPoint}
            allowedRoles={['ADMIN', 'MANAGER']}
          />

          {/* Transaction Routes - accessible to ADMIN, MANAGER, and SELLER */}
          <ProtectedRoute
            exact
            path='/transaction'
            component={TransactionList}
            allowedRoles={['ADMIN', 'MANAGER', 'SELLER']}
          />
          <ProtectedRoute
            path='/transaction/add'
            component={AddTransaction}
            allowedRoles={['ADMIN', 'MANAGER', 'SELLER']}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;