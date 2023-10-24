import React from 'react'

interface Props {
  id: number,
  name: string,
  totalQuestion? :number,
  showCount? : boolean
}

const RenderTag = ({id,name,totalQuestion,showCount} : Props) => {
  return (
    <div>RenderTag</div>
  )
}

export default RenderTag