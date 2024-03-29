export interface Video {
    caption: string;
    video: {
      asset: {
        _id: string;
        url: string;
      };
    };
    _id: string;
    postedBy: IUser;
    likes: {
      postedBy: {
        _id: string;
        userName: string;
        image: string;
      };
    }[];
    comments: Array<{
      comment: string;
      _key: string;
      postedBy: {
        _ref: string;
      };
    }>;
    userId: string;
  }
  
  export interface IUser {
    _ref: string;
    _id: string;
    _type: string;
    userName: string;
    image: string;
  }