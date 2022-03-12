import React, {useState} from 'react';
import FriendsContext, {Friend} from "./friend-context";

const FriendsContextprovider: React.FC = props => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id:'f1',
      name: 'John Thor',
      avatar: ''
    }
  ]);

  const addFriend =(name:string, avatar: string) => {
    const newFriend: Friend = {
      id: Math.random().toString(),
      name: name,
      avatar: avatar
    };

    setFriends((currFriends)=>{
      return currFriends.concat(newFriend);
    });
  };
  const updateFriend = (id: number, name:string) => {
      const items = [...friends];
        items[id] = {
            ...items[id],
            name: name
      };
        setFriends(items);
    };

  const deleteFriend = (id: number) => {
    const filteredArray = friends.filter(item => item !== friends[id]);
    setFriends(filteredArray);
  };

  return(
    <FriendsContext.Provider value={{
      friends, addFriend, updateFriend, deleteFriend
    }}>
      {props.children}
    </FriendsContext.Provider>
  );
};

export default FriendsContextprovider;
