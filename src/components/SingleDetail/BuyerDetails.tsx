import React from 'react';

interface BuyerDetailsProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
}

const BuyerDetails: React.FC<BuyerDetailsProps> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  country,
  state,
  city,
  pincode,
}) => {
  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Buyer Information</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
              value={firstName}
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
              value={lastName}
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            value={email}
            readOnly
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            value={phoneNumber}
            readOnly
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Delivery Address</label>
          <input
            type="text"
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            value={address}
            readOnly
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
              value={country}
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
              value={state}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
              value={city}
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
              value={pincode}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BuyerDetails;
