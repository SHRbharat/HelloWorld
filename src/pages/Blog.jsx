import SuggestedBlogs from "./../components/SuggestedBlogs";
import BlogPostContent from "./../components/BlogPostContent";
import CommentsSection from "./../components/CommentsSection";

const post = {
  title: "The Future of React: Server Components and Beyond",
  date: "October 15, 2023",
  author: "Shivam Ray",
  readTime: "5 min read",
  tags: ["React", "Web Development", "Next.js"],
  coverImage: "/react-development-concept.png",
  content: `
      ## Introduction
      React Server Components (RSC) represent a paradigm shift in how we build React applications. By moving component rendering to the server, we can significantly reduce the amount of JavaScript sent to the client.

      ## What are Server Components?
      Server Components allow developers to write UI that can be rendered on the server. Unlike Server-Side Rendering (SSR), which returns HTML that must be hydrated, RSCs stream a special data format that React uses to update the DOM without losing client state.

      ### Key Benefits
      1. **Zero Bundle Size**: Dependencies used in Server Components aren't included in the client bundle.
      2. **Direct Backend Access**: Access your database or filesystem directly from your components.
      3. **Automatic Code Splitting**: Client components imported by Server Components are automatically code-split.

      ## How it Works
      When a request comes in, the server renders the component tree. It serializes the result into a JSON-like format.

      ### The Protocol
      The wire format is optimized for streaming and can be processed by React on the client as it arrives.

      ## Conclusion
      Server Components are not just a performance optimization; they are a new way to think about building user interfaces.
    `,
};

export default function Blog() {
  return (
    <>
      <main className="flex-grow pt-8 pb-16">
        <BlogPostContent post={post} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <CommentsSection />
              <SuggestedBlogs />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
