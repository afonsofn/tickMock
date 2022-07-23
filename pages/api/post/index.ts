import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { allPostsQuery } from '../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const query = allPostsQuery()

        const data = await client.fetch(query);

        const sanityUrl = 'https://cdn.sanity.io/images/pskrkik1/production/'

        await data.forEach((ele: any) => {
            const [type, id, dimentions, format] = ele.postedBy.image.asset._ref.split('-')

            ele.postedBy.urlImage = `${sanityUrl}${id}-${dimentions}.${format}`
        });
        
        res.status(200).json(data)
    }
}
