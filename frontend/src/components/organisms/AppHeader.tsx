import { Grid2X2, List } from "lucide-react";

import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";
import SearchBar from "../molecules/SearchBar";

const AppHeader = () => {
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
            text-[20px]
            font-medium
            text-ink
          "
        >
          Good morning, Kiran
          <span className="ml-2 text-gold">☀</span>
        </h1>

        <p
          className="
            mt-2
            font-body
            text-sm
            text-ink-muted
          "
        >
          You have 23 notes
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-[300px]">
        <SearchBar value="" onChange={() => {}} />
      </div>

      {/* Header Actions */}
      <div className="flex min-w-[260px] items-center justify-end gap-6">
        {/* View Toggle */}
        <div
          className="
            flex
            h-11
            overflow-hidden
            rounded-xl
            border
            border-line
            bg-paper-dark
          "
        >
          <Button
            variant="ghost"
            aria-label="List view"
            className="
              h-full
              w-11
              !rounded-none
              !px-0
              !py-0
              border-r
              border-line
              !bg-paper
              !text-ink
            "
          >
            <List size={19} strokeWidth={1.8} />
          </Button>

          <Button
            variant="ghost"
            aria-label="Grid view"
            className="
              h-full
              w-11
              !rounded-none
              !px-0
              !py-0
            "
          >
            <Grid2X2 size={18} strokeWidth={1.7} />
          </Button>
        </div>

        {/* User Profile */}
        <Button
          variant="ghost"
          className="
            gap-3
            !rounded-xl
            !px-2
            !py-1.5
          "
        >
          <Avatar name="Jack Sparrow" />

          <span
            className="
            font-body
            text-sm
            font-medium
            text-ink
          "
          >
            Jack Sparrow
          </span>
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
