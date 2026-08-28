import Brand from "../molecules/Brand";

const AuthHero = () => {
  return (
    <section
      className="
        flex
        min-h-screen
        flex-col
        bg-[#2a1d16]
        px-12
        py-12
      "
    >
      <Brand />

      {/* Hero Content */}
      <div className="flex flex-1 flex-col justify-center">
        <p
          className="
            font-body
            text-[12px]
            font-medium
            uppercase
            tracking-[0.25em]
            text-gold
          "
        >
          Your personal space
        </p>

        <h2
          className="
            mt-8
            max-w-[520px]
            font-display
            text-6xl
            font-medium
            leading-[1.15]
            text-paper
          "
        >
          Keep what
          <br />
          matters.
        </h2>

        <p
          className="
            mt-8
            max-w-[460px]
            font-body
            text-lg
            leading-relaxed
            text-paper/65
          "
        >
          A quiet place for your thoughts, ideas, and moments worth keeping.
        </p>
      </div>

      {/* Quote */}
      <div
        className="
          border-l
          border-gold
          pl-5
        "
      >
        <p
          className="
            max-w-[420px]
            font-display
            text-[16px]
            italic
            leading-relaxed
            text-paper/65
          "
        >
          “Some things are too important to leave only to memory.”
        </p>
      </div>
    </section>
  );
};

export default AuthHero;
