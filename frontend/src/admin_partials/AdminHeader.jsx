import React, { useState, useEffect } from 'react';

import axios from 'axios';

import ThemeToggle from '../partials/ThemeToggle';
import AdminDropdownProfile from './AdminDropdownProfile';
import { useParams } from 'react-router-dom';

function AdminHeader({ sidebarOpen, setSidebarOpen }) {

  const [storedImage, setStoredImage] = useState('');
  const [userImage, setUserImage] = useState('');

  const { admin_type } = useParams();


  useEffect(()=>{
    const fetchUserImage= async()=>{
        try{
            const res= await axios.get(`http://localhost:8800/adminprofile/${admin_type}`)
            setStoredImage(res.data[0])

        }catch(err){
            console.log(err)
        }
    }
    fetchUserImage()
  },[])


  const checkUserImage = async () => {
    try {
      const imagePath = '../uploads/adminImages/';
      const imageName = storedImage?.admin_image;
  
      if (imageName === undefined || imageName === null) {
        return;
      }
  
      const isFileExists = await checkFileExists(imagePath, imageName);
  
      if (isFileExists !== null && isFileExists !== undefined) {
        if (isFileExists) {
          const fileData = await fetchFileData(`${imagePath}${imageName}`);
          if (fileData) {
            setUserImage(fileData);
            // console.log(`File ${imageName} exists.`);
          } else {
            // console.log(`File data for ${imageName} is empty or undefined.`);
          }
        } else {
          console.log(`File: ${imageName} does not exist.`);
        }
      }
    } catch (error) {
      console.error('Error checking user image path:', error);
    }
  };

  useEffect(() => {
    checkUserImage();
  }, [storedImage]);

  const checkFileExists = async (folderPath, fileName) => {
    try {
      const filePath = `${folderPath}/${fileName}`;
      const response = await fetch(filePath);

      return response.ok;
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  };

  const fetchFileData = async (filePath) => {
    try {
      const response = await fetch(filePath);
  
      if (!response.ok) {
        if (response.status === 404) {
          console.log('File not found.');
        } else {
          throw new Error(`Failed to fetch file from ${filePath}`);
        }
        return null;
      }
  
      const fileData = await response.blob();
  
      if (!fileData || fileData.size === 0) {
        console.log('File data is empty or undefined.');
        return null;
      }
  
      const dataUrl = URL.createObjectURL(fileData);
  
      return dataUrl;
    } catch (error) {
      console.error('Error fetching file data:', error);
      return null;
    }
  };



  return (
    <header className="sticky top-0 bg-white dark:bg-[#181818] border-b border-slate-200 dark:border-[#3d3d3d] z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <div>
              {/* <button
                className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#2b2a2a] dark:hover:bg-[#3d3d3d] rounded-full ml-3 ${
                  searchModalOpen && 'bg-slate-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchModalOpen(true);
                }}
                aria-controls="search-modal"
              >
                <span className="sr-only">Search</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="fill-current text-slate-500 dark:text-slate-400"
                    d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                  />
                  <path
                    className="fill-current text-slate-400 dark:text-slate-500"
                    d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                  />
                </svg>
              </button> */}
              {/* <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} /> */}
            </div>
            <ThemeToggle />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <AdminDropdownProfile align="right" admin_type={admin_type} userImage={userImage} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
