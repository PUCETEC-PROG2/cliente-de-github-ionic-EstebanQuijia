import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import "./Tab3.css";

import { useState } from "react";
import { UserInfo } from "../interfaces/UserInfo";
import { getUserInfo } from "../services/GithubServices";

const Tab3: React.FC = () => {
  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Usuario no encontrado",
    login: "no-username",
    bio: "No se encontro bio",
    avatar_url: "https://via.placeholder.com/150",
    total_private_repos: 0,
    public_repos: 0,
    created_at: "No se encontro",
    plan: {
      name: "No se encontro",
    },
  });

  const loadUserInfo = async () => {
    const response = await getUserInfo();
    if (response) {
      setUserInfo(response);
    }
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{userInfo.login}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-container">
          <IonCard>
            <img alt="Silhouette of mountains" src={userInfo.avatar_url} />
            <IonCardHeader>
              <IonCardTitle>{userInfo.name}</IonCardTitle>

              <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>{userInfo.bio}</IonCardContent>

            <IonCardContent>
              Plan Github Copailot {capitalize(userInfo.plan.name)}
            </IonCardContent>

            <IonCardContent>
              Repositorios privados: {userInfo.total_private_repos}
            </IonCardContent>
            <IonCardContent>
              Repositorios públicos: {userInfo.public_repos}
            </IonCardContent>
            <IonCardContent>
              Usuario desde {new Date(userInfo.created_at).toLocaleDateString()}
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
