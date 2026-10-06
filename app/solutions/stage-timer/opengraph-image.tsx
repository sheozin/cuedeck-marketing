import { ogCard, ogSize } from "../../../lib/ogCard";

export const alt = "CueDeck Stage Timer and Displays";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard("STAGE TIMER & DISPLAYS", "Every speaker knows exactly where they stand", "A full-screen countdown and venue signage, driven by your live run of show.");
}
