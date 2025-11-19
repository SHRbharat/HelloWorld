import BlogFilter from "../components/BlogFilter";
import BlogsList from "../components/BlogsList";
import blogs from "../lib/blogs";
import { useState, useMemo } from "react";

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);

  const allCategories = useMemo(
    () => [...new Set(blogs.map((blog) => blog.category))],
    []
  );

  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const matchesSearch =
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategories.includes("All") ||
          selectedCategories.includes(blog.category);

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [searchQuery, selectedCategories]);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          All Articles
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our complete collection of articles, tutorials, and insights.
        </p>
      </div>

      <BlogFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        allCategories={allCategories}
      />

      <BlogsList
        blogs={filteredBlogs}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
    </div>
  );
}
