import Image from 'next/image';
import React, { useState } from 'react';
import { BsCopy } from "react-icons/bs";

interface ModalContentProps {
  closeModal: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ closeModal }) => {
  const [textToCopy, setTextToCopy] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);


  const handleCopyText = () => {
    navigator.clipboard.writeText(textToCopy).then(()=>{
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-5">
        <Image src="/images/shared/aiShopee.png" alt="aiShopee" width={150} height={150}/>
      </div>
      <p className="text-gray-500 text-center mb-6">
        Enter a short description of your product, include the most important advantages of the item
      </p>

      <textarea 
        placeholder="Write a short description here..."
        className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows={4}
      ></textarea>

      <p className="text-gray-500 text-center mb-2">
        Here AIShophe will prepare a complete and advanced description for you
      </p>

      <textarea 
        value={textToCopy}
        onChange={(e) => setTextToCopy(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        rows={4}
      ></textarea>

      <div className="flex justify-between">
      <button 
          onClick={handleCopyText}
          type='button'
          className={`flex items-center justify-center gap-3 px-4 py-2 rounded-lg transition 
            ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'}`}>
          <BsCopy />
          {copied ? 'Copied' : 'Copy text'}
        </button>
        <button 
          onClick={closeModal} 
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
