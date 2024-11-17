import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendarDay, FaCircleCheck, FaMap, FaStar, FaUtensils } from "react-icons/fa6";
import { LuShare } from "react-icons/lu";
import { IoIosHeartEmpty } from "react-icons/io";

const API_URL = 'https://laara-api-dev-3rc4fb3npa-ew.a.run.app/search/stays/';
const APP_ID = '3a2f3e5b-4a89-4fcb-a7e1-31421c7a6344';

const Property = () => {

  const { id } = useParams();
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const groupAmenitiesByCategory = () => {
    const grouped = {};
    property.propertyAmenities?.forEach(({ amenities }) => {
      if (!grouped[amenities.category]) {
        grouped[amenities.category] = [];
      }
      grouped[amenities.category].push(amenities);
    });
    return grouped;
  };
 
  const loadProperties = async () => {

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL+id, {
        headers: {
          'x-app-id': APP_ID,
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      setProperty(data.data)
     
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="p-6 bg-red-50 text-red-700 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Error loading property</h3>
          <p>{error}</p>
          <button 
            onClick={loadProperties}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

 
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 ">{property.name}</h1>
        <div className="flex items-center justify-between gap-4 text-gray-600">
          <div className="flex items-center gap-1 text-sm">
                <span className='text-black underline'>{`${property.address.town}, ${property.address.county}, ${property.address.country}`}</span>
          </div>
          <div className='flex items-center  gap-4'>
              <p className="inline-flex items-center gap-2 underline text-black">
              <LuShare />
              share
              </p>
              <p className="inline-flex items-center gap-2 underline text-black">
              <IoIosHeartEmpty />
              Save
              </p>
          </div>
        
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid lg:grid-cols-4 gap-4 mb-8">
        <div className="col-span-2 row-span-2">
          <img 
            src={property.propertyImages[selectedImageIndex].images.url} 
            alt={property.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 col-span-2 gap-4">
          {property.propertyImages.slice(1, 5).map((image, index) => (
            <img
              key={index}
              src={image.images.url}
              alt={`${property.name} ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90"
              onClick={() => setSelectedImageIndex(index + 1)}
            />
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex  gap:4 lg:gap-6 border-b mb-8">
        {['overview', 'rooms', 'amenities', 'policies'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 capitalize ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {/* Main Content */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* hosted by */}
              <hr />
              <div className='flex items-center gap-2'>
                <div className="host-profile bg-blue-900 text-white h-10 w-10 rounded-full ">
                  {/* should hold the host image  */}
                </div>
                <div className="host-info">
                  <p className='font-medium text-black'>
                    Hosted by  {property.host.firstName + ' ' + property.host.lastName} 
                  </p>
                  <p className="text-gray-400 text-sm">Professional Host · {property.staffImages?.length || 0} staff members</p>
                </div>
                
              </div>
              <hr />

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-4">About this property</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Languages Spoken</h3>
                <div className="flex gap-2">
                  {property.propertyLanguages.map(({ language }, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {language.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accessibility Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Accessibility</h3>
                <div className="grid lg:grid-cols-2 gap-4">
                  {property.accessibilityFeatures.map(({ features }, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FaCircleCheck className="w-5 h-5 text-green-500 mt-1" />
                      <span className="text-gray-600">{features.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="space-y-6">
              {property.rooms.map((room, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{room.roomTypes.name}</h3>
                      <p className="text-gray-600">{room.roomTypes.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${room.roomTypes.pricings[0].price}</p>
                      <p className="text-gray-500">per night</p>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Room Features</h4>
                      <ul className="space-y-2">
                        {room.roomTypes.roomTypeAmenities.map(({ amenities }, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-600">
                            <FaCircleCheck className="w-4 h-4 text-green-500" />
                            {amenities.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Bed Types</h4>
                      <ul className="space-y-2">
                        {room.roomTypes.bedTypes.map(({ bedType }, idx) => (
                          <li key={idx} className="text-gray-600">
                            • {bedType.name} ({bedType.description})
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                 
                </div>
              ))}
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="space-y-8">
              {Object.entries(groupAmenitiesByCategory()).map(([category, amenities]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-4">{category}</h3>
                  <div className="grid lg:grid-cols-2 gap-4">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCircleCheck className="w-5 h-5 text-green-500" />
                        <span className="text-gray-600">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-6">
              {property.propertyPolicies.map(({ policies }, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-medium mb-2">{policies.type}</h3>
                  <p className="text-gray-600">{policies.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 ">
          <div className="sticky top-8 bg-white rounded-xl shadow-lg p-6 border space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold">
                  ${property.rooms[0].roomTypes.pricings[0].price}
                </span>
                <span className="text-gray-600">/night</span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-medium">New</span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaCalendarDay className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">Check-in/out</p>
                  <p className="text-sm text-gray-600">
                    {property.propertyPolicies.find(p => p.policies.type === 'Check-In')?.policies.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaMap className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-gray-600">
                    {property.address.street}, {property.address.town}
                  </p>
                </div>
              </div>

              {property.mealOptions.length > 0 && (
                <div className="flex items-start gap-3">
                  <FaUtensils className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Meal Plans Available</p>
                    <div className="space-y-1">
                      {property.mealOptions.map((option, index) => (
                        <p key={index} className="text-sm text-gray-600">
                          • {option.plan.replace('_', ' ').toLowerCase()}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Reserve Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Property;