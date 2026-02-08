import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
    const page = () => {
  return (
    <>
    <div>start Exercise</div>
    <Link href={"/pose"}><Button>sit up</Button></Link>
    </>
  )
}

export default page
