import Head from 'next/head';
import Image from 'next/image';
import {readFile, stat, readdir} from 'fs/promises';
import Header from '@/components/Header';
import Link from 'next/link';
import {basename} from 'path'

export default function Comic({ img, alt, title, width, height,nextId, prevId, hasNext, hasPrevious}:any) {
  return( <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
    <main>
      <section className='max-w-lg m-auto'>
        <h1 className='font-bold'>{title}</h1>
        <img width={width} height={height} src={img} alt={alt}/> 
        <p>{alt}</p>
        <div className='text-center mt-8'>
          {hasPrevious && <Link className=' p-3 bg-blue-500 font-bold rounded-md text-white mr-2' href={`/comic/${prevId}`}>Previus</Link>}
          {hasNext && <Link className=' p-3 bg-blue-500 font-bold rounded-md text-white ml-2' href={`/comic/${nextId}`}>Next</Link>}
        </div>
      </section>
      
      
    </main>
  </>)
}

export async function getStaticPaths(){// esto tiene sentido usar cuando quieres tener paginas estaticas ya que cuando hagas el build esto ejecutara la cantidad de peticiones para tener todos los archivos en html
 const files = await readdir('src/comics');

 const paths = files.map(file=>{
 const id = basename(file,'.json');
 return { params : {id}}
 })
  return{
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}:any){
 const {id} = params;
 const content =  await readFile(`src/comics/${id}.json`,'utf8');
 const comic = JSON.parse(content);
 
 const idNumber = +id//transformamos con el unite operator
 const nextId = idNumber + 1
 const prevId = idNumber - 1

 const [prevResult, nextResult] = await Promise.allSettled([
  stat(`src/comics/${prevId}.json`),
  stat(`src/comics/${nextId}.json`),

 ])
 const hasPrevious = prevResult.status === 'fulfilled';
 const hasNext = nextResult.status === 'fulfilled';
//otra forma de hacerlo es de la siguiente manera
//no lo hacemos de esta manera por que ya tenemos en una carpeta la informacion que vamos a usar
//  const content = await fetch(`https://xkcd.com/${id}/info.0.json`);
// const json = await resizeBy.json();

//  console.log("sss",params);
//   const files = await fs.readdir('src/comics');
//   const lastestComics= files.slice(-8,files.length);
//   const promisesReadFiles = lastestComics.map(async (file)=>{
//    const content = await fs.readFile(`src/comics/${file}`,'utf8');
//    return  JSON.parse(content);
//  })
 
//  const latestComics = await Promise.all(promisesReadFiles);
//  console.log(latestComics);
  return {
   props:{
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId
   }
  }
 }