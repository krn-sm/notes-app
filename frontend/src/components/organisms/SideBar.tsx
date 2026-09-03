import {
  ChevronLeft,
  ChevronRight,
  ListTodo,
  Plus,
  Star,
  Tag,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

import Button from "../atoms/Button";
import Brand from "../molecules/Brand";
import CategoryNavItem from "../molecules/CategoryNavItem";
import NavItem from "../molecules/NavItem";

import TagsDrawer from "./TagsDrawer";

import { useTags } from "../../contexts/TagContext";

const MAX_VISIBLE_TAGS = 5;

type SidebarProps = {
  onNewNote: () => void;
};

const Sidebar = ({ onNewNote }: SidebarProps) => {
  const [isTagsDrawerOpen, setIsTagsDrawerOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  const { tags, setTags, isLoading } = useTags();

  /*
   * Detect mobile screen size.
   */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
   * On mobile, sidebar is ALWAYS collapsed.
   *
   * On tablet and desktop,
   * user can control collapsed state.
   */

  const isCollapsed = isMobile || collapsed;

  const sortedTags = [...tags].sort((a, b) => b.note_count - a.note_count);

  const visibleTags = sortedTags.slice(0, MAX_VISIBLE_TAGS);

  const handleOpenTagsDrawer = () => {
    setIsTagsDrawerOpen(true);
  };

  return (
    <>
      <aside
        className={`
          relative
          z-30
          flex
          h-screen
          shrink-0
          flex-col
          overflow-visible
          border-r
          border-dashed
          border-[#4a3626]
          bg-leather
          py-5
          transition-[width,padding]
          duration-300
          ease-in-out

          ${
            isCollapsed
              ? "w-16 px-2 sm:w-[88px] sm:px-4"
              : "w-[260px] px-4 sm:w-[300px] sm:px-5"
          }
        `}
      >
        {/* Collapse Button — Tablet/Desktop only */}

        {!isMobile && (
          <Button
            variant="secondary"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="
              absolute
              top-1/2
              -right-[16px]
              z-50
              h-9
              w-9
              -translate-y-1/2
              !rounded-xl
              !p-0
              border-[2px]
              border-solid
              border-leather
              shadow-[0_3px_10px_rgba(0,0,0,0.35)]
            "
          >
            {collapsed ? (
              <ChevronRight size={16} strokeWidth={1.8} />
            ) : (
              <ChevronLeft size={17} strokeWidth={1.8} />
            )}
          </Button>
        )}

        {/* Brand */}

        <Brand collapsed={isCollapsed} />

        {/* New Note */}

        <div
          className={`
            mt-7
            shrink-0
            sm:mt-10

            ${isCollapsed ? "" : "px-1"}
          `}
        >
          <Button
            variant="primary"
            onClick={onNewNote}
            className="
              h-11
              w-full
              gap-2
              rounded-2xl
              font-body
              text-[15px]
              sm:h-12
            "
          >
            <Plus size={20} strokeWidth={1.8} />

            {!isCollapsed && <span>New Note</span>}
          </Button>
        </div>

        {/* Navigation */}

        <nav
          className="
            mt-5
            shrink-0
            space-y-1
            sm:mt-6
          "
        >
          <NavItem
            to="/home"
            end
            collapsed={isCollapsed}
            icon={<ListTodo size={19} strokeWidth={1.7} />}
          >
            All Notes
          </NavItem>

          <NavItem
            to="/home/favorites"
            collapsed={isCollapsed}
            icon={<Star size={19} strokeWidth={1.7} />}
          >
            Favorites
          </NavItem>

          <NavItem
            to="/home/trash"
            collapsed={isCollapsed}
            icon={<Trash2 size={19} strokeWidth={1.7} />}
          >
            Trash
          </NavItem>
        </nav>

        {/* Tags */}

        <section
          className="
            mt-7
            min-h-0
            flex-1
            overflow-hidden
            sm:mt-10
          "
        >
          {isCollapsed ? (
            <Button
              variant="ghost"
              onClick={handleOpenTagsDrawer}
              aria-label="Open tags"
              className="
                h-10
                w-full
                !p-0
                text-paper/80
                hover:!bg-[#3b2b22]
                hover:text-paper
                sm:h-11
              "
            >
              <Tag size={19} strokeWidth={1.7} />
            </Button>
          ) : (
            <>
              {/* Tags Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-3
                "
              >
                <p
                  className="
                    font-body
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.16em]
                    text-gold-light
                  "
                >
                  Tags
                </p>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleOpenTagsDrawer}
                  className="
                    font-body
                    text-xs
                    text-gold-light/70
                    transition-colors
                    hover:text-gold-light
                  "
                >
                  More...
                </Button>
              </div>

              {/* Tag List */}

              <div
                className="
                  mt-5
                  space-y-1
                "
              >
                {isLoading && (
                  <p
                    className="
                      px-3
                      text-sm
                      text-gold-light/60
                    "
                  >
                    Loading...
                  </p>
                )}

                {!isLoading &&
                  visibleTags.map((tag) => (
                    <CategoryNavItem
                      key={tag.id}
                      name={tag.name}
                      count={tag.note_count}
                      path={`/home/category/${tag.id}`}
                    />
                  ))}

                {!isLoading && tags.length === 0 && (
                  <p
                    className="
                        px-3
                        text-sm
                        text-gold-light/60
                      "
                  >
                    No tags yet.
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      </aside>

      {/* Tags Drawer */}

      <TagsDrawer
        isOpen={isTagsDrawerOpen}
        onClose={() => setIsTagsDrawerOpen(false)}
        tags={tags}
        onTagsChange={setTags}
      />
    </>
  );
};

export default Sidebar;
