import React from 'react';
import { IonInput, IonGrid, IonRow, IonCol, IonModal, IonToast, IonAlert, IonFab, IonFabButton, IonButton, IonItemOption, IonAvatar, IonMenuButton, IonPage, IonContent, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonButtons, IonTitle, IonItemSliding, IonItemOptions, IonIcon} from '@ionic/react';
import {ban, createSharp, trashSharp, addOutline} from "ionicons/icons";
import { useRef, useState, useContext } from "react";
import FriendsContext from './data/friend-context';

// export const FRIENDS_DATA = [
//   {id: 'f1', name: 'John Thor', avatar:'https://initiate.alphacoders.com/images/206/cropped-512-512-20658.jpg?6644'},
//   {id: 'f2', name: 'John Ness', avatar:'https://initiate.alphacoders.com/images/572/cropped-512-512-5726.jpg?1530'},
//   {id: 'f3', name: 'John Doe', avatar:'https://initiate.alphacoders.com/images/116/cropped-512-512-116827.jpg?8343'}
// ];

const Meet: React.FC = () => {
  const nameRef = React.useRef<HTMLIonInputElement>(null);
  const friendsCtx = useContext(FriendsContext);
  const SlidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const[toastMessage, setToastMessage] = useState('');
  const[isEditing, setIsEditing]  = useState(false);
  const[selectedFriend, setSelectedFriend] = useState<{id: string, name: string, avatar: string } | null>();
  const[startDeleting, setStartDeleting]  = useState(false);
  const[startBlocking, setStartBlocking]  = useState(false);
  const startAddFriendHandler = () => {
    console.log("adding friend . . .");
    setIsEditing(true);
    setSelectedFriend(null);
  }

  const saveFriendHandler = () => {
    const enteredName = nameRef.current!.value;
    if(!enteredName) return;
    if(selectedFriend === null){
      friendsCtx.addFriend(enteredName.toString(), '');
    }
    else{
      friendsCtx.updateFriend(friendsCtx.friends.findIndex(a => a === selectedFriend),enteredName.toString(),'');
    }
    setIsEditing(false);
  }

  const callFriendHandler = () => {
    console.log("Calling . . .");
  }

  const startBlockingFriendHandler = () => {
    setStartBlocking(true);
    SlidingOptionsRef.current?.closeOpened();
  };
  const blockFriendHandler = () => {
    setStartBlocking(false);
    setToastMessage('Friend has been blocked!');
  }

  const startDeleteFriendHandler = (friendId: string) => {
    setStartDeleting(true);
    SlidingOptionsRef.current?.closeOpened();
    const friend = friendsCtx.friends.find(a => a.id === friendId);
    setSelectedFriend(friend);
  };

  const deleteFriendHandler = () => {
    setStartDeleting(false);
    friendsCtx.deleteFriend(friendsCtx.friends.findIndex(a => a === selectedFriend));
    setToastMessage('Deleted Friend!');
  };

  const startEditFriendHandler = (friendId: string) => {
    SlidingOptionsRef.current?.closeOpened();
    console.log("Editing . . .");
    const friend = friendsCtx.friends.find(f => f.id === friendId);
    setSelectedFriend(friend);
    setIsEditing(true);
  };
  const CancelEditFriendHandler = () => {
    setIsEditing(false);
  };

  return (
  <React.Fragment>
    <IonAlert
      isOpen={startDeleting}
      header="Are you sure?"
      message="Do you want to delete your friend? this cannot be undone."
      buttons={[
        {text:'No', role:'cancel', handler: () => {setStartDeleting(false)}},
        {text:'Yes', handler: deleteFriendHandler}
      ]} />
    <IonAlert
      isOpen={startBlocking}
      header="Are you sure?"
      message="Do you want to block your friend? this cannot be undone."
      buttons={[
        {text:'No', role:'cancel', handler: () => {setStartBlocking(false)}},
        {text:'Yes', handler: blockFriendHandler}
      ]} />
    <IonToast
      isOpen={!!toastMessage}
      message={toastMessage}
      duration={2000}
      onDidDismiss={() => {setToastMessage('')}}
    />
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={startAddFriendHandler}>
              <IonIcon icon={addOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Meet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonModal isOpen={isEditing}>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Friend Name</IonLabel>
                  <IonInput type="text" value={selectedFriend?.name} ref={nameRef}/>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonButton fill="clear" color="dark" onClick={CancelEditFriendHandler}>Cancel</IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="secondary" expand="block" onClick={saveFriendHandler}>Save</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
      <IonContent  className="ion-padding">
        <IonList>
          {friendsCtx.friends.map(friend => (
            <IonItemSliding key={friend.id} ref={SlidingOptionsRef}>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={startBlockingFriendHandler}>
                  <IonIcon slot="icon-only" icon={ban} />
                </IonItemOption>
                <IonItemOption color="warning" onClick={startDeleteFriendHandler.bind(null, friend.id)}>
                  <IonIcon slot="icon-only" icon={trashSharp} />
                </IonItemOption>
              </IonItemOptions>
              <IonItemOptions side="end">
                <IonItemOption color="warning" onClick={startEditFriendHandler.bind(null, friend.id)}>
                  <IonIcon slot="icon-only" icon={createSharp} />
                </IonItemOption>
              </IonItemOptions>
                <IonItem key={friend.id} lines="full" button onClick={callFriendHandler}>
                  <IonAvatar slot="start">
                    <img src={friend.avatar} />
                  </IonAvatar>
                  <IonLabel>{friend.name}</IonLabel>
                </IonItem>
            </IonItemSliding>
          ))}
        </IonList>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="secondary" onClick={startAddFriendHandler}>
            <IonIcon icon={addOutline}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
  </IonPage>);
  </React.Fragment>
)
};

export default Meet;
