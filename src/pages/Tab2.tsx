import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonTextarea,
  IonButton,
  IonToast,
} from "@ionic/react";
import "./Tab2.css";
import { useState } from "react";
import { useHistory } from "react-router";
import { createRepository } from "../services/GithubServices";

const Tab2: React.FC = () => {
  const history = useHistory();
  
  // Control de mensaje
  const [showToast, setShowToast] = useState(false);

  // Estado de los datos
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const saveRepo = async () => {
    let repoName = formData.name.trim();
    
    if (repoName === "") {
      alert("El nombre del repositorio es obligatorio.");
      return;
    }

    // Convertir espacios en guiones
    repoName = repoName.replace(/\s+/g, "-");

    const repoToSave = {
      name: repoName,
      description: formData.description,
      imageUrl: null,
      owner: null,
      language: null,
    };

    try {
      //  Llamada a la API
      await createRepository(repoToSave);
      
      // mensaje de exito
      setShowToast(true);
      
      // Limpiamos el formulario
      setFormData({ name: "", description: "" });

      // Tiempo de espera para el mensaje
      setTimeout(() => {
        history.push("/tab1");
      }, 1500);

    } catch (error) {
      console.error("Error al crear el repositorio:", error);
      alert("Ocurrió un error al crear el repositorio.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nuevo Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="ej: mi-nuevo-proyecto"
            value={formData.name}
            onIonInput={(e) => setFormData({ ...formData, name: e.detail.value! })}
          />
          <IonTextarea
            className="form-field"
            label="Descripción (Opcional)"
            labelPlacement="floating"
            fill="outline"
            placeholder="De qué trata tu proyecto..."
            rows={6}
            value={formData.description}
            onIonInput={(e) => setFormData({ ...formData, description: e.detail.value! })}
          />
          <IonButton className="form-field" expand="block" onClick={saveRepo}>
            Crear Repositorio
          </IonButton>
        </div>

        {/* mensaje de exito */}
        <IonToast
          isOpen={showToast}
          message="Repositorio creado correctamente" 
          duration={2000} 
          color="success" 
          onDidDismiss={() => setShowToast(false)} // Resetea el estado
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;