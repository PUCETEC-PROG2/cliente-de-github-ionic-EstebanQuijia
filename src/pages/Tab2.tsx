import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import "./Tab2.css";
import { useHistory } from "react-router";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { createRepository } from "../services/GithubServices";

const Tab2: React.FC = () => {
  const history = useHistory();

  const repoFormData: RepositoryItem = {
    name: "",
    description: "",
    imageUrl: null,
    owner: null,
    language: null,
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  };

  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  };

  const saveRepo = () => {
    console.log("Guardando repositorio:", repoFormData);
    if (repoFormData.name.trim() === "") {
      alert("El nombre del repositorio es obligatorio.");
      return;
    }
    createRepository(repoFormData)
      .then(() => {
        history.push("/tab1");
      })
      .catch((error) => {
        console.error("Error al crear el repositorio:", error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="android-proyect"
            value={repoFormData.name}
            onIonChange={(e) => setRepoName(e.detail.value!)}
          />
          <IonTextarea
            className="form-field"
            label="Descripción del Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Descripción del proyecto"
            rows={6}
            value={repoFormData.description}
            onIonChange={(e) => setRepoDescription(e.detail.value!)}
          />
          <IonButton className="form-field" expand="block" onClick={saveRepo}>
            Enviar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;