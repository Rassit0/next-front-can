import { PlayerPassPreviousTeamSourceType } from "./player-passess.interface";
import {
  DocumentType,
  Gender,
  PlayerPassStatus,
} from "./player-passess.interface";

export interface PostPlayerPassInterface {
  playerId: string;
  previousTeamId?: string;
  externalPreviousTeamName?: string;
  currentTeamId: string;
  previousTeamSource: PlayerPassPreviousTeamSourceType;
  originType: string;
  startDate: Date;
  status: PlayerPassStatus;
  notes: string | null;
}
