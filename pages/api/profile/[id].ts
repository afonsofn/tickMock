import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') return
    
    try {
        const { id } = req.query

        const userQuery = singleUserQuery(id)
        const userPostsQuery = userCreatedPostsQuery(id)
        const userLikedQuery = userLikedPostsQuery(id)

        const [user] = await client.fetch(userQuery)
        const userPosts = await client.fetch(userPostsQuery)
        const userLikedPosts = await client.fetch(userLikedQuery)

        res.status(200).json({ user, userPosts, userLikedPosts })
    } catch (error) {
        
    }
}
