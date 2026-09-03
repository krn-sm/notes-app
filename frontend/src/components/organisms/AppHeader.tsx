import type { User } from "../../services/authService";

import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";
import SearchBar from "../molecules/SearchBar";

type AppHeaderProps = {
  user: User | null;

  noteCount: number;

  onProfileClick: () => void;

  searchQuery: string;

  onSearchChange: (value: string) => void;
};

const AppHeader = ({
  user,
  noteCount,
  onProfileClick,
  searchQuery,
  onSearchChange,
}: AppHeaderProps) => {
  return (
    <header
      className="
        shrink-0
        border-b
        border-line
        bg-paper
        px-4
        py-4

        sm:px-6
        sm:py-5

        lg:flex
        lg:h-[112px]
        lg:items-center
        lg:justify-between
        lg:px-7
        lg:py-0
      "
    >
      {/* Top Row */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4

          lg:contents
        "
      >
        {/* Greeting */}

        <div className="min-w-0 shrink">
          <h1
            className="
              truncate
              font-display
              text-[22px]
              font-medium
              text-ink

              sm:text-2xl

              lg:text-[30px]
            "
          >
            Hello, {user?.name ?? "there"}
          </h1>

          <p
            className="
              mt-1
              font-body
              text-xs
              text-ink-muted

              sm:text-sm
            "
          >
            You have {noteCount} note
            {noteCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Profile */}

        <div
          className="
            flex
            shrink-0
            items-center

            lg:order-3
          "
        >
          {user && (
            <Button
              variant="ghost"
              onClick={onProfileClick}
              className="
                !h-10
                !w-10
                !rounded-full
                !p-0

                sm:h-auto
                sm:w-auto
                sm:gap-3
                sm:!rounded-xl
                sm:!px-2
                sm:!py-1.5
              "
              aria-label="Open profile"
            >
              <Avatar name={user.name} />

              <span
                className="
                  hidden
                  font-body
                  text-sm
                  font-medium
                  text-ink

                  sm:inline
                "
              >
                {user.name}
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* Search */}

      <div
        className="
          mt-4
          w-full

          lg:order-2
          lg:mt-0
          lg:max-w-[320px]
        "
      >
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </header>
  );
};

export default AppHeader;
