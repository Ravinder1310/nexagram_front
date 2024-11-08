import React from 'react'
import ImageSlider from './rechargeSlider'
import Marquee from './marquee'
import MainTransfer from './mainTransfer'
import Slider2 from './sliderCube/slider'
import Banking from './banking'
import CibilScore from './cibil'
import Travels from './travels'
import ArtificialServices from './artificialServices'
import RechargeAndBill from './rechargeAndPayBills'

const AllRecharges = () => {
  return (
    // <Layout>
      <div className='bg-gray-200 pb-10 pt-20'>
        {/* <NewNavbar/> */}
      <ImageSlider/>
      <Marquee/>
      <RechargeAndBill/>
      <MainTransfer/>
      <Slider2/>
      <Banking/>
      <CibilScore/>
      <Travels/>
      <ArtificialServices/>
      </div>
    // </Layout>

  )
}

export default AllRecharges