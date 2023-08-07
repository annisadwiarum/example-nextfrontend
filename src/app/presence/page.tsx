'use client';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Link from 'next/link';

export default function Presence() {
  const [showLoading, setShowLoading] = useState(false);
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500 via-green-400 to-blue-500 rounded-lg opacity-80"></div>

      <div className="fixed flex flex-col gap-4 items-center">
        <div className="text-xl font-bold  text-red-700">
          {' '}
          Welcome to the Seindo Travel Presence Website!
        </div>
        <div className="text-md font-bold"> Please select your Absent type</div>
        <div className="relative z-10 flex sm:min-w-[500px] sm:max-w-[500px] min-w-[300px] px-8 py-8 justify-center bg-white rounded-lg shadow-md">
          <div className="flex flex-col flex-1 space-y-4">
            {/* <h1 className="text-2xl font-semibold text-center text-green-500 ">
              Presence
            </h1> */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center w-full py-2 text-center text-white bg-green-500 rounded-full hover:bg-green-400">
                <Link href="/entry">Absent Entry</Link>
                {showLoading && (
                  <ReactLoading
                    type="bubbles"
                    height={25}
                    width={30}
                    className="mr-8"
                  />
                )}
                
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full py-2 text-center text-white bg-red-500 rounded-full hover:bg-red-400"
              >
                {showLoading && (
                  <ReactLoading
                    type="bubbles"
                    height={25}
                    width={30}
                    className="mr-8"
                  />
                )}
                Absent Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
