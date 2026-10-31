import { ComparisonGuidePage, guideMetadata } from "@/components/games/ComparisonGuidePage";
import { horrorSurvivalGuide as guide } from "@/data/games/guides/roblox-horror-survival-games";

export const metadata = guideMetadata(guide);

export default function HorrorSurvivalGuide() {
  return <ComparisonGuidePage guide={guide} />;
}
