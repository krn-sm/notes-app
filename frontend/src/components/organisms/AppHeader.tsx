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
        flex
        shrink-0
        flex-col
        gap-4
        border-b
        border-line
        bg-paper
        px-5
        py-5

        md:h-[112px]
        md:flex-row
        md:items-center
        md:justify-between
        md:px-7
        md:py-0
      "
    >
      {/* Greeting */}

      <div className="shrink-0">
        <h1
          className="
            font-display
            text-2xl
            font-medium
            text-ink

            md:text-[30px]
          "
        >
          Hello, {user?.name ?? "there"}
        </h1>

        <p
          className="
            mt-1
            font-body
            text-sm
            text-ink-muted
          "
        >
          You have {noteCount} note
          {noteCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search */}

      <div
        className="
          w-full

          md:max-w-[300px]
        "
      >
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      {/* Profile */}

      <div
        className="
          flex
          shrink-0
          items-center

          md:justify-end
        "
      >
        {user && (
          <Button
            variant="ghost"
            onClick={onProfileClick}
            className="
              gap-3
              !rounded-xl
              !px-2
              !py-1.5
            "
          >
            <Avatar name={user.name} />

            <span
              className="
                font-body
                text-sm
                font-medium
                text-ink
              "
            >
              {user.name}
            </span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;