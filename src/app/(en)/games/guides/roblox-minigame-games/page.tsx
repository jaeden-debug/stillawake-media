import { ComparisonGuidePage, guideMetadata } from "@/components/games/ComparisonGuidePage";
import { minigameGuide as guide } from "@/data/games/guides/roblox-minigame";

export const metadata = guideMetadata(guide);

export default function MinigameGuide() {
  return <ComparisonGuidePage guide={guide} />;
}
