import { NarrationSentenceData } from "../../Atoms/NarrationSentence/types";

export interface Props {
  data: NarrationSentenceData[];
}

export interface State {
  hasPlayed: boolean;
  isPaused: boolean;
  resetState: boolean;
}
