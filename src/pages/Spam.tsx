import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { mailOutline, videocamOutline } from "ionicons/icons";

const Spam: React.FC = () => {
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Meet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Spam</h2>
      </IonContent>
      <IonTabBar slot="bottom">
        <IonTabButton tab="mail" href="/tabs/mail">
          <IonIcon icon={mailOutline}/>
          <IonLabel>Mail</IonLabel>
        </IonTabButton>
        <IonTabButton tab="meet" href="/tabs/meet">
          <IonIcon icon={videocamOutline}/>
          <IonLabel>Meet</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default Spam;
