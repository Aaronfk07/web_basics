import React from 'react'
import ListItem from './ListItem'

type Props = {
  items?: string[]
}

const List: React.FC<Props> = ({ items = ['Coffee', 'Tea', 'Beer'] }) => {
  function handleClick(label: string) {
    // popup message; specific messages for Tea and Beer requested
    if (label === 'Tea') alert('Tea clicked')
    else if (label === 'Beer') alert('Beer clicked')
    else alert(`${label} clicked`)
  }

  return (
    <div className="list" aria-label="demo-list">
      {items.map((it) => (
        <ListItem key={it} label={it} onClick={handleClick} />
      ))}
    </div>
  )
}

export default List
