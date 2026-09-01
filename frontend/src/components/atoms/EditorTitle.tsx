import { useLayoutEffect, useRef, useState } from "react"

type EditorTitleProps = {
  value: string
  onChange: (value: string) => void
}

const EditorTitle = ({
  value,
  onChange,
}: EditorTitleProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [highlightWidth, setHighlightWidth] = useState(0)

  useLayoutEffect(() => {
    const textWidth = measureRef.current?.offsetWidth ?? 0
    const available = containerRef.current?.offsetWidth ?? 0

    setHighlightWidth(Math.min(textWidth, available))
  }, [value])

  return (
    <div ref={containerRef} className="relative min-w-0 max-w-full">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Untitled"
        className="
          relative
          z-10
          block
          w-full
          truncate
          bg-transparent
          font-display
          text-[26px]
          font-semibold
          text-ink
          outline-none
          placeholder:text-ink-muted
        "
      />

      {/* Hidden mirror used only to measure the rendered text width */}
      <span
        ref={measureRef}
        aria-hidden
        className="
          invisible
          absolute
          left-0
          top-0
          whitespace-pre
          font-display
          text-[26px]
          font-semibold
        "
      >
        {value}
      </span>

      {value && (
        <span
          aria-hidden
          className="
            pointer-events-none
            absolute
            -bottom-1
            left-0
            z-0
            h-3
            -rotate-1
            rounded-sm
            bg-gold-light/70
            mix-blend-multiply
          "
          style={{ width: highlightWidth }}
        />
      )}
    </div>
  )
}

export default EditorTitle