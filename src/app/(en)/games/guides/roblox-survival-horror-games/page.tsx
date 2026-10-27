import { ComparisonGuidePage, guideMetadata } from "@/components/games/ComparisonGuidePage";
import { survivalHorrorGuide as guide } from "@/data/games/guides/roblox-survival-horror";

export const metadata = guideMetadata(guide);

export default function SurvivalHorrorGuide() {
  return <ComparisonGuidePage guide={guide} />;
}
