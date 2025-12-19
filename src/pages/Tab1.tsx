import {
  IonContent,
  IonHeader,
  IonItemSliding,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonAlert,
} from "@ionic/react";

import { pencil, trash } from "ionicons/icons";
import "./Tab1.css";
import RepoItem from "../components/RepoItem";
import { useState } from "react";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import {
  deleteRepository,
  fetchRepositories,
} from "../services/GithubServices";
import { useHistory } from "react-router-dom";
import { RepositoryDelete } from "../interfaces/RepositoryDelete";

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryDelete | null>(
    null
  );

  const history = useHistory();

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  const handleEdit = (repo: RepositoryItem) => {
    history.push("/edit-repo", {
      name: repo.name,
      description: repo.description,
      owner: repo.owner,
    });
  };

  const handleDeleteClick = (repo: RepositoryItem) => {
    setSelectedRepo({
      owner: repo.owner,
      repo_name: repo.name,
    });

    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRepo) {
      deleteRepository(selectedRepo);
      setShowAlert(false);
    }
  };

  useIonViewDidEnter(() => {
    console.log("Leyendo repositorios");
    loadRepos();
  });

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
        <IonList inset={true}>
          {repos.map((repo, index) => (
            <IonItemSliding key={index}>
              <RepoItem
                name={repo.name}
                imageUrl={repo.imageUrl}
                owner={repo.owner}
                description={repo.description}
                language={repo.language}
              ></RepoItem>
              <IonItemOptions>
                <IonItemOption onClick={() => handleEdit(repo)}>
                  <IonIcon slot="icon-only" icon={pencil}></IonIcon>
                </IonItemOption>
                <IonItemOption
                  color="danger"
                  onClick={() => handleDeleteClick(repo)}
                >
                  <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Eliminar Repositorio"
        subHeader={selectedRepo?.repo_name}
        message="¿Estás seguro de que deseas eliminar este repositorio?"
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => setShowAlert(false),
          },
          {
            text: "Eliminar",
            role: "destructive",
            handler: handleConfirmDelete,
          },
        ]}
      ></IonAlert>
    </IonPage>
  );
};

export default Tab1;