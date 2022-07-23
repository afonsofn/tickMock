import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { allPostsQuery } from '../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        try {
            const query = allPostsQuery()
    
            const data = await client.fetch(query);
        
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error)
        }
    }
    if(req.method === 'POST') {
        try {
            await client.create(req.body);
        
            res.status(201).json('Video created')
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
