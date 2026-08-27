import NoteList from "../components/organisms/NoteList"

const HomePage = () => {
  return (
    <section className="p-8">
      <div className="mb-6">
        <h1 className="font-serif text-3xl text-stone-900">
          All Notes
        </h1>

        <p className="mt-1 text-sm text-stone-500">
          Your thoughts, ideas, and memories.
        </p>
      </div>

      <NoteList />
    </section>
  )
}

export default HomePage