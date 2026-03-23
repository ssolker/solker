import soccerIllustrationSpring from '../assets/soccer/soccer_spring.svg';
import soccerIllustrationSummer from '../assets/soccer/soccer_summer.svg';
import { leagueCatalog, isRegistrationOpen } from './leagueCatalog';

const soccerSpringImageCredit =
  'Illustration by <a href="https://unsplash.com/@fadhilsanad?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Fast Ink</a> on <a href="https://unsplash.com/illustrations/a-person-standing-on-top-of-a-soccer-ball-JYoednJRax0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>';
const soccerSummerImageCredit =
  'Illustration by <a href="https://unsplash.com/@simonliillustrates?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Simon Li</a> on <a href="https://unsplash.com/illustrations/two-soccer-players-in-action-on-the-field-r48cN5wp-B0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>';

export interface League {
  title: string;
  subtitle?: string;
  badge: string;
  imageSrc: { src: string } | string;
  imageAlt?: string;
  imageCredit?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

var soccerLeague = leagueCatalog.find(function (entry) {
  return entry.leagueKey === 'soccer-6v6-coed';
});
var soccerGameDay = soccerLeague ? soccerLeague.gameDay : '';
/** Only seasons marked active in league catalog (single source of truth). */
var soccerSeasons = soccerLeague ? soccerLeague.seasons.filter(function (s) { return s.isActive; }) : [];

function formatRange(startDate: string, endDate: string): string {
  var start = new Date(startDate);
  var end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '';
  var month = function (d: Date) {
    return d.toLocaleString('en-CA', { month: 'long' });
  };
  if (start.getMonth() === end.getMonth()) {
    return month(start) + ' ' + start.getDate() + 'th - ' + month(end) + ' ' + end.getDate() + 'th';
  }
  return month(start) + ' - ' + month(end);
}

export const leagues: League[] = soccerSeasons.map(function (season, index) {
  var isOpen = isRegistrationOpen(season.registrationClosesAt);
  var badge = isOpen ? (index === 0 ? 'Coming soon!' : 'Dates TBD') : 'Registration Closed';
  return {
    title: '6v6 Co-Ed Soccer (' + season.seasonLabel + ')',
    subtitle: soccerGameDay + ' (' + formatRange(season.startDate, season.endDate) + ')',
    badge: badge,
    imageSrc: index === 0 ? soccerIllustrationSpring : soccerIllustrationSummer,
    imageAlt: index === 0 ? 'Person standing on a soccer ball' : 'Two soccer players in action',
    imageCredit: index === 0 ? soccerSpringImageCredit : soccerSummerImageCredit,
    primaryButtonText: isOpen ? 'Register' : 'Registration Closed',
    primaryButtonHref: isOpen ? '/league/registration' : undefined,
    secondaryButtonText: 'Learn More',
    secondaryButtonHref: '/league/soccer#rules'
  };
});

export function filterLeagues(leagues: League[], filter?: string): League[] {
  if (!filter || filter.trim() === '') return leagues;
  const lower = filter.toLowerCase();
  return leagues.filter((l) => l.title.toLowerCase().includes(lower));
}
