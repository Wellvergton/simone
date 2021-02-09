import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";

interface Props {
  isOpen: boolean;
  onDismiss: Function;
}

const GameInfoModal: React.FC<Props> = (props) => {
  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rules</IonTitle>
          <IonButtons slot="end">
            <IonButton shape="round" onClick={() => props.onDismiss()}>
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p className="ion-padding">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          quibusdam nostrum fuga molestias saepe quidem consequatur laboriosam
          veniam rem optio illo, modi mollitia nobis iste assumenda numquam at
          temporibus atque.
        </p>
      </IonContent>
    </IonModal>
  );
};

export default GameInfoModal;
