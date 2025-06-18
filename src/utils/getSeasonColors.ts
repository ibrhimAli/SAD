export interface SeasonColors {
  /** Background classes to apply for the season */
  bg: string
  /** Optional illustration path placed under public/ */
  image: string
}

const MAP: Record<string, SeasonColors> = {
  Spring: {
    bg: 'bg-gradient-to-b from-green-50 via-green-100 to-green-200',
    image: '/spring.svg',
  },
  Summer: {
    bg: 'bg-gradient-to-b from-amber-50 via-amber-100 to-yellow-200',
    image: '/summer.svg',
  },
  Autumn: {
    bg: 'bg-gradient-to-b from-orange-50 via-orange-100 to-yellow-200',
    image: '/autumn.svg',
  },
  Winter: {
    bg: 'bg-gradient-to-b from-sky-50 via-sky-100 to-blue-200',
    image: '/winter.svg',
  },
}

export function getSeasonColors(season: string): SeasonColors {
  return MAP[season] ?? MAP.Spring
}
