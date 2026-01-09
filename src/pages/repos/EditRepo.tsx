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
  IonToast,
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

  const [showToast, setShowToast] = useState(false);
  
  // Seteamos el nombre actual como valor inicial de new_name
  const [repoFormData, setRepoFormData] = useState<RepositoryPatch>({
    current_name: location.state?.name || "",
    description: location.state?.description || "",
    new_name: location.state?.name || "", 
    owner: location.state?.owner || "",
  });

  const updateRepo = async () => {
    const newName = repoFormData.new_name?.trim();

    // Validación: No permitir enviar si está realmente vacío al dar clic en Guardar
    if (!newName || newName === "") {
      alert("El nombre del repositorio no puede estar vacío.");
      return;
    }

    // Reemplazar espacios por guiones para cumplir con el formato de GitHub
    const finalName = newName.replace(/\s+/g, "-");

    const cleanedData: RepositoryPatch = {
      ...repoFormData,
      new_name: finalName,
    };

    try {
      await updateRepository(cleanedData);
      setShowToast(true);
      // Esperamos un momento para que el usuario vea el mensaje antes de volver
      setTimeout(() => history.push("/tab1"), 1500);
    } catch (error) {
      console.error("Error al actualizar el repositorio:", error);
    }
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
      <IonContent fullscreen className="ion-padding">
        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Nombre del proyecto"
            // CAMBIO CLAVE: Usamos solo new_name para permitir borrar todo el texto
            value={repoFormData.new_name} 
            onIonInput={(e) => setRepoFormData({ ...repoFormData, new_name: e.detail.value! })}
          />
          <IonTextarea
            className="form-field"
            label="Descripción del Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Descripción del proyecto"
            rows={6}
            value={repoFormData.description}
            onIonInput={(e) => setRepoFormData({ ...repoFormData, description: e.detail.value! })}
          />
          <IonButton className="form-field" expand="block" onClick={updateRepo}>
            Guardar Cambios
          </IonButton>
        </div>
        <IonToast
          isOpen={showToast}
          message="Repositorio actualizado correctamente"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default EditRepo;