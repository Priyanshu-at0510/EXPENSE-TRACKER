import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {useUserAuth} from '../../hooks/useUserAuth';
const Home=()=>{
  console.log("going to DashboardLayout");
  useUserAuth();
  return(
    <DashboardLayout activeMenu="Dashboard">

      <div className='my-5 mx-auto'></div>
    </DashboardLayout>
  );
}
export default Home;