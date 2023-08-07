import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-red-500'>
      <Link href="/login">
        <p>Login Page</p>
      </Link>
      <Link href="/register">
        <p>Register Page</p>
      </Link>
    </div>
  );
}