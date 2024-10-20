// components/footer/Newsletter.tsx
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <div className="bg-blue-600 w-[90vw] md:w-[70vw] md:mx-auto px-4 text-white py-8  md:px-16 rounded-lg">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 text-center">Do you have any questions?</h2>
      <p className="text-center mb-4">We will provide detailed information about our services, types of work, and projects.</p>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-2">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-4 py-2 rounded-lg text-black w-full sm:w-1/2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-white text-blue-600 px-6 py-2 w-full md:w-fit rounded-lg hover:bg-gray-200 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
