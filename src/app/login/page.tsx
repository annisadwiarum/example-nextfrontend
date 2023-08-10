"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation('common');

  interface ValidationState {
    email: any;
    password: any;
    // Add other validation properties here if needed
  }

  const [validate, setValidate] = useState<ValidationState>({
    email: true,
    password: true,
    // Initialize other validation properties if needed
  });

  const router = useRouter();

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     router.push('/');
  //   }
  // }, []);

  const loginHandler = async (e: any) => {
    setShowLoading(true);
    e.preventDefault();

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/login',
        formData
      );
      console.log(response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
      router.push('/presence');
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
       <div className="absolute inset-0 bg-gradient-to-b from-orange-900 via-lime-800  to-teal-500 opacity-80"></div>
      <div className="relative z-10 flex sm:min-w-[500px] sm:max-w-[500px] min-w-[300px] px-4 py-8 justify-center bg-white rounded-lg shadow-md">
        <div className="flex flex-col flex-1 space-y-4">
          <h1 className="text-2xl font-semibold text-center text-orange-900 ">
            {t('Login')}
          </h1>
          {showError && (
            <div className="px-8 py-4 mx-10 text-sm text-orange-900 bg-red-100 rounded-lg">
              {t('login1')}
            </div>
          )}
          <form
            onSubmit={loginHandler}
            className="box-border flex flex-col px-5 space-y-2 sm:px-10 md:space-y-4"
          >
            <div className="items-center justify-center">
              <div className="flex flex-col gap-1">
                <h2 className="mt-3 text-xs text-gray-400 md:mt-10 ">
                  {t('Email')}
                </h2>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="w-full pl-4 text-gray-700 placeholder-gray-500 border h-10 border-gray-300 rounded-full md:font-xs text focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xs text-gray-400 ">{t('Password')}</h2>
              <div className="relative flex items-center justify-between w-full border border-gray-300 rounded-full">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-4 text-gray-700 placeholder-gray-500 h-10 border-none rounded-full focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev: boolean) => !prev)}
                  className="absolute right-0 w-5 h-5 mr-4"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-between">
                <Link
                  href="/register"
                  className="p-2 mr-2 text-sm text-right underline text-sky-500"
                >
                  {t('Register')}
                </Link>
                <Link
                  href="/forgot"
                  className="p-2 mr-2 text-sm text-right underline text-sky-500"
                >
                  {t('Forgot Password')}
                </Link>
              </div>
            </div>
            <div>
              <button
                onClick={loginHandler}
                type="submit"
                className="flex items-center justify-center w-full py-2 mt-3 text-center text-white bg-orange-900 rounded-full hover:bg-orange-800"
              >
                {showLoading && (
                  <ReactLoading
                    type="bubbles"
                    height={25}
                    width={30}
                    className="mr-8"
                  />
                )}
                {t('Login')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
