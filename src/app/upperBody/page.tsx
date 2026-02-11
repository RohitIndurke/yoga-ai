import React from 'react'
import Link from "next/link";
import { Button } from '~/components/ui/button';
const UpperBody = () => {
  return (
    <div>
         <h1 className='text-3xl font-bold text-center mt-10'>Upper Body Exercise</h1>
         <Button className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6'>
            <Link href="/upperBody/LBiceps-Curl">Start Biceps Curl Exercise</Link>
         </Button>
    </div>
  )
}

export default UpperBody
