import { ogCard, ogSize } from "../../../lib/ogCard";

export const alt = "CueDeck Command Center: run of show, live cues and operator roles";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard("COMMAND CENTER", "Call the whole show from one screen", "Run of show, live cues and every operator in one real-time console.");
}
