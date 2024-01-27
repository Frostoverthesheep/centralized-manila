import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import AdminSidebar from '../admin_partials/AdminSidebar';
import AdminHeader from '../admin_partials/AdminHeader';
import AdminFooter from '../admin_partials/AdminFooter';

import AdminRPTaxRequests from '../admin_partials/admin_cards/AdminRPTaxRequests';


const AdminRPTaxForm1 = () => {

  
  const location = useLocation();
  const { pathname, state } = location;
  console.log("pathname", pathname);
  const admin_type = pathname.split("/")[2];

  console.log("userrole", admin_type)

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoSrc = '../src/images/mnl_footer.svg';

  const [taxPayment, setTaxPayment] = useState([]);
  const [taxClearance, setTaxClearance] = useState([]);

  console.log(taxPayment)
  console.log(taxClearance)

  const [transType, setTransType] = useState('');


  useEffect(() => {
    const fetchUserTransaction = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/adminrptax/`);
        setTaxPayment(res.data.taxpayment);
        setTaxClearance(res.data.taxclearance);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserTransaction();
  }, []);

  // const [taxClearanceDetails, setTaxClearanceDetails] = useState(null);
  // const [taxPaymentDetails, setTaxPaymentDetails] = useState(null);

  // const handleProceedForTaxClearance = (taxClearanceDetails) => {
  //   setTaxClearanceDetails(taxClearanceDetails);
  // };

  // const handleProceedForTaxPayment = (taxPaymentDetails) => {
  //   setTaxPaymentDetails(taxPaymentDetails);
  // };

  // const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  // const handleMoveToProcessing = (transaction) => {
  //   setTaxPayment((prevTaxPayment) => prevTaxPayment.filter((t) => t !== transaction));
  //   setTaxClearance((prevTaxClearance) => prevTaxClearance.filter((t) => t !== transaction));
  //   setProcessingTransactions((prevProcessing) => [...prevProcessing, transaction]);
  //   setSelectedTransactionId(transaction.transactionId);  // Use transaction.transactionId instead of transactionId
  // };
  
  



  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#212121]">

      {/* AdminSidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Contents Area */}
        <main className="overflow-y-auto">
          {/*  Banner */}
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-sm rounded-sm border border-slate-200 mx-4 my-4">
            <div className="px-5 py-5">
              <h1 className="font-medium text-center text-slate-700 dark:text-white">Real Property Tax</h1>
              <h1 className="mb-7 text-sm italic text-center text-slate-700 dark:text-gray-300">Transactions</h1>

              <div className="flex items-center justify-center space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-blue-500"></div>
                  <p className="text-slate-700 dark:text-white">Tax Clearance</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 mr-2 bg-[#0057e7]"></div>
                  <p className="text-slate-700 dark:text-white">Tax Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/*  Requests Section */}
          <div className="grid grid-cols-1 gap-4 mx-4 my-4">
            
            <AdminRPTaxRequests
            taxPayment={taxPayment}
            taxClearance={taxClearance}
            // transType={transType}
            // setTransType={setTransType}
            />
          </div>

          <AdminFooter logo={logoSrc} />
        </main>
        
      </div>
    </div>
  );
}

export default AdminRPTaxForm1;