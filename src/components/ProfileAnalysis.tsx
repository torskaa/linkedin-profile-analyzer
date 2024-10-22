import React, { useState, useEffect } from 'react';
import { analyzeProfile } from '../utils/aiAnalysis';

interface ProfileAnalysisProps {
  profileData: string;
}

const ProfileAnalysis: React.FC<ProfileAnalysisProps> = ({ profileData }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performAnalysis = async () => {
      setLoading(true);
      const result = await analyzeProfile(profileData);
      setAnalysis(result);
      setLoading(false);
    };

    performAnalysis();
  }, [profileData]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Analyzing profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 backdrop-filter backdrop-blur-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Profile Analysis</h2>
      <div className="text-white space-y-2">
        {analysis?.split('\n').map((line, index) => (
          <p key={index} className="transition-all duration-300 ease-in-out hover:translate-x-1">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProfileAnalysis;