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
 * - `countsForStandings`: when false, fixture is excluded from standings (e.g. playoffs). Defaults to true.
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
  /** Omit or true for regular season; false for cup/playoff games */
  countsForStandings?: boolean;
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
  /** Dedicated page for this sport/league (e.g. "/league/soccer"). */
  pagePath: string;
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

const soccerS2Teams: TeamInfo[] = [
  { teamName: 'Batth', captainName: 'Ruban Batth' },
  { teamName: 'Bender', captainName: 'Aiden Bender' },
  { teamName: 'Butler', captainName: 'Darcey Butler' },
  { teamName: 'O\'Leary', captainName: 'Nash O\'Leary' },
  { teamName: 'Baer', captainName: 'Hannah Baer' },
  { teamName: 'Taylor', captainName: 'Zack Taylor' },
  { teamName: 'Abouzeenni', captainName: 'Adam Abouzeenni' },
  { teamName: 'Thompson', captainName: 'Annika Thompson' }
];

const soccerSeason2Weekly: WeeklyScheduleRow[] = [
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
 * Season 1: double round-robin built as two single round-robins back-to-back (waves 0-6 then 7-13).
 * Each team meets every other team once before any rematch. Week 1 opener (6:30) unchanged.
 * Fields J/H/G/K: each kickoff wave permutes which matchup is on which field so every team plays
 * 3-4 games per field (even rotation). Nominal home-field pairs (each pair shares a preferred surface):
 * Batth & Solker → J; Bender & Taylor → H; Butler & Thomas → G; Myers & Thompson → K.
 * Finals night: 6:30 semis; 7:30 championship + 3rd (top), 5th + 7th (bottom). Playoffs: countsForStandings false.
 */
const SOCCER_SEASON_1_FIXTURES: SeasonFixture[] = [
  { id: 'soccer-season-1-g01', date: '2026-05-04', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Butler', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g02', date: '2026-05-04', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Bender', awayTeam: 'Solker' },
  { id: 'soccer-season-1-g03', date: '2026-05-04', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Batth', awayTeam: 'Myers' },
  { id: 'soccer-season-1-g04', date: '2026-05-04', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Thomas', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g05', date: '2026-05-04', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Batth', awayTeam: 'Bender' },
  { id: 'soccer-season-1-g06', date: '2026-05-04', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Myers' },
  { id: 'soccer-season-1-g07', date: '2026-05-04', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Solker', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g08', date: '2026-05-04', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Taylor', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g09', date: '2026-05-11', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Batth', awayTeam: 'Butler' },
  { id: 'soccer-season-1-g10', date: '2026-05-11', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Bender', awayTeam: 'Myers' },
  { id: 'soccer-season-1-g11', date: '2026-05-11', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Solker', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g12', date: '2026-05-11', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Taylor', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g13', date: '2026-05-11', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Batth', awayTeam: 'Solker' },
  { id: 'soccer-season-1-g14', date: '2026-05-11', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g15', date: '2026-05-11', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Butler', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g16', date: '2026-05-11', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Myers', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g17', date: '2026-05-25', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Batth', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g18', date: '2026-05-25', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Bender', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g19', date: '2026-05-25', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Butler', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g20', date: '2026-05-25', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Myers', awayTeam: 'Solker' },
  { id: 'soccer-season-1-g21', date: '2026-05-25', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Batth', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g22', date: '2026-05-25', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Bender', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g23', date: '2026-05-25', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Solker' },
  { id: 'soccer-season-1-g24', date: '2026-05-25', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Myers', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g25', date: '2026-06-01', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Batth', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g26', date: '2026-06-01', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Butler' },
  { id: 'soccer-season-1-g27', date: '2026-06-01', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Myers', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g28', date: '2026-06-01', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Solker', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g29', date: '2026-06-01', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Butler', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g30', date: '2026-06-01', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Bender', awayTeam: 'Solker' },
  { id: 'soccer-season-1-g31', date: '2026-06-01', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Batth', awayTeam: 'Myers' },
  { id: 'soccer-season-1-g32', date: '2026-06-01', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Thomas', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g33', date: '2026-06-08', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Batth', awayTeam: 'Bender' },
  { id: 'soccer-season-1-g34', date: '2026-06-08', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Butler', awayTeam: 'Myers' },
  { id: 'soccer-season-1-g35', date: '2026-06-08', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Solker', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g36', date: '2026-06-08', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Taylor', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g37', date: '2026-06-08', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Batth', awayTeam: 'Butler' },
  { id: 'soccer-season-1-g38', date: '2026-06-08', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Bender', awayTeam: 'Myers' },
  { id: 'soccer-season-1-g39', date: '2026-06-08', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Solker', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g40', date: '2026-06-08', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Taylor', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g41', date: '2026-06-15', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Batth', awayTeam: 'Solker' },
  { id: 'soccer-season-1-g42', date: '2026-06-15', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Bender', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g43', date: '2026-06-15', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Butler', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g44', date: '2026-06-15', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Myers', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g45', date: '2026-06-15', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Batth', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g46', date: '2026-06-15', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Bender', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g47', date: '2026-06-15', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g48', date: '2026-06-15', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Myers', awayTeam: 'Solker' },
  { id: 'soccer-season-1-g49', date: '2026-06-22', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Batth', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g50', date: '2026-06-22', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g51', date: '2026-06-22', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Solker' },
  { id: 'soccer-season-1-g52', date: '2026-06-22', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Myers', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g53', date: '2026-06-22', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Batth', awayTeam: 'Thompson' },
  { id: 'soccer-season-1-g54', date: '2026-06-22', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Bender', awayTeam: 'Butler' },
  { id: 'soccer-season-1-g55', date: '2026-06-22', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Myers', awayTeam: 'Thomas' },
  { id: 'soccer-season-1-g56', date: '2026-06-22', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Solker', awayTeam: 'Taylor' },
  { id: 'soccer-season-1-g57', date: '2026-06-29', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Seed 1', awayTeam: 'Seed 4', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-1-g58', date: '2026-06-29', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Seed 2', awayTeam: 'Seed 3', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-1-g59', date: '2026-06-29', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Seed 5', awayTeam: 'Seed 8', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-1-g60', date: '2026-06-29', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Seed 6', awayTeam: 'Seed 7', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-1-g61', date: '2026-06-29', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Winner (1 v 4)', awayTeam: 'Winner (2 v 3)', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-1-g62', date: '2026-06-29', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Loser (1 v 4)', awayTeam: 'Loser (2 v 3)', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-1-g63', date: '2026-06-29', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Winner (5 v 8)', awayTeam: 'Winner (6 v 7)', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-1-g64', date: '2026-06-29', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Loser (5 v 8)', awayTeam: 'Loser (6 v 7)', countsForStandings: false, result: 'TBD' },
];

/**
 * Season 2: double round-robin — randomized first half (rounds 0–6), then exact repeat (rounds 7–13).
 * Civic Holiday off week Aug 3. Bender always on Field H; Butler always on Field G (head-to-head splits H/G).
 * Nominal home-field pairs: Batth & Baer → J; Bender → H; Butler → G; O'Leary & Thompson → K.
 * Week 8 playoffs: top bracket (seeds 1–4) on Fields G & H; bottom bracket (seeds 5–8) on Fields J & K.
 */
const SOCCER_SEASON_2_FIXTURES: SeasonFixture[] = [
  { id: 'soccer-season-2-g01', date: '2026-07-06', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g02', date: '2026-07-06', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g03', date: '2026-07-06', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'Batth' },
  { id: 'soccer-season-2-g04', date: '2026-07-06', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Abouzeenni', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g05', date: '2026-07-06', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Baer' },
  { id: 'soccer-season-2-g06', date: '2026-07-06', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g07', date: '2026-07-06', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Batth', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g08', date: '2026-07-06', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Abouzeenni', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g09', date: '2026-07-13', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Butler' },
  { id: 'soccer-season-2-g10', date: '2026-07-13', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g11', date: '2026-07-13', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Batth', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g12', date: '2026-07-13', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'O\'Leary', awayTeam: 'Abouzeenni' },
  { id: 'soccer-season-2-g13', date: '2026-07-13', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Baer' },
  { id: 'soccer-season-2-g14', date: '2026-07-13', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Abouzeenni' },
  { id: 'soccer-season-2-g15', date: '2026-07-13', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Thompson', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g16', date: '2026-07-13', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Batth', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g17', date: '2026-07-20', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Abouzeenni' },
  { id: 'soccer-season-2-g18', date: '2026-07-20', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Batth' },
  { id: 'soccer-season-2-g19', date: '2026-07-20', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g20', date: '2026-07-20', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Thompson', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g21', date: '2026-07-20', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Batth' },
  { id: 'soccer-season-2-g22', date: '2026-07-20', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g23', date: '2026-07-20', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'Abouzeenni' },
  { id: 'soccer-season-2-g24', date: '2026-07-20', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Taylor', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g25', date: '2026-07-27', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g26', date: '2026-07-27', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g27', date: '2026-07-27', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g28', date: '2026-07-27', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Abouzeenni', awayTeam: 'Batth' },
  { id: 'soccer-season-2-g29', date: '2026-07-27', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g30', date: '2026-07-27', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g31', date: '2026-07-27', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'Batth' },
  { id: 'soccer-season-2-g32', date: '2026-07-27', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Abouzeenni', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g33', date: '2026-08-10', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Baer' },
  { id: 'soccer-season-2-g34', date: '2026-08-10', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g35', date: '2026-08-10', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Batth', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g36', date: '2026-08-10', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Abouzeenni', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g37', date: '2026-08-10', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Bender' },
  { id: 'soccer-season-2-g38', date: '2026-08-10', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g39', date: '2026-08-10', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Batth', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g40', date: '2026-08-10', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'O\'Leary', awayTeam: 'Abouzeenni' },
  { id: 'soccer-season-2-g41', date: '2026-08-17', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Baer' },
  { id: 'soccer-season-2-g42', date: '2026-08-17', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Abouzeenni' },
  { id: 'soccer-season-2-g43', date: '2026-08-17', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Thompson', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g44', date: '2026-08-17', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Batth', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g45', date: '2026-08-17', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Abouzeenni' },
  { id: 'soccer-season-2-g46', date: '2026-08-17', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Batth' },
  { id: 'soccer-season-2-g47', date: '2026-08-17', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g48', date: '2026-08-17', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Thompson', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g49', date: '2026-08-24', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Batth' },
  { id: 'soccer-season-2-g50', date: '2026-08-24', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g51', date: '2026-08-24', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'Abouzeenni' },
  { id: 'soccer-season-2-g52', date: '2026-08-24', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Taylor', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g53', date: '2026-08-24', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Butler', awayTeam: 'Taylor' },
  { id: 'soccer-season-2-g54', date: '2026-08-24', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Bender', awayTeam: 'Thompson' },
  { id: 'soccer-season-2-g55', date: '2026-08-24', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Baer', awayTeam: 'O\'Leary' },
  { id: 'soccer-season-2-g56', date: '2026-08-24', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Abouzeenni', awayTeam: 'Batth' },
  { id: 'soccer-season-2-g57', date: '2026-08-31', startTime: '6:30 PM', fieldName: 'Field G', homeTeam: 'Seed 1', awayTeam: 'Seed 4', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-2-g58', date: '2026-08-31', startTime: '6:30 PM', fieldName: 'Field H', homeTeam: 'Seed 2', awayTeam: 'Seed 3', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-2-g59', date: '2026-08-31', startTime: '6:30 PM', fieldName: 'Field J', homeTeam: 'Seed 5', awayTeam: 'Seed 8', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-2-g60', date: '2026-08-31', startTime: '6:30 PM', fieldName: 'Field K', homeTeam: 'Seed 6', awayTeam: 'Seed 7', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-2-g61', date: '2026-08-31', startTime: '7:30 PM', fieldName: 'Field G', homeTeam: 'Winner (1 v 4)', awayTeam: 'Winner (2 v 3)', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-2-g62', date: '2026-08-31', startTime: '7:30 PM', fieldName: 'Field H', homeTeam: 'Loser (1 v 4)', awayTeam: 'Loser (2 v 3)', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-2-g63', date: '2026-08-31', startTime: '7:30 PM', fieldName: 'Field J', homeTeam: 'Winner (5 v 8)', awayTeam: 'Winner (6 v 7)', countsForStandings: false, result: 'TBD' },
  { id: 'soccer-season-2-g64', date: '2026-08-31', startTime: '7:30 PM', fieldName: 'Field K', homeTeam: 'Loser (5 v 8)', awayTeam: 'Loser (6 v 7)', countsForStandings: false, result: 'TBD' },
];

export const leagueCatalog: LeagueCatalogEntry[] = [
  {
    leagueKey: 'soccer-6v6-coed',
    leagueSportName: '6v6 Co-Ed Soccer',
    pagePath: '/league/soccer',
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
        isActive: false,
        address: SOC_ADDRESS,
        gameTimeDetail: 'Regular season: two waves (6:30 and 7:30), four games per wave on Fields J/H/G/K. Championship night: semis 6:30; 7:30 has four placement games (1st, 3rd, 5th, 7th).',
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
        registrationClosesAt: '2026-07-07T23:59:59-04:00',
        teams: soccerS2Teams,
        isActive: true,
        address: SOC_ADDRESS,
        gameTimeDetail: 'Regular season: two waves (6:30 and 7:30), four games per wave on Fields J/H/G/K. Championship night: semis 6:30; 7:30 has four placement games (1st, 3rd, 5th, 7th).',
        weeklySchedule: soccerSeason2Weekly,
        fixtures: SOCCER_SEASON_2_FIXTURES,
        standingsMode: 'table',
        standings: emptyStandings(soccerS2Teams.map((t) => t.teamName))
      }
    ]
  }
];

/** Links to each sport/league page, for the league home "View Leagues" dropdown. */
export function getLeagueLinks(): { label: string; href: string }[] {
  return leagueCatalog.map((league) => ({
    label: league.leagueSportName,
    href: league.pagePath
  }));
}

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
