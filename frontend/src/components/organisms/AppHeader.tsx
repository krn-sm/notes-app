import { useEffect, useState } from "react";

import type { User } from "../../services/authService";
import { getNotes } from "../../services/noteService";

import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";
import SearchBar from "../molecules/SearchBar";

type AppHeaderProps = {
  user: User | null;
  onProfileClick: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const AppHeader = ({
  user,
  onProfileClick,
  searchQuery,
  onSearchChange,
}: AppHeaderProps) => {
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    const loadNoteCount = async () => {
      try {
        const response = await getNotes();

        setNoteCount(response.total);
      } catch (error) {
        console.error("Failed to load note count:", error);
      }
    };

    loadNoteCount();
  }, []);

  return (
    <header
      className="
        flex
        h-[112px]
        shrink-0
        items-center
        justify-between
        border-b
        border-line
        bg-paper
        px-7
      "
    >
      {/* Greeting Section */}
      <div className="min-w-[260px]">
        <h1
          className="
            font-display
            text-[30px]
            font-medium
            text-ink
          "
        >
          Hello, {user?.name ?? "there"}
        </h1>

        <p
          className="
            mt-2
            font-body
            text-sm
            text-ink-muted
          "
        >
          You have {noteCount} note{noteCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-[300px]">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      {/* Header Actions */}
      <div className="flex min-w-[260px] items-center justify-end gap-6">
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