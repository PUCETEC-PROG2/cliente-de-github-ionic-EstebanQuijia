import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonIcon,
  IonAlert,
  IonButton,
  IonItem,
  IonLabel,
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
  const [selectedRepo, setSelectedRepo] = useState<RepositoryDelete | null>(null);

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

  const handleConfirmDelete = async () => {
    if (selectedRepo) {
      const nameToDelete = selectedRepo.repo_name;
      setShowAlert(false);
      setRepos((prev) => prev.filter(r => r.name !== nameToDelete));
      try {
        await deleteRepository(selectedRepo);
        setTimeout(() => loadRepos(), 2000);
      } catch (error) {
        console.error("Error al borrar", error);
        loadRepos();
      }
    }
  };

  useIonViewDidEnter(() => {
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
        <IonList inset={true}>
          {repos.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "20px", color: "gray" }}>
              Cargando repositorios...
            </div>
          ) : (
            repos.map((repo, index) => (
              <IonItem key={repo.name + index} lines="full">
                <IonLabel className="ion-text-wrap" style={{ flex: 1 }}>
                  <RepoItem
                    name={repo.name}
                    imageUrl={repo.imageUrl}
                    owner={repo.owner}
                    description={repo.description}
                    language={repo.language}

                  />
                </IonLabel>

                {/* contenedor de botones */}
                <div slot="end" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <IonButton
                    fill="clear"
                    onClick={() => handleEdit(repo)}
                    style={{ margin: '0', height: '40px' }}
                  >
                    <IonIcon
                      icon={pencil}
                      color="primary"
                      style={{ fontSize: '24px' }}
                    />
                  </IonButton>

                  <IonButton
                    fill="clear"
                    onClick={() => handleDeleteClick(repo)}
                    style={{ margin: '0', height: '40px' }}
                  >
                    <IonIcon
                      icon={trash}
                      color="danger"
                      style={{ fontSize: '24px' }}
                    />
                  </IonButton>
                </div>
              </IonItem>
            ))
          )}
        </IonList>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Eliminar Repositorio"
          message={`¿Borrar "${selectedRepo?.repo_name}"?`}
          buttons={[
            { text: "Cancelar", role: "cancel" },
            {
              text: "Eliminar",
              role: "destructive",
              handler: handleConfirmDelete,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;