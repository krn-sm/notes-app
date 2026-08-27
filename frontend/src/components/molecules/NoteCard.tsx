type NoteCardProps = {
  title: string
  preview: string
  date: string
}

const NoteCard = ({
  title,
  preview,
  date,
}: NoteCardProps) => {
  return (
    <article
      className="
        rounded-lg
        border
        border-line
        bg-paper
        p-5
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <p className="text-xs text-ink-muted">
        {date}
      </p>

      <h2 className="mt-2 font-serif text-xl text-ink">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {preview}
      </p>
    </article>
  )
}

export default NoteCard