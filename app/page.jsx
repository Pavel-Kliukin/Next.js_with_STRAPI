import Image from "next/image";
import { strapiFetcher } from "@/lib/api";
import Reviews from "@/components/Reviews"; 

export default async function Home() { 

  const books = await strapiFetcher('books?populate=*');  

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start">
        <h1 className="mt-10 mb-20 text-2xl font-bold">BOOKS</h1>
        <div className="mb-8 min-w-[1200px] flex justify-between">{books.data.map((book) => {
          return (
            <div 
              key={book.id}
              className="w-full">
              <p className="mb-4 text-xl font-semibold">{`${book.attributes.title}`}</p>
              <p className="font-light">{`by ${book.attributes.author}`}</p>
              <Image
                src={`http://127.0.0.1:1337${book.attributes.cover.data.attributes.url}`}
                alt="Book cover"
                width={200}
                height={300} 
                />
              <div className="mt-2 font-semibold">{`${book.attributes.price} €`}</div>
            </div>
          )
        })}</div>
        <Reviews booksWithoutReviews = {books} />
      </main>
    </>
  );
}

