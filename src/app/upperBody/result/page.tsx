import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'

const page = () => {
    return (
        <div>
            <div>Congratulation U did well</div>
            <div>burn cal : 500🔥</div>
            <Link href="/"><Button>Back to Home</Button></Link>
        </div>
    )
}

export default page