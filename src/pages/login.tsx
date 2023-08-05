import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import ReactLoading from 'react-loading';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import { parseCookies, destroyCookie } from 'nookies';


export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation('common');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    setShowLoading(true);
    e.preventDefault();
    const resp = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
      redirect: false,
    });

    if (resp?.status === 401) {
      setShowError(true);
      setShowLoading(false);
    } else {
      const cookies = parseCookies();
      let nextUrl = '/';

      if (cookies.nextSession) {
        const nextSessionObj = JSON.parse(cookies.nextSession);
        nextUrl = nextSessionObj.url;
        destroyCookie(null, 'nextSession');
      } else {
        const raw = window.localStorage.getItem('nextSession') ?? '';

        if (raw !== '' && raw !== undefined && raw !== null) {
          const stored = JSON.parse(raw);
          if (stored) {
            nextUrl = String(stored?.url);
          }
        } else if (resp?.url) {
          nextUrl = String(resp?.url);
        }
      }

      router.push(nextUrl);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="relative z-10 flex sm:min-w-[500px] sm:max-w-[500px] min-w-[300px] px-4 py-8 justify-center bg-white rounded-lg shadow-md">
        <div className="flex flex-col flex-1 space-y-4">
          <h1 className="text-2xl font-semibold text-center text-red-500 ">{t('Login')}</h1>
          {showError && (
            <div className="px-8 py-4 mx-10 text-sm text-red-400 bg-red-100 rounded-lg">
              {t('login1')}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
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
                  className="w-full pl-4 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-full md:font-xs text focus:outline-none"
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
                  className="w-full h-full pl-4 text-gray-700 placeholder-gray-500 border-none rounded-full focus:outline-none"
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
                onClick={handleSubmit}
                type="submit"
                className="flex items-center justify-center w-full py-2 mt-3 text-center text-white bg-red-500 rounded-full hover:bg-red-400"
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
