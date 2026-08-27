const NoteEditor = () => {
  return (
    <section className="min-h-screen bg-[#f6f0e4] p-10">
      <div className="mx-auto max-w-3xl">
        <input
          type="text"
          placeholder="Untitled"
          className="w-full bg-transparent font-serif text-4xl text-stone-900 outline-none placeholder:text-stone-400"
        />

        <div className="my-6 border-t border-stone-300" />

        <textarea
          placeholder="Start writing..."
          className="min-h-[500px] w-full resize-none bg-transparent font-serif text-lg leading-loose text-stone-700 outline-none placeholder:text-stone-400"
        />
      </div>
    </section>
  )
}

export default NoteEditor