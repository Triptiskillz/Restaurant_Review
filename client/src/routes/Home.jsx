import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import "../components/Home.css"
import Restaurant_list from '../components/Restaurant_list'

  const Home = () =>{
    return (
        <div className="bg">
            <Header/>
            <AddRestaurant/>
            <Restaurant_list/>
        </div>
    )
}

export default Home;
