export interface TeamInfo {
  teamName: string;
  captainName: string;
}

/** One row in the basic 8-week calendar. */
export interface WeeklyScheduleRow {
  weekLabel: string;
  dateLabel: string;
  status: string;
}

/**
 * One match in the full schedule — all data lives here (no auto-generation).
 * - `startTime`: shown in the full schedule (e.g. "6:30 PM").
 * - `homeGoals` / `awayGoals`: set when final; omit or `null` if not played yet.
 * - `result`: optional override text for the Result column (e.g. "Postponed"). If omitted, Result is derived from goals or shows "—".
 * - `spiritHome` / `spiritAway`: optional; used only for standings tie-break (not shown in the schedule table).
 */
export interface SeasonFixture {
  id: string;
  date: string;
  startTime: string;
  fieldName: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals?: number | null;
  awayGoals?: number | null;
  result?: string | null;
  spiritHome?: number | null;
  spiritAway?: number | null;
}

/** Standings row stored in catalog (optional baseline); UI standings are computed from fixtures. */
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
  leagueLabel: string;
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

const SOC_ADDRESS = 'Cowan Park, Woodstock, Ontario';

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
  { teamName: 'Taylor', captainName: 'Zack Taylor' },
  { teamName: 'Thomas', captainName: 'Jonathan Thomas' },
  { teamName: 'Thompson', captainName: 'Annika Thompson' }
];

const soccerSeason1Weekly: WeeklyScheduleRow[] = [
  { weekLabel: 'Week 1', dateLabel: 'Monday, May 4', status: 'Season Opener' },
  { weekLabel: 'Week 2', dateLabel: 'Monday, May 11', status: 'Regular Season' },
  { weekLabel: '—', dateLabel: 'Monday, May 18', status: 'NO GAMES (Victoria Day)' },
  { weekLabel: 'Week 3', dateLabel: 'Monday, May 25', status: 'Regular Season' },
  { weekLabel: 'Week 4', dateLabel: 'Monday, June 1', status: 'Regular Season' },
  { weekLabel: 'Week 5', dateLabel: 'Monday, June 8', status: 'Regular Season' },
  { weekLabel: 'Week 6', dateLabel: 'Monday, June 15', status: 'Regular Season' },
  { weekLabel: 'Week 7', dateLabel: 'Monday, June 22', status: 'Regular Season' },
  { weekLabel: 'Week 8', dateLabel: 'Monday, June 29', status: 'Finals / Championship Night' }
];

const soccerSeason2Weekly: WeeklyScheduleRow[] = [
  { weekLabel: 'Proposed Dates', dateLabel: '—', status: 'Not Firmed Yet' },
  { weekLabel: 'Week 1', dateLabel: 'Monday, July 6', status: 'Season Opener' },
  { weekLabel: 'Week 2', dateLabel: 'Monday, July 13', status: 'Regular Season' },
  { weekLabel: 'Week 3', dateLabel: 'Monday, July 20', status: 'Regular Season' },
  { weekLabel: 'Week 4', dateLabel: 'Monday, July 27', status: 'Regular Season' },
  { weekLabel: '—', dateLabel: 'Monday, August 3', status: 'NO GAMES (Civic Holiday)' },
  { weekLabel: 'Week 5', dateLabel: 'Monday, August 10', status: 'Regular Season' },
  { weekLabel: 'Week 6', dateLabel: 'Monday, August 17', status: 'Regular Season' },
  { weekLabel: 'Week 7', dateLabel: 'Monday, August 24', status: 'Regular Season' },
  { weekLabel: 'Week 8', dateLabel: 'Monday, August 31', status: 'Finals / Championship Night' }
];

/**
 * Season 1 full schedule — edit this list only (copy rows to add games).
 * Standings are calculated from `homeGoals` / `awayGoals` and optional `spiritHome` / `spiritAway`.
 */
const SOCCER_SEASON_1_FIXTURES: SeasonFixture[] = [
  // {
  //   id: 'soccer-season-1-g01',
  //   date: '2026-05-04',
  //   startTime: '6:30 PM',
  //   fieldName: 'Cowan Park',
  //   homeTeam: 'Batth',
  //   awayTeam: 'Bender',
  //   homeGoals: null,
  //   awayGoals: null
  // },
  // {
  //   id: 'soccer-season-1-g02',
  //   date: '2026-05-04',
  //   startTime: '7:30 PM',
  //   fieldName: 'Cowan Park',
  //   homeTeam: 'Butler',
  //   awayTeam: 'Myers',
  //   homeGoals: null,
  //   awayGoals: null
  // },
  // {
  //   id: 'soccer-season-1-g03',
  //   date: '2026-05-11',
  //   startTime: '6:30 PM',
  //   fieldName: 'Cowan Park',
  //   homeTeam: 'Solker',
  //   awayTeam: 'Taylor',
  //   homeGoals: null,
  //   awayGoals: null
  // }
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
        leagueLabel: 'Soccer - Season 1 (May - Jun) 2026',
        submissionValue: 'Soccer - Season 1 - 50',
        price: 50,
        startDate: '2026-05-04',
        endDate: '2026-06-29',
        registrationClosesAt: '2026-05-01T23:59:59-04:00',
        teams: soccerS1Teams,
        isActive: true,
        address: SOC_ADDRESS,
        gameTimeDetail: 'Game 1: 6:30pm–7:15pm, Game 2: 7:30pm-8:15pm',
        weeklySchedule: soccerSeason1Weekly,
        fixtures: SOCCER_SEASON_1_FIXTURES,
        standingsMode: 'table',
        standings: emptyStandings(soccerS1Teams.map((t) => t.teamName))
      },
      {
        seasonKey: 'soccer-season-2',
        seasonLabel: 'Season 2',
        displayLabel: 'Soccer - Season 2 (Jul - Aug) - $50',
        leagueLabel: 'Soccer - Season 2 (Jul - Aug) 2026',
        submissionValue: 'Soccer - Season 2 - 50',
        price: 50,
        startDate: '2026-07-06',
        endDate: '2026-08-31',
        registrationClosesAt: '2026-06-01T23:59:59-04:00',
        teams: soccerS1Teams.map((t) => ({ ...t })),
        isActive: true,
        address: SOC_ADDRESS,
        gameTimeDetail: 'Game 1: 6:30pm–7:15pm, Game 2: 7:30pm-8:15pm',
        weeklySchedule: soccerSeason2Weekly,
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
      leagueLabel: season.leagueLabel,
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
  | 'leagueLabel'
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
    leagueLabel: s.leagueLabel,
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
