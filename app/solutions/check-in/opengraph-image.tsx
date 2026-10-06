import { ogCard, ogSize } from "../../../lib/ogCard";

export const alt = "CueDeck Event Check-in: guest list, QR codes, desk and badges";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard("EVENT CHECK-IN", "Every guest through the door in seconds", "Guest list, QR emails, door scanner phones, badges and a live dashboard. One price per event.");
}
