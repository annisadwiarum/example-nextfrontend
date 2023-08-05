import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import ReactLoading from 'react-loading';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import Api from '@/helper/api';
import { destroyCookie, parseCookies } from 'nookies';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';

export default function Login({ referral, dialCodeList }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation('common');
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
    const [isDuplicateName, setIsDuplicateName] = useState(false);


  interface ValidationState {
    name: any;
    email: any;
    password: any;
    // Add other validation properties here if needed
  }

  const [validate, setValidate] = useState<ValidationState>({
    name: false,
    email: false,
    password: false,
    // Initialize other validation properties if needed
  });

  const router = useRouter();

  const registerHandler = async (e: any) => {
    e.preventDefault();

//      // Check for duplicate name
//   const isDuplicate = await checkForDuplicateName(name);

//   if (isDuplicate) {
//     setIsDuplicateName(true);
//     return;
//   }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/register',
        formData
      );
      router.push('/login');
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="relative z-10 flex sm:min-w-[500px] sm:max-w-[500px] min-w-[300px] px-4 py-8 justify-center bg-white rounded-lg shadow-md">
        <div className="flex flex-col flex-1 space-y-4">
          <h1 className="text-2xl font-semibold text-center ">
            {t('Register')}
          </h1>
          {showError && (
            <div className="px-8 py-4 mx-10 text-sm text-red-400 bg-red-100 rounded-lg">
              {message}
            </div>
          )}

          <div className="box-border flex flex-col px-5 space-y-2 sm:px-10 md:space-y-4">
            <div className="flex flex-col gap-3 mt-0 md:flex-row md:mt-3">
              <div className="flex-1">
                <label htmlFor="name" className="text-xs text-gray-400">
                  {t('First Name')}
                </label>
                <div className="">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(v: any) => setName(v.target.value)}
                    className="w-full pl-4 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-full focus:outline-none "
                  />
                  {validate.name && (
                    <p className="text-red-500 text-xs mt-1"> Name is required.
                      { validate.name[0] }
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="items-center justify-center ">
              <div className="flex-1">
                <label htmlFor="email" className="text-xs text-gray-400">
                  {t('Email')}
                </label>
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="w-full pl-4 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-full focus:outline-none"
              />
                 {validate.email && (
                    <p className="text-red-500 text-xs mt-1"> Name is required.
                      {/* { validate.email[0] } */}
                    </p>
                  )}
            </div>
            <div className="flex flex-col gap-3 mt-10 md:flex-row">
              <div className="flex-1">
                <label htmlFor="password" className="text-xs text-gray-400">
                  {t('Password')}
                </label>
                <div className="rounded-full w-full relative h-[45px] sm:h-[54px] border text-sm border-gray-300 flex justify-between items-center">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full h-full pl-4 text-gray-700 placeholder-gray-500 border-none rounded-full focus:outline-none"
                  />
                     {validate.password && (
                    <p className="text-red-500 text-xs mt-1"> Name is required.
                      {/* { validate.password[0] } */}
                    </p>
                  )}
                  <button
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
              </div>
              <div className="flex-1">
                <label
                  htmlFor="passwordConfirmation"
                  className="text-xs text-gray-400"
                >
                  {t('Password Confirmation')}
                </label>
                <div className="rounded-full w-full relative h-[45px] sm:h-[54px] border text-sm border-gray-300 flex justify-between items-center">
                  <input
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    className="w-full h-full pl-4 placeholder-gray-500 border-none rounded-full border-nonetext-gray-700 focus:outline-none"
                  />
                  <button
                    onClick={() =>
                      setShowPasswordConfirmation((prev: boolean) => !prev)
                    }
                    className="absolute right-0 w-5 h-5 mr-4"
                  >
                    {showPasswordConfirmation ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={registerHandler}
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
                {t('Register')}
              </button>
              <div className="flex justify-center mt-1">
                <h1 className="text-sm italic"> {t('indexregister1')} </h1>
                <Link
                  href="/login"
                  className="ml-1 text-sm font-semibold text-red-600 hover:text-red-400"
                >
                  {t('Login')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
