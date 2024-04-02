import { get } from "http";
import Image from "next/image";
import { strapiFetcher } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default async function Home() { 

  const books = await strapiFetcher('books');  

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start">
        <h1 className="mt-10 mb-20 text-2xl">BOOKS</h1>
        <div>{books.data.map((book) => {
          return (
            <div key={book.id}>
              <p>{`${book.id}. ${book.attributes.title}`}</p>
            </div>
          )
        })}</div>
      </main>
    </>
  );
}

