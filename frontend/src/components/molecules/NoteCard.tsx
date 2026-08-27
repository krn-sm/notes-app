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
    <article className="rounded-lg border border-stone-200 bg-[#fffdf8] p-5 shadow-sm">
      <p className="text-xs text-stone-400">
        {date}
      </p>

      <h2 className="mt-2 font-serif text-xl text-stone-900">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        {preview}
      </p>
    </article>
  )
}

export default NoteCard