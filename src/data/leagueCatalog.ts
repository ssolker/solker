export interface TeamInfo {
  teamName: string;
  captainName: string;
}

export interface LeagueSeason {
  seasonKey: string;
  seasonLabel: string;
  displayLabel: string;
  submissionValue: string;
  price: number;
  startDate: string;
  endDate: string;
  registrationClosesAt: string;
  teams: TeamInfo[];
}

export interface LeagueCatalogEntry {
  leagueKey: string;
  leagueSportName: string;
  gameDay: string;
  gameTime: string;
  seasons: LeagueSeason[];
}

export const leagueCatalog: LeagueCatalogEntry[] = [
  {
    leagueKey: 'soccer-6v6-coed',
    leagueSportName: '6v6 Co-Ed Soccer',
    gameDay: 'Thursday',
    gameTime: 'Evenings',
    seasons: [
      {
        seasonKey: 'soccer-season-1',
        seasonLabel: 'Season 1',
        displayLabel: 'Soccer - Season 1 (May - Jun) - $50',
        submissionValue: 'Soccer - Season 1 - 50',
        price: 50,
        startDate: '2026-05-07',
        endDate: '2026-06-25',
        registrationClosesAt: '2026-05-05T23:59:59-04:00',
        teams: [
          { teamName: 'Bender', captainName: 'Aiden Bender' },
          { teamName: 'Butler', captainName: 'Darcey Butler' },
          { teamName: 'Taylor', captainName: 'Zack Taylor' },
          { teamName: 'Solker', captainName: 'Shuaib Solker' }
        ]
      },
      {
        seasonKey: 'soccer-season-2',
        seasonLabel: 'Season 2',
        displayLabel: 'Soccer - Season 2 (Jul - Aug) - $50',
        submissionValue: 'Soccer - Season 2 - 50',
        price: 50,
        startDate: '2026-07-01',
        endDate: '2026-08-31',
        registrationClosesAt: '2026-06-29T23:59:59-04:00',
        teams: [
          { teamName: 'Bender', captainName: 'Aiden Bender' },
          { teamName: 'Butler', captainName: 'Darcey Butler' },
          { teamName: 'Taylor', captainName: 'Zack Taylor' },
          { teamName: 'Solker', captainName: 'Shuaib Solker' }
        ]
      }
    ]
  }
];

export function isRegistrationOpen(registrationClosesAt: string, now: Date = new Date()): boolean {
  if (!registrationClosesAt) return true;
  var closeAt = new Date(registrationClosesAt);
  if (Number.isNaN(closeAt.getTime())) return true;
  return now.getTime() <= closeAt.getTime();
}

export function getRegistrationSeasons() {
  return leagueCatalog.flatMap((league) =>
    league.seasons.map((season) => ({
      leagueKey: league.leagueKey,
      leagueSportName: league.leagueSportName,
      gameDay: league.gameDay,
      gameTime: league.gameTime,
      seasonKey: season.seasonKey,
      seasonLabel: season.seasonLabel,
      displayLabel: season.displayLabel,
      submissionValue: season.submissionValue,
      price: season.price,
      startDate: season.startDate,
      endDate: season.endDate,
      registrationClosesAt: season.registrationClosesAt,
      teams: season.teams,
      isOpen: isRegistrationOpen(season.registrationClosesAt)
    }))
  );
}

