import { Search, Filter, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function BlogFilter({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  allCategories,
}) {
  const [tempSelectedCategories, setTempSelectedCategories] = useState(["All"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popoverRef = useRef(null);

  const handleCategoryChange = (category) => {
    setTempSelectedCategories((prev) => {
      if (category === "All") return ["All"];
      const newCategories = prev.includes("All") ? [] : [...prev];
      if (newCategories.includes(category)) {
        const filtered = newCategories.filter((c) => c !== category);
        return filtered.length === 0 ? ["All"] : filtered;
      } else {
        return [...newCategories, category];
      }
    });
  };

  const applyFilters = () => {
    setSelectedCategories(tempSelectedCategories);
    setIsFilterOpen(false);
  };

  const handleOpenChange = () => {
    setIsFilterOpen(!isFilterOpen);
    if (!isFilterOpen) setTempSelectedCategories(selectedCategories);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <>
      {/* Search + Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 items-center bg-card p-4 rounded-xl border border-border shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={handleOpenChange}
          className="h-11 px-4 gap-2 flex items-center rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-all relative"
        >
          <Filter size={20} />
          <span className="hidden sm:inline">Filter</span>
          {!selectedCategories.includes("All") && (
            <span className="ml-1 h-5 px-1.5 rounded bg-cyan-500/10 text-cyan-600 text-xs flex items-center">
              {selectedCategories.length}
            </span>
          )}
        </button>

        {/* Popover Dropdown */}
        {isFilterOpen && (
          <div
            ref={popoverRef}
            className="absolute right-0 mt-48 w-64 p-0 border border-border rounded-lg shadow-lg bg-popover z-50"
          >
            <div className="p-4 border-b border-border">
              <h4 className="font-medium leading-none">Filter by Category</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Select topics to display
              </p>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto space-y-3 popover-scroll">
              {/* All Categories */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempSelectedCategories.includes("All")}
                  onChange={() => handleCategoryChange("All")}
                  className="accent-cyan-600 w-4 h-4 rounded border border-border"
                />
                <span className="text-sm font-medium">All Categories</span>
              </label>

              {/* Individual Categories */}
              {allCategories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tempSelectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="accent-cyan-600 w-4 h-4 rounded border border-border"
                  />
                  <span className="text-sm font-medium">{category}</span>
                </label>
              ))}
            </div>
            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={applyFilters}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Badges */}
      {!selectedCategories.includes("All") && (
        <div className="flex flex-wrap gap-2 mb-8">
          {selectedCategories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 gap-1 flex items-center rounded-full bg-cyan-500/10 text-cyan-700 hover:bg-cyan-500/20 border border-cyan-200 text-sm"
            >
              {category}
              <button
                onClick={() => {
                  const newCats = selectedCategories.filter(
                    (c) => c !== category
                  );
                  setSelectedCategories(
                    newCats.length === 0 ? ["All"] : newCats
                  );
                }}
                className="ml-1 hover:text-cyan-900"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <button
            onClick={() => setSelectedCategories(["All"])}
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 px-2"
          >
            Clear all
          </button>
        </div>
      )}
    </>
  );
}
