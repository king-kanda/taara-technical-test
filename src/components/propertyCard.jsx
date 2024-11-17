import { useState } from 'react';
import PropTypes from 'prop-types';
import { CiHeart } from "react-icons/ci";
import { GiMeal } from "react-icons/gi";
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % property.propertyImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.propertyImages.length - 1 : prev - 1
    );
  };

  // Get the lowest price across all room types and meal plans
  const getLowestPrice = () => {
    let lowestPrice = Infinity;
    property.rooms.forEach(room => {
      room.roomTypes.pricings.forEach(pricing => {
        if (pricing.price < lowestPrice) {
          lowestPrice = pricing.price;
        }
      });
    });
    return lowestPrice === Infinity ? null : lowestPrice;
  };

  return (
    <div className="relative max-w-sm overflow-hidden bg-white ">
      {/* Image Container */}
      <div className="relative w-full h-64">
        <img 
          src={property.propertyImages[currentImageIndex].images.url}
          alt={`${property.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />
        
        {/* Image Navigation */}
        <button 
          onClick={prevImage}
          className="absolute top-1/2 left-3 p-2 rounded-full bg-white/90 hover:bg-white transform -translate-y-1/2"
        >
          <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <button 
          onClick={nextImage}
          className="absolute top-1/2 right-3 p-2 rounded-full bg-white/90 hover:bg-white transform -translate-y-1/2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white">
          <CiHeart className="w-5 h-5" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs">
          {currentImageIndex + 1}/{property.propertyImages.length}
        </div>
      </div>

      {/* Content */}
      <div className="py-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <Link to={`/property/${property.id}`}>
                <h3 className="font-medium text-lg text-gray-900">{property.name}</h3>
            </Link>
            <p className="text-sm text-gray-600 mb-1">{property.description}</p>
            <p className="text-sm text-gray-500">
              {property.address.city}, {property.address.country}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="font-medium text-sm">
              {property._count.reviews > 0 ? property._count.reviews : "New"}
            </span>
          </div>
        </div>

        {/* Meal Options */}
        <div className="flex gap-2 mb-3">
          <GiMeal className="w-5 h-5 text-gray-600" />
          <div className="flex flex-wrap gap-1">
            {property.mealOptions.map((option, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 px-2 py-1 rounded-full"
              >
                {option.plan.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mt-4">
          <p className="text-lg font-semibold">
            From ${getLowestPrice()}
            <span className="text-sm font-normal text-gray-600">/night</span>
          </p>
        </div>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.shape({
      country: PropTypes.string.isRequired,
      county: PropTypes.string.isRequired,
      town: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    _count: PropTypes.shape({
      reviews: PropTypes.number.isRequired,
    }).isRequired,
    propertyRatings: PropTypes.number,
    propertyImages: PropTypes.arrayOf(
      PropTypes.shape({
        images: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    mealOptions: PropTypes.arrayOf(
      PropTypes.shape({
        plan: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
    rooms: PropTypes.arrayOf(
      PropTypes.shape({
        roomTypes: PropTypes.shape({
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          pricings: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              price: PropTypes.number.isRequired,
              pricingMode: PropTypes.string.isRequired,
              occupants: PropTypes.number.isRequired,
              mealOption: PropTypes.shape({
                plan: PropTypes.string.isRequired,
                description: PropTypes.string,
              }).isRequired,
            })
          ).isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PropertyCard;