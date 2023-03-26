import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import {Container, Card, Row, Text} from '@nextui-org/react'
import Header from '@/components/Header'
import fs from 'fs/promises';

const inter = Inter({ subsets: ['latin'] })

export default function Home({latestComics}:any) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
    <main>
      <h2 className='text-3xl font-bold text-center'>Latest Comics</h2>
          <section className='grid grid-cols-2 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3'>
            {

              latestComics.map((comic: any ) =>{
                return (
                  <Link key={comic.id} href={`/comic/${comic.id}`}>
                    <h3 className='font-bold text-sm text-center pb-2'>{comic.title}</h3>
                    <img src={comic.img} width={comic.width} height={comic.height}/>
                  </Link>
                )
              })
            }
          </section>
    </main>
    </>
  )
}

export async function getStaticProps(context:any){
 console.log(context);
 const files = await fs.readdir('src/comics');
 const lastestComics= files.slice(-8,files.length);
 const promisesReadFiles = lastestComics.map(async (file)=>{ 
 const content = await fs.readFile(`src/comics/${file}`,'utf8');
  return  JSON.parse(content);
})

const latestComics = await Promise.all(promisesReadFiles);

 return {
  props:{
    latestComics
  }
 }
}