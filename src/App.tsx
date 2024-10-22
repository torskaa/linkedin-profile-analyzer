import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import ProfileAnalysis from './components/ProfileAnalysis';

// Mock function for development environment
const mockGetProfileData = () => {
  return Promise.resolve({
    profileData: "John Doe Software Engineer Experienced software developer with a passion for creating efficient and scalable applications. Skills: JavaScript, React, Node.js, Python"
  });
};

function App() {
  const [profileData, setProfileData] = useState<string | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        // We're in a Chrome extension environment
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const currentTab = tabs[0];
          if (currentTab.id) {
            chrome.tabs.sendMessage(currentTab.id, { action: "getProfileData" }, (response) => {
              if (response && response.profileData) {
                setProfileData(response.profileData);
              }
            });
          }
        });
      } else {
        // We're in a development environment
        const response = await mockGetProfileData();
        setProfileData(response.profileData);
      }
    };

    getProfileData();
  }, []);

  return (
    <div className="w-96 p-6 bg-gradient-to-br from-blue-500 to-purple-600 min-h-[400px] text-white">
      <header className="flex items-center justify-center mb-6">
        <Brain className="w-10 h-10 text-white mr-3 animate-pulse" />
        <h1 className="text-2xl font-bold">LinkedIn Analyzer</h1>
      </header>
      {profileData ? (
        <ProfileAnalysis profileData={profileData} />
      ) : (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">
            {typeof chrome !== 'undefined' && chrome.tabs
              ? "Navigate to a LinkedIn profile"
              : "Loading mock profile data..."}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;