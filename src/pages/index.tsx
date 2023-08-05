import Image from 'next/image';
import Router from 'next/router';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-red-500'>
      <Link href="/welcome">
        <p>Hello</p>
      </Link>
      <Link href="/login">
        <p>Login Page</p>
      </Link>
      <Link href="/register">
        <p>Register Page</p>
      </Link>
      <Link href="/home">
        <p>Home Page</p>
      </Link>
    </div>
  );
}