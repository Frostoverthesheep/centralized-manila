import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Flatpickr from 'react-flatpickr';

import AdminRPView from '../admin_modals/AdminRPView';
import RPCardView from '../admin_rptax/RPCardView';
import RPTableView from '../admin_rptax/RPTableView';
import Loading from '../../partials/Loading';



const AdminRPTaxRequests = ({ taxPayment, taxClearance, handleUpdateData }) => {

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDatee, setSelectedDatee] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); 

  const [modalView, setModalView] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [isProcessConfirm, setIsProcessConfirm] = useState(false);
  const [isRejectConfirm, setIsRejectConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState();
  const [transType, setTransType] = useState();

  console.log(selectedTransaction)

  const handleSearch = (transaction) => {
    const transactionId = transaction.transaction_id.toUpperCase();
    const query = searchQuery.toUpperCase();
    return transactionId.includes(query);
  };

  const filteredTaxClearance = taxClearance.filter(handleSearch);

  const filteredTaxPayment = taxPayment.filter(handleSearch);

  const handleToggleView = (mode) => {
    setViewMode(mode);
  };

  const handleModalOpen = (transaction, type) => {
    setSelectedTransaction(transaction);
    setTransType(type);
    setModalView(true);
  };

  const handleModalClose = () => {
    setModalView(false);
  };

  const handleProcessConfirm = (transaction) => {
    setSelectedTransaction(transaction);
    setIsProcessConfirm(true);
  };

  const handleRejectConfirm = (transaction) => {
    setSelectedTransaction(transaction);
    setIsRejectConfirm(true);
  };

  const handleConfirmClose = () => {
    setIsProcessConfirm(false);
    setIsRejectConfirm(false);
  };


  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <RPTableView
          filteredTaxClearance={filteredTaxClearance}
          filteredTaxPayment={filteredTaxPayment}
          handleModalOpen={handleModalOpen}
          handleRejectConfirm={handleRejectConfirm}
          handleProcessConfirm={handleProcessConfirm}
          section={'Requests'}
        />
      );
    } else if (viewMode === 'card') {
      return (
        <RPCardView
          filteredTaxClearance={filteredTaxClearance}
          filteredTaxPayment={filteredTaxPayment}
          handleModalOpen={handleModalOpen}
          handleRejectConfirm={handleRejectConfirm}
          handleProcessConfirm={handleProcessConfirm}
          section={'Requests'}
        />
      );
    }
  };


  const handleProcess = async () => {  

    const transaction_id = selectedTransaction.transaction_id;
    const trans_type = selectedTransaction.trans_type;
    const user_id = selectedTransaction.user_id;
  
    try {
      const response = await axios.post(`http://localhost:8800/adminrptax/updateprocess/${transaction_id}`, selectedTransaction);
  
      // Check the response status before proceeding
      if (response.status === 200) {

        try {
          const res = await axios.get(`http://localhost:8800/email/${user_id}`);
          
          if (res.data.user_email) {
            const updatedUserEmail = res.data.user_email;
            const f_name = res.data.f_name;
            const l_name = res.data.l_name;
            const sex_type = res.data.sex_type;
            console.log('FETCHED USER EMAIL:', updatedUserEmail);

            const user_email = updatedUserEmail;

            const rowData = { ...selectedTransaction, trans_type};

            const statusType = 'Processing';

            const body = {
              data: rowData,
              f_name: f_name,
              l_name: l_name,
              sex_type: sex_type,
              status_type: statusType,
            };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`http://localhost:8800/email/send-email/${user_email}`, body);
  
              if (emailResponse.data && emailResponse.data.message) {
                console.log('SENT EMAIL');
              } else {
                console.log("Failed to send email.");
              }
            } catch (emailError) {
              // alert(emailError);
            }
          } else {
            console.error('Transaction error:', res.statusText);
          }
        } catch (fetchError) {
          console.log('NOT FETCHING EMAIL');
          console.error(fetchError);
        }

        setIsLoading(false);
        handleConfirmClose();
        handleUpdateData();
        setSelectedTransaction('');

        setIsSuccess(true); // Set success state to true
        console.log('Update successful');

        setTimeout(() => {
          setIsSuccess(false);
        }, 2100);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };


  const handleReject = async () => {  

    const transaction_id = selectedTransaction.transaction_id;
    const trans_type = selectedTransaction.trans_type;
    const user_id = selectedTransaction.user_id;
  
    try {
      const response = await axios.post(`http://localhost:8800/adminrptax/updatereject/${transaction_id}`, selectedTransaction);
  
      // Check the response status before proceeding
      if (response.status === 200) {

        try {
          const res = await axios.get(`http://localhost:8800/email/${user_id}`);
          
          if (res.data.user_email) {
            const updatedUserEmail = res.data.user_email;
            const f_name = res.data.f_name;
            const l_name = res.data.l_name;
            const sex_type = res.data.sex_type;
            console.log('FETCHED USER EMAIL:', updatedUserEmail);

            const user_email = updatedUserEmail;

            const rowData = { ...selectedTransaction, trans_type};

            const statusType = 'Rejected';

            const body = {
              data: rowData,
              f_name: f_name,
              l_name: l_name,
              sex_type: sex_type,
              status_type: statusType,
            };
  
            // Proceed with additional logic after updating state
            try {
              const emailResponse = await axios.post(`http://localhost:8800/email/send-email/${user_email}`, body);
  
              if (emailResponse.data && emailResponse.data.message) {
                console.log('SENT EMAIL');
              } else {
                console.log("Failed to send email.");
              }
            } catch (emailError) {
              // alert(emailError);
            }
          } else {
            console.error('Transaction error:', res.statusText);
          }
        } catch (fetchError) {
          console.log('NOT FETCHING EMAIL');
          console.error(fetchError);
        }

        setIsLoading(false);
        handleConfirmClose();
        handleUpdateData();
        setSelectedTransaction('');

        setIsSuccess(true); // Set success state to true
        console.log('Update successful');

        setTimeout(() => {
          setIsSuccess(false);
        }, 2100);
      } else {
        console.error('Transaction error:', response.statusText);
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };


    return (
      <>
        {/* Requests Area */}
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded-sm border border-slate-200">
          <div className="px-5 py-5">
            <h1 className='font-medium text-center text-slate-700 dark:text-white mb-4'>Tax Clearance and Tax Payment Requests</h1>

            {isSuccess && (                
              <div className="my-5 text-center">
                <div className='text-emerald-500 bg-emerald-100 md:text-sm text-xs text-center rounded-full py-1.5'>Transaction update successful!</div> 
              </div>
              )}

            {/* Search */}
            {/* First Row */}
            <div className="flex flex-col items-center md:flex-row text-xs pb-2">

              {/* Transaction ID */}
              <div className="relative flex flex-row sm:flex-col items-start w-full sm:pr-4 mb-[0.5rem] sm:mb-0">
              <span className="hidden sm:block pr-1 pb-1 text-slate-700 dark:text-white">Transaction ID:</span>
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-0 sm:mt-[1.2rem]">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search Transaction ID..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>

              {/* Transaction Type */}
              <div className="flex flex-row sm:flex-col items-start w-full sm:pr-4 mb-[0.5rem] sm:mb-0">
                <span className="hidden sm:block pr-1 pb-1 pt-[0.25rem] sm:pt-0 text-slate-700 dark:text-white">Type:</span>
                <select onChange="" value="" name="" id="" className="text-xs border bg-transparent border-slate-300 text-slate-700 dark:text-white pl-2 py-1 rounded-sm peer cursor-pointer w-full">
                  <option value="SELECTSTATUS" className="dark:bg-[#3d3d3d]">Select Type</option>
                  <option value="RPTAXPAYMENT" className="dark:bg-[#3d3d3d]">Real Property Tax Payment</option>
                  <option value="RPTAXCLEARANCE" className="dark:bg-[#3d3d3d]">Real Property Tax Clearance</option>
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-row sm:flex-col items-start w-full mb-[0.5rem]sm:mb-0">
                <span className="hidden sm:block pr-1 pb-1 text-slate-700 dark:text-white">Date:</span>
              <div className="flex sm:flex-row w-full">
                <Flatpickr
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date[0])}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                    appendTo: document.body,
                    onOpen: function (selectedDates, dateStr, instance) {
                      if (document.documentElement.classList.contains('dark')) {
                        const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                        if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '#212121';
                        }
                      }
                    },
                    onClose: function (selectedDates, dateStr, instance) {
                      const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                      if (monthDropdown) {
                        monthDropdown.style.backgroundColor = '';
                      }
                    },
                  }}
                  placeholder="From"
                  className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-2 py-1 md:py-0.5 rounded-sm"
                />
                <span className="px-1 pt-1.5">-</span>
                <Flatpickr
                  value={selectedDatee}
                  onChange={(date) => setSelectedDatee(date[0])}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                    appendTo: document.body,
                    onOpen: function (selectedDates, dateStr, instance) {
                      if (document.documentElement.classList.contains('dark')) {
                        const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                        if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '#212121';
                        }
                      }
                    },
                    onClose: function (selectedDates, dateStr, instance) {
                      const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                      if (monthDropdown) {
                        monthDropdown.style.backgroundColor = '';
                      }
                    },
                  }}
                  placeholder="To"
                  className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-2 py-1 md:py-0.5 rounded-sm"
                />
                </div>
              </div> 
            </div>

              {/* 2nd Filter Row */}
          <div className="flex flex-col items-center md:flex-row text-xs pb-5">

              {/* Tax Identification Number */}
              <div className="relative flex flex-row sm:flex-col items-start w-full sm:pr-4 mb-[0.5rem] sm:mb-0">
              <span className="hidden sm:block  pr-1 pb-1 text-slate-700 dark:text-white">Tax Identification Number:</span>
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:mt-[1.2rem]">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search TIN..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>

              {/* Property Identification Number */}
              <div className="relative flex flex-row sm:flex-col items-start w-full sm:pr-4 mb-[0.5rem] sm:mb-0">
              <span className="hidden sm:block pr-1 pb-1 text-slate-700 dark:text-white">Property Identification Number:</span>
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:mt-[1.2rem]">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search PIN..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-8 py-1 md:py-0.5 rounded-sm"/>
              </div>

              {/* Clear Button */}
              <div className="flex w-full sm:w-32 items-center justify-center sm:mt-[1.3rem]">
                <button onClick="" className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-1 w-full rounded-sm inline-flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>&nbsp;Clear</span>
                </button>
              </div>

              {/* View Toggle */}
            <div className="flex items-center text-xs ml-2 mt-[1.3rem]">
              <div className="relative flex items-center">
                {/* Tabular View Toggle */}
                <button onClick={() => handleToggleView('table')}  className='flex items-center p-1 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white'>
                  {viewMode === 'table' ? <span className='text-black dark:text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clipRule="evenodd" />
                    </svg>
                    </span> : 
                    
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clipRule="evenodd" />
                    </svg>
                    </span>}
                </button>
                
                {/* Divider */}
                <div className="h-6 mx-2 border-r border-gray-300"></div>
                
                {/* Card View Toggle */}
                <button onClick={() => handleToggleView('card')} className="flex items-center p-1 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white">
                  {viewMode === 'card' ? <span className='text-black dark:text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
                    </svg>
                    </span> : 
                    
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
                      </svg>
                    </span>}
                  
                </button>
                </div>
              </div>
            </div>


            {/* Search */}
            {/* <div className="flex flex-col items-center md:flex-row text-xs mx-2 mb-2 sm:mb-7">
              <div className="relative flex flex-col items-center md:flex-row w-full">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mb-[0.5rem] sm:mb-0">
                    <path className='stroke-slate-400 dark:stroke-white' strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toUpperCase())} id="searchInput" type="text" placeholder="Search ID..." className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white mr-0 sm:mr-2 pl-8 py-1 md:py-0.5 rounded-sm mb-2 md:mb-0"/>
              </div>
              <div className="flex w-full items-center">
                <p className="pr-1 text-slate-700 dark:text-white">Date:</p>
                <Flatpickr
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date[0])}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                    appendTo: document.body,
                    onOpen: function (selectedDates, dateStr, instance) {
                      if (document.documentElement.classList.contains('dark')) {
                        const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                        if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '#212121';
                        }
                      }
                    },
                    onClose: function (selectedDates, dateStr, instance) {
                      const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                      if (monthDropdown) {
                        monthDropdown.style.backgroundColor = '';
                      }
                    },
                  }}
                  placeholder="From"
                  className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-2 py-1 md:py-0.5 rounded-sm"
                />
                <span className="px-1">-</span>
                <Flatpickr
                  value={selectedDatee}
                  onChange={(date) => setSelectedDatee(date[0])}
                  options={{
                    dateFormat: 'Y-m-d',
                    altInput: true,
                    altFormat: 'F j, Y',
                    appendTo: document.body,
                    onOpen: function (selectedDates, dateStr, instance) {
                      if (document.documentElement.classList.contains('dark')) {
                        const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                        if (monthDropdown) {
                          monthDropdown.style.backgroundColor = '#212121';
                        }
                      }
                    },
                    onClose: function (selectedDates, dateStr, instance) {
                      const monthDropdown = instance.calendarContainer.querySelector('.flatpickr-monthDropdown-months');
                      if (monthDropdown) {
                        monthDropdown.style.backgroundColor = '';
                      }
                    },
                  }}
                  placeholder="To"
                  className="bg-transparent text-xs md:text-sm w-full border border-slate-300 text-slate-700 dark:text-white pl-2 py-1 md:py-0.5 rounded-sm"
                />
              </div>      
            </div> */}

            
          
  
            {/* Render Content */}
            {renderContent()}
          

            {/* PROCESS MODAL */}
            {isProcessConfirm && (
              <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white dark:bg-[#212121] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mx-auto mt-4">
                        <span className="font-medium text-slate-700 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
                          Are you sure you would like to move this transaction into the Processing section?
                        </span>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                    <button
                      onClick={handleConfirmClose}
                      type="button"
                      className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                    >
                      <p>Cancel</p>
                    </button>

                    <button
                    onClick={() => {
                      handleProcess();
                      setIsLoading(true);
                    }}
                    type="button"
                    className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-emerald-500 dark:text-white dark:hover:text-white dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                    Confirm
                    </button>
                    </div>

                    {isLoading ? (
                      <Loading />
                    ) : null}

                  </div>
                </div>
              </div>
            )}

            {/* REJECT MODAL */}
            {isRejectConfirm && (
              <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white dark:bg-[#212121] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mx-auto mt-4">
                        <span className="font-medium text-slate-700 dark:text-white sm:mt-0 text-xs md:text-sm" id="modal-headline">
                          Are you sure you would like to REJECT this transaction? This is irreversible.
                        </span>
                      </div>
                    </div>
                  
                  <div className="bg-white dark:bg-[#212121] px-4 py-3 gap-3 sm:px-6 flex justify-end">
                    <button
                      onClick={handleConfirmClose}
                      type="button"
                      className="text-slate-500 text-xs md:text-sm ms-2 hover:text-white border border-slate-500 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-slate-500 dark:text-white dark:hover:text-white dark:hover:bg-slate-500 dark:focus:ring-slate-800"
                    >
                      <p>Cancel</p>
                    </button>


                    <button
                    onClick={() => {
                      handleReject();
                      setIsLoading(true);
                    }}
                    type="button"
                    className="text-white text-xs md:text-sm bg-emerald-500 border border-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-normal rounded-full px-5 py-2 text-center mb-2 dark:border-emerald-500 dark:text-white dark:hover:text-white dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                    >
                      Confirm
                    </button>

                  </div>

                  {isLoading ? (
                      <Loading />
                    ) : null}

                  </div>
                </div>
              </div>
            )}

            

            {selectedTransaction && modalView && (
            <AdminRPView
              // selectedTransaction={selectedTransaction}
              selectedTransaction={selectedTransaction}
              isOpen={modalView}
              handleClose={handleModalClose}
              transType={transType}
            />
            )}
          </div>
        </div>
      </>
    );
  };
  
  
  export default AdminRPTaxRequests;
  