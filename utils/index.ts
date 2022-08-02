import axios from 'axios';
import jwt_decode from 'jwt-decode';

interface IGoogleResponse {
  name: string,
  picture: string,
  sub: string
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  if (!response) return 

  const { name, picture, sub }: IGoogleResponse = jwt_decode(response.credential);

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  
  await axios.post(`${BASE_URL}/api/auth`, user);

  addUser(user);
};

export const formatDoc = (caption: string, topic: string, videoId: string, userId: string) => {
  return {
    _type: 'post',
    caption,
    topic,
    video: {
        _type: 'file',
        asset: {
            _type: 'reference',
            _ref: videoId,
        },
    },
    userId: userId,
    postedBy: {
        _type: 'postedBy',
        _ref: userId,
    }
  };
}