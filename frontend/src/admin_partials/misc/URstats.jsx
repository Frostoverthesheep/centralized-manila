import React, { useState, useEffect } from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function URstats() {

  const chartData = {
    labels: ['Reasons'],
    datasets: [
      {
        label: 'Verified Users',
        data: [131],
        backgroundColor: '#3078f0',
        hoverBackgroundColor: '#2660bf',
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Unverified Users',
        data: [100],
        backgroundColor: '#d62d20',
        hoverBackgroundColor: tailwindConfig().theme.colors.red[700],
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };


    return (
        <div className="flex flex-col col-span-full bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
            <div className="px-5 pt-5">

                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">User Registry</h2>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Total Number of Users</div>
                <div className="flex items-start"><div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">2,000</div>
                </div>
            </div>
            
            {/* Chart built with Chart.js 3 */}
            <div className="grow">
                {/* Change the height attribute to adjust the chart height */}
                <BarChart data={chartData} width={595} height={48}/>
            </div>
        </div>
    )

}

export default URstats