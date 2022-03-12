import React from 'react';
export interface Friend{
  id: string,
  name: string,
  avatar: string
}

interface Context{
  friends: Friend[];
  addFriend: (friendName: string, friendAvatar: string) => void,
  updateFriend: (friendId: number, friendName: string, friendAvatar: string) => void,
  deleteFriend:(friendId: number) => void
}

const FriendContext = React.createContext<Context>({
  friends: [],
  addFriend: () => {},
  updateFriend: () => {},
  deleteFriend:() => {}
});

export default FriendContext;
