export interface Props {
  data: NarrationSentenceData;
  resetState: boolean;
}

export interface NarrationSentenceData {
  content: string;
  id: string;
  delay: number;
  start: number;
  duration: number;
  end: number;
}

export interface State {
  isRead: boolean;
  isReset: boolean;
}
