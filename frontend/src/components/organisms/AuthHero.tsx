import Brand from "../molecules/Brand";

const AuthHero = () => {
  return (
    <section
      className="
        flex
        min-h-[380px]
        flex-col
        bg-leather
        px-6
        py-8

        sm:min-h-[440px]
        sm:px-10
        sm:py-10

        lg:min-h-screen
        lg:px-12
        lg:py-12
      "
    >
      <Brand />

      {/* Hero Content */}
      <div className="flex flex-1 flex-col justify-center py-14 lg:py-0">
        <p
          className="
            font-body
            text-[10px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-gold

            sm:text-[11px]
            
            lg:text-[12px]
            lg:tracking-[0.25em]
          "
        >
          Your personal space
        </p>

        <h2
          className="
            mt-5
            max-w-[520px]
            font-display
            text-4xl
            font-medium
            leading-[1.15]
            text-paper

            sm:text-5xl

            lg:mt-8
            lg:text-6xl
          "
        >
          Keep what
          <br />
          matters.
        </h2>

        <p
          className="
            mt-5
            max-w-[460px]
            font-body
            text-base
            leading-relaxed
            text-paper/65

            sm:text-lg

            lg:mt-8
          "
        >
          A quiet place for your thoughts, ideas, and moments worth keeping.
        </p>
      </div>

      {/* Quote */}
      <div
        className="
          hidden
          border-l
          border-gold
          pl-5

          lg:block
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
