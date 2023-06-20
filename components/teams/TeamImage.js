import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
// NEW PACKAGES FOR SAVING TO SUPABASE
import { SessionContextProvider } from '@supabase/auth-helpers-react'; //wrap around _app.js (Video: 4:38)
import { createClient } from '@supabase/supabase-js';

const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrc2tua3dneGhhbmh0aWxueWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2MDMwOTIsImV4cCI6MTk5MDE3OTA5Mn0.wv3HM3vosHyiJrhMmha4ocHQxcvwxiUBq9QKHeFHCkc'

const supabase = createClient('https://cksknkwgxhanhtilnycs.supabase.co', anonKey);

const supabaseBucketUrl = 'https://cksknkwgxhanhtilnycs.supabase.co/storage/v1/object/public/team-image/';


function TeamImage({imagesrc, editable}) {
    const [isLoading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [image, setImage] = useState(null);

    const id = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
      console.log("Image changed:", image);
      uploadProfileImage();
    }, [image])



  const uploadProfileImage = async () => {
    if (!editable) return;
    if (!image) return;
    
    
    try {
        // upload image, then fetch url
        const {data, error} = await supabase.storage.from('team-image').upload(`${Date.now()}_${image.name}`, image)
        //get images
        // const {data,error} = await supabase.storage.from('team-image').list()

        const newImageUrl = `${supabaseBucketUrl}${data.path}`
        console.log('New Image:', newImageUrl);

        if (error) {
          console.error(error);
        }
       
        const resp = fetch('https://candid-dolphin-08c29e.netlify.app/api/team-image/' + id, {
        // const resp = fetch('http://localhost:3000/api/team-image/' + id, {
        // const resp = fetch(`${process.env.NEXT_PUBLIC_URL}/api/team-image/` + id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({newImageUrl: newImageUrl})
        }).then(() => {
          router.refresh();
        })
    } catch (error) {
      console.error(error.message);
    }
  }

  if (editable) {
    return (
      <div className='group overflow-hidden rounded-lg'>
          <input className='hidden' id='file' type="file" multiple accept={"image/*"} 
            onChange={(e) => setImage(e.target.files[0])}/>
              <label for='file'>
              <img 
              alt="Team Image"
              src={imagesrc ? imagesrc : "https://bit.ly/placeholder-img"}
              layout="fill"
              objectFit="cover"
              className={editable ? 'border border-gray-300 cursor-pointer max-w-[9em] max-h-[10em] group-hover:opacity-50' : 
              'max-w-[9em] max-h-[10em]'}
              />
            </label>
        </div>
    )
  } else {
    return (
      <div className='group overflow-hidden rounded-lg'>
              <img 
              alt="Team Image"
              src={imagesrc ? imagesrc : "https://bit.ly/placeholder-img"}
              layout="fill"
              objectFit="cover"
              className={editable ? 'border border-gray-300 cursor-pointer max-w-[9em] max-h-[10em] group-hover:opacity-50' : 
              'max-w-[9em] max-h-[10em]'}
              />
        </div>
    )
  }
  
}

export default TeamImage