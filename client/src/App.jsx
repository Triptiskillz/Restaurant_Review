import  React from 'react'
import {BrowserRouter as Router, Switch ,Route } from "react-router-dom"
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import { RestaurantdetailPage } from './routes/RestaurantdetailPage';
import { Updatepage } from './routes/Updatepage';
 
const App = () => {
    return (
        
        <RestaurantsContextProvider>
           
             <div className="container">
            <Router>
                <Switch>
                   <Route exact path ="/" component={Home}/>
                   <Route exact path ="/restaurants/:id/update" component={Updatepage}/>
                   <Route exact path ="/restaurants/:id" component={RestaurantdetailPage}/>
                </Switch>
            </Router>
        </div>
     
        </RestaurantsContextProvider>
        
    )
}
export default App;