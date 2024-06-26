import React from 'react';

const CTCCardView = ({filteredctcCedula, handleModalOpen, handleRejectConfirm, handleProcessConfirm, handleCompleteConfirm, section}) => {
  
  return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-4">

        {filteredctcCedula && filteredctcCedula.length > 0 && filteredctcCedula.map((transaction) => (

          <div onClick={(e) => handleModalOpen(transaction,'Community Tax Certificate' ,e)} key={transaction.transaction_id} className="cursor-pointer bg-white dark:bg-[#333333] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] rounded-sm flex flex-col">
            <div className="text-xs font-semibold border-t-4 border-[#ffa700] text-slate-60 bg-slate-200 dark:bg-[#212121] dark:text-white rounded-t-sm px-4 py-1.5">
              Transaction ID: {transaction.transaction_id}
            </div>

            <div className="flex-grow px-4 pt-5 pb-4">
              <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Type:{transaction.trans_type} </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Last Name: {transaction.l_name} </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 my-1">First Name:  {transaction.f_name}</div>
              <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Date Processed: {transaction.date}</div>
              <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Time Processed: {transaction.time}</div>
              <div className="flex justify-start items-center text-xs text-slate-600 dark:text-slate-300 my-1">
                <span>Status: {transaction.status_type}</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 my-1">Amount Paid: P  {transaction.amount} </div>
            </div>

            
            <div className="px-4 pb-5 space-x-4 flex justify-between items-center group">
              <div onClick={(e) => { e.stopPropagation(); handleRejectConfirm(transaction); }}  className="flex justify-center items-center text-center cursor-pointer p-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-sm mt-2 flex-grow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                <span className="text-xs font-normal">&nbsp;{section === 'Requests' ? 'Reject' : 'Mark as rejected'}</span>
              </div>

              {section === 'Requests' ? (
                <div onClick={(e) => { e.stopPropagation(); handleProcessConfirm(transaction); }}  className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-xs font-normal">&nbsp;Process</span>
                </div>
              ) : (
                <div onClick={(e) => { e.stopPropagation(); handleCompleteConfirm(transaction); }}  className="flex justify-center items-center text-center cursor-pointer p-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-sm mt-2 flex-grow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-xs font-normal">&nbsp;Mark as complete</span>
              </div>
              )}
              
            </div>
          </div>

        ))}

        
        {filteredctcCedula.length <= 0 && (
                  <div className="font-medium col-span-full text-center text-slate-600 whitespace-nowrap dark:text-white py-[6.5rem]">
                    No records found.
                  </div>
          )}
        </div> 
  );
};

export default CTCCardView;