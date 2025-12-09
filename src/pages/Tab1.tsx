import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonList } from '@ionic/react';
import './Tab1.css';
import Repoitem from '../components/Repoitem';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <Repoitem name="Repositorio 1" imageUrl="https://avatars.githubusercontent.com/u/9919?s=200&v=4" />
          <Repoitem name="Repositorio 2" />
          <Repoitem name="Repositorio 3" imageUrl="https://avatars.githubusercontent.com/u/9919?s=200&v=4" />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
