const Reviews = ({books}) => {

  return (
    <div className="mb-8 min-w-[900px] flex justify-between">{books.data.map((book) => {
      return (
        <div 
          key={book.id}
          className="w-full">
          <p className="mb-4 text-xl">Review:</p>
          <p>Only logged in users</p>
          <p>can see the reviews</p>
        </div>
      )
    })}</div>
  )
}

export default Reviews