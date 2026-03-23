export interface TeamInfo {
  teamName: string;
  captainName: string;
}

/** One row in the basic 8-week calendar (e.g. Victoria Day off). */
export interface WeeklyScheduleRow {
  weekLabel: string;
  dateLabel: string;
  status: string;
}

/** One match in the full schedule. */
export interface SeasonFixture {
  id: string;
  date: string;
  fieldName: string;
  homeTeam: string;
  awayTeam: string;
}

/** Standings row stored in catalog (baseline); client may recompute from entered scores. */
export interface SeasonStandingRow {
  teamName: string;
  wins: number;
  losses: number;
  ties: number;
  goalsFor: number;
  goalsAgainst: number;
  /** Used for tie-break; hidden in public UI */
  spiritScore: number;
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
  /** When true, season appears in Active leagues and active dropdown */
  isActive: boolean;
  /** Single line (venue / address) */
  address: string;
  /** e.g. 6:30pm–8:30pm */
  gameTimeDetail: string;
  weeklySchedule: WeeklyScheduleRow[];
  fixtures: SeasonFixture[];
  standingsMode: 'comingSoon' | 'table';
  standings: SeasonStandingRow[];
}

export interface LeagueCatalogEntry {
  leagueKey: string;
  leagueSportName: string;
  gameDay: string;
  gameTime: string;
  seasons: LeagueSeason[];
}

const DEFAULT_FIELD = 'Cowan Park';
const SOC_ADDRESS = 'Cowan Park, Woodstock, Ontario';

/** Double round-robin: every pair plays twice (home/away). */
function buildDoubleRoundRobinFixtures(
  seasonKey: string,
  teamNames: string[],
  gameDates: string[],
  fieldName: string
): SeasonFixture[] {
  const pairs: { home: string; away: string }[] = [];
  for (let i = 0; i < teamNames.length; i++) {
    for (let j = i + 1; j < teamNames.length; j++) {
      pairs.push({ home: teamNames[i], away: teamNames[j] });
      pairs.push({ home: teamNames[j], away: teamNames[i] });
    }
  }
  const n = pairs.length;
  const bucketSizes =
    gameDates.length >= 8
      ? [4, 4, 4, 4, 4, 4, 3, 3]
      : Array(gameDates.length).fill(Math.ceil(n / gameDates.length));
  let pi = 0;
  let fi = 0;
  const fixtures: SeasonFixture[] = [];
  for (let d = 0; d < gameDates.length && pi < n; d++) {
    const count = Math.min(bucketSizes[d] ?? 4, n - pi);
    for (let k = 0; k < count && pi < n; k++) {
      const p = pairs[pi];
      fixtures.push({
        id: `${seasonKey}-g${String(fi + 1).padStart(2, '0')}`,
        date: gameDates[d],
        fieldName,
        homeTeam: p.home,
        awayTeam: p.away
      });
      pi++;
      fi++;
    }
  }
  return fixtures;
}

function emptyStandings(teamNames: string[]): SeasonStandingRow[] {
  return teamNames.map((teamName) => ({
    teamName,
    wins: 0,
    losses: 0,
    ties: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    spiritScore: 0
  }));
}

const soccerS1Teams: TeamInfo[] = [
  { teamName: 'Batth', captainName: 'Ruban Batth' },
  { teamName: 'Bender', captainName: 'Aiden Bender' },
  { teamName: 'Butler', captainName: 'Darcey Butler' },
  { teamName: 'Myers', captainName: 'Cloey Myers' },
  { teamName: 'Solker', captainName: 'Shuaib Solker' },
  { teamName: 'Taylor', captainName: 'Zack Taylor' }
];

const soccerSeason1GameDates = [
  '2026-05-04',
  '2026-05-11',
  '2026-05-25',
  '2026-06-01',
  '2026-06-08',
  '2026-06-15',
  '2026-06-22',
  '2026-06-29'
];

const soccerSeason1Weekly: WeeklyScheduleRow[] = [
  { weekLabel: 'Week 1', dateLabel: 'May 4', status: 'Season Opener' },
  { weekLabel: 'Week 2', dateLabel: 'May 11', status: 'Regular Season' },
  { weekLabel: '—', dateLabel: 'May 18', status: 'NO GAMES (Victoria Day)' },
  { weekLabel: 'Week 3', dateLabel: 'May 25', status: 'Regular Season' },
  { weekLabel: 'Week 4', dateLabel: 'June 1', status: 'Regular Season' },
  { weekLabel: 'Week 5', dateLabel: 'June 8', status: 'Regular Season' },
  { weekLabel: 'Week 6', dateLabel: 'June 15', status: 'Regular Season' },
  { weekLabel: 'Week 7', dateLabel: 'June 22', status: 'Regular Season' },
  { weekLabel: 'Week 8', dateLabel: 'June 29', status: 'Finals / Championship Night' }
];

export const leagueCatalog: LeagueCatalogEntry[] = [
  {
    leagueKey: 'soccer-6v6-coed',
    leagueSportName: '6v6 Co-Ed Soccer',
    gameDay: 'Monday',
    gameTime: 'Evenings',
    seasons: [
      {
        seasonKey: 'soccer-season-1',
        seasonLabel: 'Season 1',
        displayLabel: 'Soccer - Season 1 (May - Jun) - $50',
        submissionValue: 'Soccer - Season 1 - 50',
        price: 50,
        startDate: '2026-05-04',
        endDate: '2026-06-29',
        registrationClosesAt: '2026-02-05T23:59:59-04:00',
        teams: soccerS1Teams,
        isActive: true,
        address: SOC_ADDRESS,
        gameTimeDetail: '6:30pm–8:30pm',
        weeklySchedule: soccerSeason1Weekly,
        fixtures: buildDoubleRoundRobinFixtures(
          'soccer-season-1',
          soccerS1Teams.map((t) => t.teamName),
          soccerSeason1GameDates,
          DEFAULT_FIELD
        ),
        standingsMode: 'table',
        standings: emptyStandings(soccerS1Teams.map((t) => t.teamName))
      },
      {
        seasonKey: 'soccer-season-2',
        seasonLabel: 'Season 2',
        displayLabel: 'Soccer - Season 2 (Jul - Aug) - $50',
        submissionValue: 'Soccer - Season 2 - 50',
        price: 50,
        startDate: '2026-07-01',
        endDate: '2026-08-31',
        registrationClosesAt: '2026-02-29T23:59:59-04:00',
        teams: soccerS1Teams.map((t) => ({ ...t })),
        isActive: true,
        address: SOC_ADDRESS,
        gameTimeDetail: '6:30pm–8:30pm',
        weeklySchedule: [
          { weekLabel: 'TBD', dateLabel: 'Jul – Aug', status: 'Schedule TBD' }
        ],
        fixtures: [],
        standingsMode: 'comingSoon',
        standings: emptyStandings(soccerS1Teams.map((t) => t.teamName))
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

/** Seasons for a league key (e.g. soccer page). */
export function getSeasonsByLeagueKey(leagueKey: string): LeagueSeason[] {
  const entry = leagueCatalog.find((l) => l.leagueKey === leagueKey);
  return entry ? entry.seasons : [];
}

export function getActiveSeasons(leagueKey: string): LeagueSeason[] {
  return getSeasonsByLeagueKey(leagueKey).filter((s) => s.isActive);
}

export function getPreviousSeasons(leagueKey: string): LeagueSeason[] {
  return getSeasonsByLeagueKey(leagueKey).filter((s) => !s.isActive);
}

/**
 * Future: swap this to fetch remote JSON (Sheets, R2, etc.) and merge with defaults.
 * See README or inline comment where this is consumed.
 */
export type SoccerSeasonPayload = Pick<
  LeagueSeason,
  | 'seasonKey'
  | 'seasonLabel'
  | 'displayLabel'
  | 'isActive'
  | 'address'
  | 'gameTimeDetail'
  | 'weeklySchedule'
  | 'fixtures'
  | 'standingsMode'
  | 'standings'
  | 'teams'
>;

/**
 * Client bundle payload for soccer schedule/standings UI.
 * To update without redeploying: publish JSON at a stable URL (e.g. GitHub raw, Cloudflare R2,
 * Google Apps Script web app, or a small CMS) and fetch/merge in the page script instead of
 * bundling from this file. GitHub Actions vars are build-time only — not suitable for live reads in the browser.
 */
export function getSoccerSeasonsForClient(): SoccerSeasonPayload[] {
  return getSeasonsByLeagueKey('soccer-6v6-coed').map((s) => ({
    seasonKey: s.seasonKey,
    seasonLabel: s.seasonLabel,
    displayLabel: s.displayLabel,
    isActive: s.isActive,
    address: s.address,
    gameTimeDetail: s.gameTimeDetail,
    weeklySchedule: s.weeklySchedule,
    fixtures: s.fixtures,
    standingsMode: s.standingsMode,
    standings: s.standings,
    teams: s.teams
  }));
}
