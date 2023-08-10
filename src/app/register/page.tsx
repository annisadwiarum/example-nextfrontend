'use client';
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation('common');
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [positionList, setPositionList] = useState<any>([]);
  const [roleList, setRoleList] = useState<any>([]);

  const loadPosition = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/position'); // Adjust the endpoint URL accordingly
      setPositionList(response.data);
    } catch (error) {
      console.error('Error loading positions:', error);
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted

    if (positionList.length === 0) {
      loadPosition();
    }

    return () => {
      isMounted = false; // Cleanup function to set the flag to false when unmounting
    };
  }, [positionList]); // Add positionList as a dependency

  const loadRole = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/role'); // Adjust the endpoint URL accordingly
      setRoleList(response.data);
    } catch (error) {
      console.error('Error loading roles:', error);
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted

    if (roleList.length === 0) {
      loadRole();
    }

    return () => {
      isMounted = false; // Cleanup function to set the flag to false when unmounting
    };
  }, [roleList]); // Add positionList as a dependency

  interface ValidationState {
    name: any;
    email: any;
    password: any;
    // Add other validation properties here if needed
  }

  const [validate, setValidate] = useState<ValidationState>({
    name: true,
    email: true,
    password: true,
    // Initialize other validation properties if needed
  });

  const router = useRouter();
  //  useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     router.push('/');
  //   }
  // }, []);

  const registerHandler = async (e: any) => {
    setShowLoading(true);
    e.preventDefault();

    const payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      phone: phone,
      position_id: position,
      role_id: role,
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/register',
        payload
      );
      console.log(response.data);
      router.push('/login');
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900 via-lime-800  to-teal-500 opacity-80"></div>
      <div className="relative z-10 flex sm:min-w-[500px] sm:max-w-[500px] min-w-[300px] px-4 py-8 justify-center bg-white rounded-lg shadow-md">
        <div className="flex flex-col flex-1 space-y-4">
          <h1 className="text-2xl font-semibold text-orange-900 text-center ">
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
                  Name
                </label>
                <div className="">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(v: any) => setName(v.target.value)}
                    className="w-full pl-4 text-gray-700 placeholder-gray-500 h-10 border border-gray-300 rounded-full focus:outline-none "
                  />
                  {/* {validate.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {' '}
                      Name is required.
                      {validate.name[0]}
                    </p>
                  )} */}
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
                className="w-full pl-4 text-gray-700 placeholder-gray-500 border h-10 border-gray-300 rounded-full focus:outline-none"
              />
              {/* {validate.email && (
                <p className="text-red-500 text-xs mt-1">
                  {' '}
                  Name is required.
                  { validate.email[0] }
                </p>
              )} */}
            </div>
            <div className="flex flex-col gap-3 mt-10 md:flex-row">
              <div className="flex-1">
                <label htmlFor="password" className="text-xs text-gray-400">
                  {t('Password')}
                </label>
                <div className="rounded-full w-full relative border text-sm border-gray-300 flex justify-between items-center">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full h-10 pl-4 text-gray-700 placeholder-gray-500 border-none rounded-full focus:outline-none"
                  />
                  {/* {validate.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {' '}
                      Name is required.
                      { validate.password[0] }
                    </p>
                  )} */}
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
                <div className="rounded-full w-full relative border text-sm border-gray-300 flex justify-between items-center">
                  <input
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    className="w-full h-10 pl-4 placeholder-gray-500 border-none rounded-full border-nonetext-gray-700 focus:outline-none"
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
            <div className="items-center justify-center ">
              <div className="flex-1">
                <label htmlFor="phone" className="text-xs text-gray-400">
                  {t('Phone Number')}
                </label>
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                className="w-full pl-4 text-gray-700 placeholder-gray-500 border h-10 border-gray-300 rounded-full focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <div className="items-center justify-center ">
                <div className="flex-1">
                  <label htmlFor="position" className="text-xs text-gray-400">
                    {t('Select Position')}
                  </label>
                </div>
                <select
                  name="position"
                  id="position"
                  value={position}
                  onChange={(e: any) => setPosition(e.target.value)}
                  className="block w-full p-4 h-10 border-0 py-1.5 rounded-full text-gray-700 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled selected>
                    {' '}
                    Select Position
                  </option>
                  {positionList.map((v: any, i: number) => (
                    <option key={v.id} value={v.id}>
                      {v.name} {/* Display the role name instead of the ID */}
                    </option>
                  ))}
                </select>
              </div>
              <div className="items-center justify-center ">
                <div className="flex-1">
                  <label htmlFor="role" className="text-xs text-gray-400">
                    {t('Select Role')}
                  </label>
                </div>
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e: any) => setRole(e.target.value)}
                  className="block w-full p-4 h-10 border-0 py-1.5 rounded-full text-gray-700 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                >
                  {roleList.map((v: any, i: number) => (
                    <option key={v.id} value={v.id}>
                      {v.name} {/* Display the role name instead of the ID */}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={registerHandler}
                className="flex items-center justify-center w-full py-2 text-center mt-3 text-white bg-orange-900 rounded-full hover:bg-orange-800"
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
                <h1 className="text-sm italic">
                  {' '}
                  You already have an account?{' '}
                </h1>
                <Link
                  href="/login"
                  className="ml-1 text-sm font-semibold text-orange-900 hover:text-orange-800"
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
