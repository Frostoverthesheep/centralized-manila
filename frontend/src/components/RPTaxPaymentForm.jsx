import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';


const RPTaxPaymentForm =()=>{

  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  const user_id = pathname.split("/")[2];

  const [userPersonal, setUserPersonal]=useState({})
   console.log(userPersonal);

    useEffect(()=>{
        const fetchUserPersonal= async()=>{
            try{
                const res= await axios.get(`http://localhost:8800/profile/rptaxpayment/${user_id}`);
                setUserPersonal(res.data[0]);
            }catch(err){
                console.log(err)
            }
        }
        fetchUserPersonal();
    },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserPersonal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isSuccess, setIsSuccess] = useState(false); // New state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`http://localhost:8800/profile/rptaxpayment/${user_id}`, userPersonal)
        .then((res) => {
          setIsSuccess(true); // Set success state to true
          handleCloseModal(); // Close the modal
          console.log('User credentials updated successfully');

          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }; 

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProceed = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };







  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              
                
            <form onSubmit={handleSubmit}>
            <h1 className='font-medium text-center'>Real Property Tax</h1>
              <h1 className='mb-7 text-sm italic text-center'>Tax Payment</h1>

              {isSuccess && (
              <div className="text-emerald-500 bg-emerald-100 text-center rounded-full py-1.5 mb-5">
                Success! Your changes have been saved.
              </div>
              )}
  
              <div className="grid md:grid-cols-1 md:gap-6 md:mx-96 mt-24">
                <div className="relative z-0 w-full mb-2 group">
                  <input onChange={handleInputChange} value={userPersonal.rp_tdn}  type="text" name="rp_tdn" id="rp_tdn" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tax Declaration Number (TDN)</label>
                </div>
                <div className="relative z-0 w-full mb-2 group">
                  <input onChange={handleInputChange} value={userPersonal.rp_pin} type="text" name="rp_pin" id="rp_pin" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="middle_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Property Identification Number (PIN)</label>
                </div>
                <div className="relative z-0 w-full mb-2 group">
                  <input onChange={handleInputChange} value={userPersonal.rp_year} type="text" name="rp_year" id="rp_year" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Year</label>
                </div>
                <div className="relative z-0 w-full mb-2 group">
                  <input onChange={handleInputChange} value={userPersonal.rp_period} type="text" name="rp_period" id="rp_year" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Period</label>
                </div>
              </div>
           
              <div className="flex flex-col items-center md:flex-row md:justify-end mt-7">
                  <button 
                  onClick={handleProceed} 
                  type="submit" 
                  className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    Proceed</button>
              </div>
            </form>

            </div>
          </div>
        </main>

        {isModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-[#181818] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-900 dark:text-white" id="modal-headline">
                      Are you sure you want to save this changes?
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#181818] px-4 py-3 gap-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-5 py-2 text-center mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="text-slate-500 ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        )}  

        

      </div>
    </div>
  );
}

export default RPTaxPaymentForm;