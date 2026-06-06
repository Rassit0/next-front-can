export interface ITeamsByClubOptions {
  id: string;
  name: string;
  discipline: {
    id: string;
    name: string;
    icon: string;
  };
}

export interface ITeamsByClubOptionsResponse {
  data: ITeamsByClubOptions[];
  message: string;
}
