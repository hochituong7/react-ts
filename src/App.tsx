import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import FormAccount from 'features/demoForm1/FormAccount';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
    <>
    
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <PrivateRoute path="/admin">
         <AdminLayout/>
        </PrivateRoute>
        <Route path="/form">
          <FormAccount />
        </Route>
        <Route>
          <NotFound />
        </Route>
        
      </Switch>
    </>
  );
}

export default App;
