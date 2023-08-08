'use client';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Presence() {
  const [showLoading, setShowLoading] = useState(false);
  const [user, setUser] = useState<any>([]);
  const router = useRouter();
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    await axios
      .post('http://127.0.0.1:8000/api/auth/me')
      .then((response: any) => {
        setUser(response.data);
      })
      .catch((error: any) => {
        console.error('Error:', error.response.data);
      });
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }

    fetchData();
  }, []);

  const logoutHandler = async () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    await axios
      .post('http://127.0.0.1:8000/api/auth/logout')
      .then(() => {
        localStorage.removeItem('token');

        router.push('/login');
      })
      .catch((error: any) => {
        console.error('Error:', error.response.data);
      });
  };
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500 via-green-400 to-blue-500 rounded-lg opacity-80"></div>

      <div className="fixed flex flex-col gap-4 items-center">
        <div className="text-xl font-bold  text-red-700">
          {' '}
          Hello, {user.name}
        </div>
        <div className="text-xl font-bold  text-red-700">
          {' '}
          Welcome to the Seindo Travel Presence Website!
        </div>
        <div className="text-md font-bold"> Please select your Absent type</div>
        <div className="relative z-10 flex sm:min-w-[500px] sm:max-w-[500px] min-w-[300px] px-8 py-8 justify-center bg-white rounded-lg shadow-md">
          <div className="flex flex-col flex-1 gap-5 space-y-4">
            {/* <h1 className="text-2xl font-semibold text-center text-green-500 ">
              Presence
            </h1> */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center w-full py-2 text-center text-white bg-green-500 rounded-full hover:bg-green-600">
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
                className="flex items-center justify-center w-full py-2 text-center text-white bg-orange-500 rounded-full hover:bg-orange-600"
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
            <div>
              <button
              onClick={logoutHandler}
                type="submit"
                className="flex items-center justify-center w-full py-2 text-center text-white bg-red-500 rounded-full hover:bg-red-600"
              >
                {showLoading && (
                  <ReactLoading
                    type="bubbles"
                    height={25}
                    width={30}
                    className="mr-8"
                  />
                )}
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
