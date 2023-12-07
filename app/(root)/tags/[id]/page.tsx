import React from 'react'

const TagDetailsPage = ({params,searchParams}) => {
  console.log(searchParams)
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  )
}

export default TagDetailsPage