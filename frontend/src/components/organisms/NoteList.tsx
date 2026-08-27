import NoteCard from "../molecules/NoteCard"

const NoteList = () => {
  return (
    <section>
      <NoteCard
        title="A Good Day"
        preview="Today was one of those rare days where everything felt just right..."
        date="Today"
      />

      <NoteCard
        title="React Best Practices"
        preview="Some key takeaways and patterns I want to follow in my projects."
        date="Yesterday"
      />

      <NoteCard
        title="Project Ideas"
        preview="A collection of ideas for the next big project."
        date="2 days ago"
      />
    </section>
  )
}

export default NoteList