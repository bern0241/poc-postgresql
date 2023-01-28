import React, {useState} from 'react'
import Image from 'next/image'

// function cn(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

function TeamImage({imagesrc}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href="#" className='group'>
        <div class='overflow-hidden rounded-lg'>
            <img 
            alt=""
            src={imagesrc ? imagesrc : "https://bit.ly/placeholder-img"}
            layout="fill"
            objectFit="cover"
            className='max-w-[10em] max-h-[10em] group-hover:opacity-75'
            />
        </div>
        {/* <h3 className='mt-4 text-sm text-gray-700'>Justin Bernard</h3>
        <p className='mt-1 text-lg font-medium text-gray-900'>@Justin</p> */}
    </a>
  )
}

export default TeamImage