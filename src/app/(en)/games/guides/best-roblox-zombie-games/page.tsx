import { ComparisonGuidePage, guideMetadata } from "@/components/games/ComparisonGuidePage";
import { zombieGuide as guide } from "@/data/games/guides/best-roblox-zombie-games";

export const metadata = guideMetadata(guide);

export default function BestZombieGamesGuide() {
  return <ComparisonGuidePage guide={guide} />;
}
