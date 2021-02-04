import {
  IonCol,
  IonGrid,
  IonButton,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { power } from "ionicons/icons";
import LightButton from "./LightButton";
import React, { useEffect, useState } from "react";
import "./index.css";
import { GameStatus, Position } from "./types";
import Game from "./Game";
import Timer from "./Timer";

enum Keys {
  upLeft,
  upRight,
  downLeft,
  downRight,
}

const timer = new Timer();
const game = new Game(timer);
let interval: ReturnType<typeof setInterval>;

interface Props {
  onStart(): void;
  onStop(): void;
}

const Simone: React.FC<Props> = (props) => {
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);
  const [moves, setMoves] = useState<Array<Position>>([]);
  const [litButton, setLitButton] = useState<Position | "all" | null>(null);
  const [status, setStatus] = useState<GameStatus>("stopped");
  const [record, setRecord] = useState<Number>(0);

  const lightButtons: Array<JSX.Element> = [
    "upLeft",
    "upRight",
    "downLeft",
    "downRight",
  ].map((position, index) => {
    return (
      <LightButton
        key={position}
        disabled={status !== "handlingInputs"}
        isLit={litButton === Keys[index] || litButton === "all"}
        onClick={() => game.handleUserInput(position as Position)}
        position={position as Position}
      />
    );
  });

  function showMoves() {
    if (isPlaying) {
      let index = 0;
      const lastIndex = moves.length - 1;

      setStatus("showingMoves");

      interval = setInterval(() => {
        setTimeout(setLitButton, 600, null);
        setLitButton(moves[index]);

        index++;

        if (index > lastIndex) {
          clearInterval(interval);
          setStatus("handlingInputs");
        }
      }, 900);
    }
  }

  function InitGame() {
    setIsPlaying(true);
    game.init();
    props.onStart();
  }

  function stopGame() {
    setStatus("stopped");
    setIsPlaying(false);
    setMoves([]);
    game.destroy();
    clearInterval(interval);
    props.onStop();
  }

  function errorAlert() {
    setLitButton("all");

    return new Promise((resolve) => {
      setTimeout(() => {
        setLitButton(null);
        resolve(undefined);
      }, 1000);
    });
  }

  useEffect(() => {
    async function gameOver() {
      await errorAlert();
      stopGame();
    }

    game.on("newMove", setMoves);
    game.on("newRecord", setRecord);
    game.on("timeout", gameOver);
    game.on("wrongMove", gameOver);

    timer.subscribe(gameOver);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(showMoves, [moves]);
  useEffect(() => {
    if (status === "handlingInputs") {
      timer.init();
    }
  }, [status]);

  return (
    <>
      <main>
        <div>{[lightButtons[0], lightButtons[1]]}</div>
        <div>{[lightButtons[2], lightButtons[3]]}</div>

        <IonButton
          className="play-button"
          color={isPlaying ? "danger" : "success"}
          fill="clear"
          size="large"
          onClick={isPlaying ? stopGame : InitGame}
        >
          <IonIcon icon={power} color={isPlaying ? "danger" : "success"} />
        </IonButton>
      </main>
      <IonGrid>
        <IonRow>
          <IonCol className="ion-text-center">
            Record: <IonText color="primary">{record}</IonText>
          </IonCol>
          <IonCol className="ion-text-center">
            {"Current: "}
            <IonText color="warning">
              {moves.length - 1 < 0 ? 0 : moves.length - 1}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Simone;
