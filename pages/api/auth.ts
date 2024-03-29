import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') return
    
    try {
        await client.createIfNotExists(req.body)

        res.status(200).json('Login success')
    } catch (error) {
        
    }
}
