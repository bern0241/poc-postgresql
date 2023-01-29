import React, {useState} from 'react'
import Image from 'next/image'

// function cn(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

function TeamImage({imagesrc, editable}) {
  const [isLoading, setLoading] = useState(true);

  return (
        <div class='group overflow-hidden rounded-lg'>
            <img 
            alt="Team Image"
            src={imagesrc ? imagesrc : "https://bit.ly/placeholder-img"}
            layout="fill"
            objectFit="cover"
            className={editable ? 'border cursor-pointer max-w-[9em] max-h-[10em] group-hover:opacity-75' : 
            'max-w-[9em] max-h-[10em]'}
            />
        </div>

  )
}

export default TeamImage