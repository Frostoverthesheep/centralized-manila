import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    
    const [fetchCount, setFetchCount] = useState(0);

    const [transStats, setTransStats] = useState({});
    const [transReport, setTransReport] = useState({});
    const [taxPayment, setTaxPayment] = useState({});
    const [taxClearance, setTaxClearance] = useState({});
    const [businessPermit, setBusinessPermit] = useState({});
    const [cedulaCert, setCedulaCert] = useState({});
    const [birthCert, setBirthCert] = useState({});
    const [deathCert, setDeathCert] = useState({});
    const [marriageCert, setMarriageCert] = useState({});
    const [topRegions, setTopRegions] = useState({});
    const [topProvinces, setTopProvinces] = useState({});
    const [topCities, setTopCities] = useState({});
    const [revenue, setRevenue] = useState({});
    const [verifiedUsers, setVerifiedUsers] = useState({});
  
    const {
      totalPaid: totalPaid,
      totalRP: totalRP,
      totalBP: totalBP,
      totalCC: totalCC,
      totalLCR: totalLCR,
    } = revenue;

    const Base_Url = process.env.Base_Url;



    const fetchData = async (url, setStateFunction) => {
        try {
          const response = await axios.get(`${Base_Url}admin/${url}`);
          setStateFunction(response.data);
        } catch (err) {
          console.log(err);
        } finally {
          handleEffectCompletion();
        }
      };

      useEffect(() => {
        fetchData('transstats', setTransStats, handleEffectCompletion);
        fetchData('transreport', setTransReport, handleEffectCompletion);
        fetchData('taxpayment', setTaxPayment, handleEffectCompletion);
        fetchData('taxclearance', setTaxClearance, handleEffectCompletion);
        fetchData('businesspermit', setBusinessPermit, handleEffectCompletion);
        fetchData('cedulacert', setCedulaCert, handleEffectCompletion);
        fetchData('birthcert', setBirthCert, handleEffectCompletion);
        fetchData('deathcert', setDeathCert, handleEffectCompletion);
        fetchData('marriagecert', setMarriageCert, handleEffectCompletion);
        fetchData('topregions', setTopRegions, handleEffectCompletion);
        fetchData('topprovinces', setTopProvinces, handleEffectCompletion);
        fetchData('topcities', setTopCities, handleEffectCompletion);
        fetchData('revenue', setRevenue, handleEffectCompletion);
        fetchData('verifiedusers', setVerifiedUsers, handleEffectCompletion);
      }, []);
    
      useEffect(() => {
        if (fetchCount > 10) {
          setLoading(false);
        }
      }, [fetchCount]);
    
      

    const handleEffectCompletion = () => {
        setFetchCount((prevCount) => prevCount + 1);
    };
    

  return (
    <DashboardContext.Provider 
    value={{
        transStats,
        transReport,
        revenue,
        verifiedUsers,
        totalPaid,
        totalRP,
        totalBP,
        totalCC,
        totalLCR,
        taxPayment,
        taxClearance,
        businessPermit,
        cedulaCert,
        birthCert,
        deathCert,
        marriageCert,
        topRegions,
        topProvinces,
        topCities
      }}
        >
      {children}
    </DashboardContext.Provider>
  );
};


export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
    return context;
};