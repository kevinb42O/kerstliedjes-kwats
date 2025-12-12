interface RoundProgressProps {
  current: number
  total: number
  isFinale?: boolean
}

export function RoundProgress({ current, total, isFinale = false }: RoundProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index < current
              ? isFinale
                ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse'
                : 'bg-accent shadow-md'
              : 'bg-muted border-2 border-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  )
}
