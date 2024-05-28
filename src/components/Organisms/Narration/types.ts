import { NarrationSentenceData } from "../../Atoms/NarrationSentence/types";

export interface Props {
  data: NarrationSentenceData[];
}

export interface State {
  hasPlayed: boolean;
  hasEnded: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  resetPlayer: boolean;
  buffered: number;
  duration: number;
}
