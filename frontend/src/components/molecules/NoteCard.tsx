import { RotateCcw, Star, Trash2 } from "lucide-react";

import Badge from "../atoms/Badge";
import Button from "../atoms/Button";

type Tag = {
  id: number;
  name: string;
};

type NoteCardProps = {
  id: number;
  title: string;
  preview: string;
  date: string;
  tags?: Tag[];
  isFavorite?: boolean;
  isDeleted?: boolean;
  isSelected?: boolean;
  variant?: "grid" | "sidebar";
  onClick: (id: number) => void;
  onFavoriteToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onRestore?: (id: number) => void;
};

const NoteCard = ({
  id,
  title,
  preview,
  date,
  tags = [],
  isFavorite,
  isDeleted = false,
  isSelected = false,
  variant = "grid",
  onClick,
  onFavoriteToggle,
  onDelete,
  onRestore,
}: NoteCardProps) => {
  const isSidebar = variant === "sidebar";

  const plainPreview = preview
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return (
    <article
      onClick={() => onClick(id)}
      className={`
        flex
        cursor-pointer
        flex-col
        rounded-xl
        border
        bg-paper
        shadow-sm
        transition

${
  isSidebar
    ? `
    h-[150px]
    shrink-0
    items-center
    justify-center
    px-4
    py-4
    text-center

    sm:h-[165px]
    sm:px-6
    sm:py-5
  `
    : `
    min-h-[250px]
    p-4

    sm:min-h-[280px]
    sm:p-6
  `
}

        ${
          isSelected
            ? `
              border-gold
              bg-paper-dark
              shadow-md
            `
            : `
              border-line
              hover:-translate-y-1
              hover:shadow-md
            `
        }
      `}
    >
      {isSidebar ? (
        <>
          {/* Title */}

          <h2
            className="
        line-clamp-3
        font-display
        text-xl
        font-semibold
        leading-snug
        text-ink
      "
          >
            {title}
          </h2>

          {/* Time */}

          <p
            className="
        mt-auto
        font-body
        text-sm
        text-ink-muted
      "
          >
            {date}
          </p>
        </>
      ) : (
        <>
          {/* Title */}

          <h2
            className="
              line-clamp-2
              font-display
              text-xl
              font-semibold
              text-ink
            "
          >
            {title}
          </h2>

          {/* Preview */}

          <p
            className="
              mt-3
              line-clamp-3
              font-body
              text-sm
              leading-relaxed
              text-ink-muted
            "
          >
            {plainPreview || "No Content"}
          </p>

          {/* Tags */}

          {tags.length > 0 && (
            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              {tags.map((tag) => (
                <Badge key={tag.id}>{tag.name}</Badge>
              ))}
            </div>
          )}

          {/* Bottom section */}

          <div
            className="
              mt-auto
              flex
              items-center
              justify-between
              pt-6
            "
          >
            {/* Date */}

            <p
              className="
                font-body
                text-sm
                text-ink-muted
              "
            >
              {date}
            </p>

            {/* Actions */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              {isDeleted ? (
                <>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      onRestore?.(id);
                    }}
                    className="
                      p-1
                      hover:text-accent
                    "
                    aria-label="Restore note"
                  >
                    <RotateCcw size={20} />
                  </Button>

                  <Button
                    variant="ghost"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      onDelete(id);
                    }}
                    className="
                      p-1
                      hover:text-red-500
                    "
                    aria-label="Delete permanently"
                  >
                    <Trash2 size={20} />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      onFavoriteToggle(id);
                    }}
                    className="
                      p-1
                      hover:text-accent
                    "
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    <Star
                      size={21}
                      className={isFavorite ? "fill-current text-accent" : ""}
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      onDelete(id);
                    }}
                    className="
                      p-1
                      hover:text-red-500
                    "
                    aria-label="Move to trash"
                  >
                    <Trash2 size={20} />
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default NoteCard;
