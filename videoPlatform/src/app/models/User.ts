export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  bio: string;
  location: string;
  sex: 'male' | 'female' | 'secrete';
  profileImage: string;
  firstName: string;
  lastName: string;
  history: [];
  videos: [];
  liked: any[];
  unlike: [];
  subscribe: [];
  favorite: any[];
  subscribed: [];
}
