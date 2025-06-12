import React, { useContext } from 'react'
import Nav from '../Component/Nav'
import Hero from '../Component/Hero'
import Card from '../Component/Card'
import Footer from '../Component/Footer'
import { listingDataContext } from '../Context/ListingContext'
import { userDataContext } from '../Context/UserContext'

function Home() {
  let {listingData, setListingData, newListData} = useContext(listingDataContext)
  let {userData} = useContext(userDataContext)
  
  return (
    <div>
      <Nav/>
      {!userData ? (
        <>
          <Hero/>
          <div className='w-[100vw] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]'>
            {newListData.map((list) => (
              <Card 
                key={list._id}
                title={list.title} 
                landMark={list.landMark} 
                city={list.city} 
                image1={list.image1} 
                image2={list.image2} 
                image3={list.image3} 
                rent={list.rent} 
                id={list._id} 
                ratings={list.ratings} 
                isBooked={list.isBooked} 
                host={list.host}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='w-[100vw] flex items-center justify-center gap-[25px] flex-wrap mt-[180px]'>
          {newListData.map((list) => (
            <Card 
              key={list._id}
              title={list.title} 
              landMark={list.landMark} 
              city={list.city} 
              image1={list.image1} 
              image2={list.image2} 
              image3={list.image3} 
              rent={list.rent} 
              id={list._id} 
              ratings={list.ratings} 
              isBooked={list.isBooked} 
              host={list.host}
            />
          ))}
        </div>
      )}
      <Footer/>
    </div> 
  )
}

export default Home
