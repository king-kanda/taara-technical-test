import { useState, useEffect } from 'react';
import PropertyCard from '../components/propertyCard';

const API_URL = 'https://laara-api-dev-3rc4fb3npa-ew.a.run.app/search/stays/filtered';
const APP_ID = '3a2f3e5b-4a89-4fcb-a7e1-31421c7a6344';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const loadProperties = async () => {

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL, {
        headers: {
          'x-app-id': APP_ID,
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProperties(data.data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }

  };


  useEffect(() => {
    loadProperties();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md h-[70vh]">
        <h3 className="font-semibold">Error loading properties</h3>
        <p>{error}</p>
        <button 
          onClick={loadProperties}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="p-4 bg-gray-50 text-gray-700 rounded-md h-[70vh]">
        No properties found.
      </div>
    );
  }

  return (
    <div className="container properties-section m-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property , index)=>(
          <PropertyCard key={index} property={property}/>
        ))}
      </div>
      
    </div>
  );
};

export default Properties;