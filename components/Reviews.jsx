'use client'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { strapiFetcher } from '@/lib/api';

const Reviews = ({ booksWithoutReviews }) => {

  const jwt = useSelector((state) => state.user.jwt)
  const [books, setBooks] = useState(booksWithoutReviews);

  useEffect(() => {
   
    const getBooks = async () => {

      const booksData = await strapiFetcher('books?populate=*',
        jwt ?
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          }
          : '')
      setBooks( booksData )

    }
    
    getBooks()
    
  }, [jwt])
  
  return (
    <div className="mb-8 min-w-[1200px] flex justify-between">
      {books.data.map((book) => {
      return (
        <div 
          key={book.id}
          className="w-full">
          <p className="mb-4 text-xl">Reviews:</p>
          {book.attributes.reviews ? (
            book.attributes.reviews.data.map((review) => {
              return (
                <div key={review.id}>
                  <p className='font-semibold'>{review.attributes.reviewer}:</p>
                  <p className='mb-4 max-w-[400px] text-sm'>{review.attributes.review}</p>
                </div>
              )
            })
          ):(
            <div>
              <p>Only logged in users</p>
              <p>can see the reviews</p>
            </div>
          )

          }
        </div>
      )
    })}
    </div>
  )
}

export default Reviews