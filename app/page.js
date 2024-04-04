import Image from "next/image";
import { strapiFetcher } from "@/lib/api";
import Reviews from "@/components/Reviews"; 

export default async function Home() { 

  const books = await strapiFetcher('books?populate=*');  

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start">
        <h1 className="mt-10 mb-20 text-2xl">BOOKS</h1>
        <div className="mb-8 min-w-[900px] flex justify-between">{books.data.map((book) => {
          return (
            <div 
              key={book.id}
              className="w-full">
              <Image
                src={`http://127.0.0.1:1337${book.attributes.cover.data.attributes.url}`}
                alt="Book cover"
                width={200}
                height={300} />
              <p className="mb-4 text-xl font-semibold">{`${book.attributes.title}`}</p>
              <p>{`${book.attributes.author}`}</p>
            </div>
          )
        })}</div>
        <Reviews books={books} />
      </main>
    </>
  );
}

