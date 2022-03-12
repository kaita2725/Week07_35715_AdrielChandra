import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonContent, IonList, IonMenuToggle, IonItem,IonIcon, IonLabel, IonMenu } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import MailTabs from './pages/MailTabs';
import Mail from './pages/Mail';
import Meet from './pages/Meet';
import MailDetail from './pages/MailDetail';
import Spam from './pages/Spam';
import Settings from './pages/Settings';
import FriendsContextprovider from './pages/data/friendContextProvider';
import {list, settingsOutline, warningOutline} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonMenu contentId="main">
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem button routerLink="/tabs/mail">
                <IonIcon slot="start" icon={list} />
                <IonLabel>All Mail</IonLabel>
              </IonItem>
              <IonItem button routerLink='/spam'>
                <IonIcon slot='start' icon={warningOutline}></IonIcon>
                <IonLabel>Spam</IonLabel>
              </IonItem>
                <IonItem button routerLink='/settings'>
                <IonIcon slot='start' icon={settingsOutline}></IonIcon>
              <IonLabel>Settings</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="main">
        <FriendsContextprovider>
          <Route path="/tabs" component={MailTabs}/>
          <Route path="/mail/:mailId" component={MailDetail}/>
          <Route exact path='/mail' component={Mail}/>
          <Route path='/meet' component={Meet}/>
          <Route path="/spam" component={Spam}/>
          <Route path="/settings" component={Settings}/>
          <Redirect exact from="/" to="/tabs" />
        </FriendsContextprovider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
