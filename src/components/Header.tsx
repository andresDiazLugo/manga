import { Text,Container } from '@nextui-org/react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex justify-between items-center p-4 mw-w-xl m-auto'>
        
        <Link href="/"><h1 className='font-bold'>next <span className='font-light'>xkcd</span></h1></Link>
        
        <nav>

            <ul className="flex flex-row gap-4 text-xs" >
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/search">Search</Link></li>
            </ul >
        </nav>
    </header>
  )
}