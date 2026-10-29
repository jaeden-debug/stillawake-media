import { ComparisonGuidePage, guideMetadata } from "@/components/games/ComparisonGuidePage";
import { friendsGuide as guide } from "@/data/games/guides/scary-roblox-games-with-friends";

export const metadata = guideMetadata(guide);

export default function ScaryWithFriendsGuide() {
  return <ComparisonGuidePage guide={guide} />;
}
