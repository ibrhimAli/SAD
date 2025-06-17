export interface SeasonColors {
  /** Background classes to apply for the season */
  bg: string
  /** Optional illustration path placed under public/ */
  image: string
}

const MAP: Record<string, SeasonColors> = {
  Spring: {
    bg: 'bg-gradient-to-b from-green-100 via-green-200 to-green-300',
    image: '/spring.svg',
  },
  Summer: {
    bg: 'bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300',
    image: '/summer.svg',
  },
  Autumn: {
    bg: 'bg-gradient-to-b from-orange-200 via-orange-300 to-yellow-300',
    image: '/autumn.svg',
  },
  Winter: {
    bg: 'bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300',
    image: '/winter.svg',
  },
}

export function getSeasonColors(season: string): SeasonColors {
  return MAP[season] ?? MAP.Spring
}
