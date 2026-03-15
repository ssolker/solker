import soccerIllustrationSpring from '../assets/soccer/soccer_spring.svg';
import soccerIllustrationSummer from '../assets/soccer/soccer_summer.svg';

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

export const leagues: League[] = [
  {
    title: '6v6 Co-Ed Soccer (Season 1)',
    subtitle: 'Thursday Nights (May 7th - June 25th)',
    badge: 'Coming soon!',
    imageSrc: soccerIllustrationSpring,
    imageAlt: 'Person standing on a soccer ball',
    imageCredit: soccerSpringImageCredit,
    primaryButtonText: 'Register',
    primaryButtonHref: '/league/registration',
    secondaryButtonText: 'Learn More',
    secondaryButtonHref: '/league/soccer#rules',
  },
  {
    title: '6v6 Co-Ed Soccer (Season 2)',
    subtitle: 'Thursday Nights (July - August)',
    badge: 'Dates TBD',
    imageSrc: soccerIllustrationSummer,
    imageAlt: 'Two soccer players in action',
    imageCredit: soccerSummerImageCredit,
    secondaryButtonText: 'Learn More',
    secondaryButtonHref: '/league/soccer#rules',
  },
];

export function filterLeagues(leagues: League[], filter?: string): League[] {
  if (!filter || filter.trim() === '') return leagues;
  const lower = filter.toLowerCase();
  return leagues.filter((l) => l.title.toLowerCase().includes(lower));
}
