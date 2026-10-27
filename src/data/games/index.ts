import type { Game, GameUpdate, MediaAsset, WikiCategory, WikiEntry } from "@/data/games/types";
import { stillskinCategories, stillskinForest } from "@/data/games/stillskin-forest/game";
import { stillskinUpdates, stillskinWiki } from "@/data/games/stillskin-forest/wiki";
import { stillskinMediaById } from "@/data/games/stillskin-forest/media";
import { riskIt, riskItCategories } from "@/data/games/risk-it/game";
import { riskItUpdates, riskItWiki } from "@/data/games/risk-it/wiki";
import { riskItMediaById } from "@/data/games/risk-it/media";

/**
 * Everything one game publishes. Adding a game = adding one bundle here.
 */
export type GameBundle = {
  game: Game;
  categories: WikiCategory[];
  wiki: WikiEntry[];
  updates: GameUpdate[];
  media: Record<string, MediaAsset>;
};

export const gameBundles: GameBundle[] = [
  {
    game: stillskinForest,
    categories: stillskinCategories,
    wiki: stillskinWiki,
    updates: stillskinUpdates,
    media: stillskinMediaById,
  },
  {
    game: riskIt,
    categories: riskItCategories,
    wiki: riskItWiki,
    updates: riskItUpdates,
    media: riskItMediaById,
  },
];
