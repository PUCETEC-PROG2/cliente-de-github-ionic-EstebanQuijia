import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonTextarea,
  IonButton,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { useState } from "react";
import { RepositoryPatch } from "../../interfaces/RepositoryPatch";
import { updateRepository } from "../../services/GithubServices";

export const EditRepo: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{
    name: string;
    description: string;
    owner: string;
  }>();

  const [repoFormData, setRepoFormData] = useState<RepositoryPatch>({
    current_name: location.state?.name || "",
    description: location.state?.description || "",
    new_name: null,
    owner: location.state?.owner || "",
  });

  const setRepoName = (value: string) => {
    console.log("Actualizando nombre a:", value);
    setRepoFormData((prevState) => ({ ...prevState, new_name: value }));
  };

  const setRepoDescription = (value: string | null | undefined) => {
    const desc = value || "";
    console.log("Actualizando descripción a:", desc);
    setRepoFormData((prevState) => ({
      ...prevState,
      description: desc,
    }));
  };

  const updateRepo = () => {
    console.log("Estado actual completo:", repoFormData);
    console.log("Actualizando repositorio....");

    let newName = repoFormData.new_name?.trim() || null;

    // Solo validar si el usuario intentó cambiar el nombre
    if (repoFormData.new_name !== null && (!newName || newName === "")) {
      alert("El nombre del repositorio no puede estar vacío.");
      return;
    }

    // Reemplazar espacios por guiones si hay un nuevo nombre
    if (newName) {
      newName = newName.replace(/\s+/g, "-");
    }

    const trimmedDescription = repoFormData.description?.trim();
    const finalDescription =
      trimmedDescription && trimmedDescription !== ""
        ? trimmedDescription
        : null;

    const cleanedData: RepositoryPatch = {
      ...repoFormData,
      new_name: newName,
      description: finalDescription,
    };

    console.log("Datos a enviar:", cleanedData);

    updateRepository(cleanedData)
      .then(() => {
        history.push("/tab1");
      })
      .catch((error) => {
        console.error("Error al actualizar el repositorio:", error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          <IonTitle>Editar Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"> Editar Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="android-proyect"
            value={repoFormData.new_name || repoFormData.current_name}
            onIonInput={(e) => setRepoName(e.detail.value!)}
          />
          <IonTextarea
            className="form-field"
            label="Descripción del Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Descripción del proyecto"
            rows={6}
            value={repoFormData.description}
            onIonInput={(e) => setRepoDescription(e.detail.value!)}
          />
          <IonButton className="form-field" expand="block" onClick={updateRepo}>
            Guardar Cambios
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditRepo;