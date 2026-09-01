import {
  ChevronLeft,
  ChevronRight,
  ListTodo,
  Plus,
  Star,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

import Button from "../atoms/Button";
import Brand from "../molecules/Brand";
import CategoryNavItem from "../molecules/CategoryNavItem";
import NavItem from "../molecules/NavItem";

import { getTags, type TagWithCount } from "../../services/tagService";

const INITIAL_TAG_COUNT = 5;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [tags, setTags] = useState<TagWithCount[]>([]);

  const [isLoadingTags, setIsLoadingTags] = useState(true);

  const [tagPage, setTagPage] = useState(0);

  useEffect(() => {
    const loadTags = async () => {
      try {
        setIsLoadingTags(true);

        const response = await getTags();

        const sortedTags = [...response].sort(
          (a, b) => b.note_count - a.note_count,
        );

        setTags(sortedTags);
      } catch (error) {
        console.error("Failed to load tags:", error);
      } finally {
        setIsLoadingTags(false);
      }
    };

    loadTags();
  }, []);

  const startIndex = tagPage * INITIAL_TAG_COUNT;

  const visibleTags = tags.slice(startIndex, startIndex + INITIAL_TAG_COUNT);

  const hasMoreTags = startIndex + INITIAL_TAG_COUNT < tags.length;
  
  return (
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
        py-8
        transition-[width,padding]
        duration-300
        ease-in-out
        ${collapsed ? "w-[88px] px-4" : "w-[300px] px-5"}
      `}
    >
      {/* Collapse Button */}

      <Button
        variant="secondary"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="
          absolute
          top-1/2
          -right-[18px]
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
          <ChevronRight size={17} strokeWidth={1.8} />
        ) : (
          <ChevronLeft size={17} strokeWidth={1.8} />
        )}
      </Button>

      {/* Brand */}

      <Brand collapsed={collapsed} />

      {/* New Note */}

      <div
        className={`
          mt-10
          shrink-0
          ${collapsed ? "" : "px-1"}
        `}
      >
        <Button
          variant="primary"
          className="
            h-12
            w-full
            gap-2
            rounded-2xl
            font-body
            text-[15px]
          "
        >
          <Plus size={20} strokeWidth={1.8} />

          {!collapsed && <span>New Note</span>}
        </Button>
      </div>

      {/* Navigation */}

      <nav
        className="
          mt-6
          shrink-0
          space-y-1
        "
      >
        <NavItem
          to="/home"
          end
          collapsed={collapsed}
          icon={<ListTodo size={19} strokeWidth={1.7} />}
        >
          All Notes
        </NavItem>

        <NavItem
          to="/home/favorites"
          collapsed={collapsed}
          icon={<Star size={19} strokeWidth={1.7} />}
        >
          Favorites
        </NavItem>

        <NavItem
          to="/home/trash"
          collapsed={collapsed}
          icon={<Trash2 size={19} strokeWidth={1.7} />}
        >
          Trash
        </NavItem>
      </nav>

      {/* Categories */}

      <section
        className="
          mt-10
          min-h-0
          flex-1
          overflow-hidden
        "
      >
        {!collapsed && (
          <p
            className="
              px-3
              font-body
              text-[11px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-gold-light
            "
          >
            Categories
          </p>
        )}

        <div
          className={`
            space-y-1
            ${collapsed ? "mt-2" : "mt-5"}
          `}
        >
          {isLoadingTags && !collapsed && (
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

          {!isLoadingTags &&
            visibleTags.map((tag) => (
              <CategoryNavItem
                key={tag.id}
                name={tag.name}
                count={tag.note_count}
                path={`/home/category/${tag.id}`}
                collapsed={collapsed}
              />
            ))}

          {!isLoadingTags && tags.length === 0 && !collapsed && (
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

{/* View More */}

{!collapsed &&
  tags.length >
    INITIAL_TAG_COUNT && (
    <div className="mt-4 px-1">
      <Button
        variant="ghost"
        onClick={() => {
          if (hasMoreTags) {
            setTagPage(
              (current) => current + 1,
            )
          } else {
            setTagPage(0)
          }
        }}
        className="
          h-9
          w-full
          text-sm
          text-gold-light
          hover:!bg-leather-light
        "
      >
        {hasMoreTags
          ? "View more"
          : "Back to top"}
      </Button>
    </div>
  )}
      </section>
    </aside>
  );
};

export default Sidebar;
