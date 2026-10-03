import type { GrowthMilestone, GrowthPoint } from "@/lib/public-stats"

const WIDTH = 1_000
const HEIGHT = 410
const LEFT = 30
const RIGHT = 30
const TOP = 34
const BOTTOM = 62
const SUMMER_BREAK_START = { month: 5, day: 29 }
const SUMMER_BREAK_END = { month: 8, day: 7 }

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${value}T12:00:00Z`))
}

export function StatsGrowthChart({
  points,
  milestones,
}: {
  points: GrowthPoint[]
  milestones: GrowthMilestone[]
}) {
  if (points.length < 2) return null

  const max = Math.max(...points.map((point) => point.total), 1)
  const innerWidth = WIDTH - LEFT - RIGHT
  const innerHeight = HEIGHT - TOP - BOTTOM
  const x = (index: number) => LEFT + (index / (points.length - 1)) * innerWidth
  const y = (value: number) => TOP + innerHeight - (value / max) * innerHeight
  const path = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"}${x(index).toFixed(2)},${y(point.total).toFixed(2)}`
    )
    .join(" ")
  const area = `${path} L${x(points.length - 1)},${TOP + innerHeight} L${LEFT},${TOP + innerHeight} Z`
  const pointIndex = new Map(points.map((point, index) => [point.date, index]))
  const visibleMilestones = milestones
    .filter((milestone) => milestone.value >= 100)
    .slice(-5)
  const firstYear = Number(points[0].date.slice(0, 4))
  const lastYear = Number(points.at(-1)?.date.slice(0, 4))
  const summerBreaks = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, index) => firstYear + index
  ).flatMap((year) => {
    const startDate = isoDate(
      year,
      SUMMER_BREAK_START.month,
      SUMMER_BREAK_START.day
    )
    const endDate = isoDate(year, SUMMER_BREAK_END.month, SUMMER_BREAK_END.day)
    if (points.at(-1)!.date < startDate || points[0].date > endDate) return []

    const startIndex = points.findIndex((point) => point.date >= startDate)
    const endIndex = points.findLastIndex((point) => point.date <= endDate)
    if (startIndex < 0 || endIndex <= startIndex) return []

    return [{ year, start: x(startIndex), end: x(endIndex) }]
  })

  return (
    <figure>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-labelledby="growth-chart-title growth-chart-description"
        className="block h-auto w-full overflow-visible"
      >
        <title id="growth-chart-title">
          BetterLectios vækst siden marts 2026
        </title>
        <desc id="growth-chart-description">
          En stigende kurve fra den første elev til{" "}
          {max.toLocaleString("da-DK")} elever. Sommerpauserne fra slutningen af
          maj til begyndelsen af august er markeret.
        </desc>
        <defs>
          <linearGradient id="stats-growth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.19" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {summerBreaks.map((summerBreak) => (
          <g key={summerBreak.year} aria-hidden="true">
            <rect
              x={summerBreak.start}
              y={TOP}
              width={summerBreak.end - summerBreak.start}
              height={innerHeight}
              fill="currentColor"
              opacity="0.045"
            />
            <line
              x1={summerBreak.start}
              x2={summerBreak.start}
              y1={TOP}
              y2={TOP + innerHeight}
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeDasharray="3 8"
            />
            <line
              x1={summerBreak.end}
              x2={summerBreak.end}
              y1={TOP}
              y2={TOP + innerHeight}
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeDasharray="3 8"
            />
            {summerBreak.end - summerBreak.start >= 90 ? (
              <text
                x={(summerBreak.start + summerBreak.end) / 2}
                y={TOP + 24}
                fill="currentColor"
                opacity="0.48"
                textAnchor="middle"
                className="font-mono text-[18px] font-bold tracking-[0.08em]"
              >
                SOMMERFERIE
              </text>
            ) : null}
          </g>
        ))}

        {[0.25, 0.5, 0.75, 1].map((fraction) => {
          const lineY = TOP + innerHeight * (1 - fraction)
          return (
            <line
              key={fraction}
              x1={LEFT}
              x2={WIDTH - RIGHT}
              y1={lineY}
              y2={lineY}
              stroke="currentColor"
              strokeOpacity="0.11"
              strokeDasharray="3 8"
            />
          )
        })}

        <path d={area} fill="url(#stats-growth-fill)" />
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {visibleMilestones.map((milestone) => {
          const index = pointIndex.get(milestone.date)
          if (index == null) return null
          const px = x(index)
          const py = y(milestone.value)
          return (
            <g key={milestone.value}>
              <circle
                cx={px}
                cy={py}
                r="8"
                fill="#252525"
                stroke="white"
                strokeWidth="4"
              />
              <text
                x={px}
                y={Math.max(18, py - 18)}
                fill="currentColor"
                textAnchor="middle"
                className="font-mono text-[19px] font-bold"
              >
                {milestone.value.toLocaleString("da-DK")}
              </text>
            </g>
          )
        })}

        <text
          x={LEFT}
          y={HEIGHT - 18}
          fill="currentColor"
          opacity="0.55"
          className="font-mono text-[17px]"
        >
          {dateLabel(points[0].date)}
        </text>
        <text
          x={WIDTH - RIGHT}
          y={HEIGHT - 18}
          fill="currentColor"
          opacity="0.55"
          textAnchor="end"
          className="font-mono text-[17px]"
        >
          I dag
        </text>
      </svg>
      <figcaption className="sr-only">
        Udviklingen i det samlede antal elever, der har taget BetterLectio i
        brug.
      </figcaption>
    </figure>
  )
}
