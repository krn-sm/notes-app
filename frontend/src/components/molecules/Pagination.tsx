import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Button from "../atoms/Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;

  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className="
        mt-6
        flex
        items-center
        justify-center
        gap-2
      "
    >
      {/* Previous */}

      <Button
        variant="ghost"
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="
          h-9
          w-9
          shrink-0
          !p-0
        "
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </Button>

      {/* Mobile */}

      <p
        className="
          min-w-[100px]
          text-center
          font-body
          text-sm
          text-ink-muted

          sm:hidden
        "
      >
        Page {currentPage} of {totalPages}
      </p>

      {/* Tablet and Desktop */}

      <div
        className="
          hidden
          items-center
          gap-1

          sm:flex
        "
      >
        {Array.from(
          { length: totalPages },
          (_, index) => {
            const page = index + 1;

            return (
              <Button
                key={page}
                variant={
                  currentPage === page
                    ? "primary"
                    : "ghost"
                }
                onClick={() =>
                  onPageChange(page)
                }
                className="
                  h-9
                  w-9
                  !p-0
                  text-sm
                "
              >
                {page}
              </Button>
            );
          },
        )}
      </div>

      {/* Next */}

      <Button
        variant="ghost"
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={
          currentPage === totalPages
        }
        className="
          h-9
          w-9
          shrink-0
          !p-0
        "
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};

export default Pagination;