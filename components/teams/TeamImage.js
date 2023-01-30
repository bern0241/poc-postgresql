import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
// NEW PACKAGES FOR SAVING TO SUPABASE
import { SessionContextProvider } from '@supabase/auth-helpers-react'; //wrap around _app.js (Video: 4:38)
import { createClient } from '@supabase/supabase-js';

const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrc2tua3dneGhhbmh0aWxueWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2MDMwOTIsImV4cCI6MTk5MDE3OTA5Mn0.wv3HM3vosHyiJrhMmha4ocHQxcvwxiUBq9QKHeFHCkc'

const supabase = createClient('https://cksknkwgxhanhtilnycs.supabase.co', anonKey, {
  headers: {
    apiKey: anonKey,
    // Authorization: `Bearer ${jwt}`
  }});



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
        // const {data, error} = await supabase.storage.from('s4sw6j_1/team-image').upload(`${Date.now()} ${image.name}`, image)

        //get images
        const {data,error} = await supabase.storage.from('public/team-image22').list()

        console.log('Data:', data);
        console.log('DataKey:', data.Key);

        if (error) {
          console.error(error);
        }

        return;
       
        const resp = fetch('http://localhost:3000/api/team-image/' + id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({newImageUrl: 'https://i.etsystatic.com/22851110/r/il/f6d419/2336545826/il_1588xN.2336545826_al2n.jpg'})
        }).then(() => {
          router.refresh();
        })
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div class='group overflow-hidden rounded-lg'>
          {/* <input class='' type="file" accept={"image/*"} 
            onChange={(e) => setImage(e.target.files[0])}/> */}
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