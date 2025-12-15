import { Counter } from 'counterapi';

console.log(import.meta.env);
const WORKSPACE = import.meta.env.VITE_COUNTER_WORKSPACE;

console.log("[counterApi] Using workspace:", WORKSPACE);
const SITE_KEY = 'first-counter-1729'; // slug for total visitor's counter

// Create client using workspace
const client = new Counter({ workspace: WORKSPACE, debug: false, timeout: 5000 });

// For blog views: view-1 (up: blog-1, down: blog-2), view-2 (up: blog-3, down: blog-4), etc.
function pairedViewKey(blogId) {
  const pair = Math.ceil(blogId / 2);
  console.log(
    "[pairedViewKey]",
    {
      blogId,
      pair,
      viewKey: `view-${pair}`,
    }
  );
  return `view-${pair}`;
}

// For upvote/downvote: blog-1, blog-2, ...
function blogVoteKey(blogId) {
  console.log(
    "[blogVoteKey]",
    {
      blogId,
      blogID : `blog-${blogId}`,
    }
  );
  return `blog-${blogId}`;
}

// Site visitors count
export async function hitVisitor() {
  try {
    console.log("[hitVisitor] called", { key: SITE_KEY });

    const res = await client.up(SITE_KEY);

    console.log("[hitVisitor] response", {
      up_count: res?.data?.up_count,
      raw: res?.data,
    });

    return res?.data?.up_count ?? 0;
  } catch (error) {
    console.error(
      'CounterAPI error : ',
      error?.message || error,
      { status: error?.status, code: error?.code }
    );
    return 0;
  }
}

export async function getVisitor() {
  try {
    console.log("[getVisitor] called", { key: SITE_KEY });

    const res = await client.get(SITE_KEY);

    console.log("[getVisitor] response", {
      up_count: res?.data?.up_count,
      raw: res?.data,
    });

    return res?.data?.up_count ?? 0;
  } catch (error) {
    console.error(
      'CounterAPI error : ',
      error?.message || error,
      { status: error?.status, code: error?.code }
    );
    return 0;
  }
}


// Paired blog view: up for odd blogId, down for even blogId
export async function hitBlogView(blogId) {
  if (!blogId) {
    console.log("[hitBlogView] invalid blogId", blogId);
    return 0;
  }

  const key = pairedViewKey(blogId);
  const direction = blogId % 2 === 1 ? "up" : "down";

  try {
    console.log("[hitBlogView] called", { blogId, key, direction });

    const res = await client[direction](key);
    const count = Number(res?.data?.[`${direction}_count`]) || 0;

    console.log("[hitBlogView] response", {
      blogId,
      key,
      direction,
      count,
    });

    return count;
  } catch (error) {
    console.error(
      "[hitBlogView] error",
      error?.message || error,
      { status: error?.status, code: error?.code }
    );
    return 0;
  }
}

export async function getBlogViews(blogId) {
  if (!blogId) {
    console.log("[getBlogViews] invalid blogId", blogId);
    return 0;
  }

  const key = pairedViewKey(blogId);
  const direction = blogId % 2 === 1 ? "up" : "down";

  try {
    console.log("[getBlogViews] called", { blogId, key, direction });

    const res = await client.get(key);
    const count = Number(res?.data?.[`${direction}_count`]) || 0;

    console.log("[getBlogViews] response", {
      blogId,
      key,
      direction,
      count,
    });

    return count;
  } catch (error) {
    console.error(
      "[getBlogViews] error",
      error?.message || error,
      { status: error?.status, code: error?.code }
    );
    return 0;
  }
}


// Upvote/downvote for each blog
export async function hitBlogVote(blogId, type) {
  if (!blogId || !['up', 'down'].includes(type)) return { value: 0 };
  const key = blogVoteKey(blogId);

  try {
    const res = await client[type](key);
    return { value: res?.data?.[type + '_count'] ?? 0, data: res?.data };
  } catch (error) {
    console.error(
      'CounterAPI error : ',
      error?.message || error,
      { status: error?.status, code: error?.code }
    );
    return 0;
  }
}

export async function getBlogVotes(blogId) {
  if (!blogId) return { up: 0, down: 0 };
  const key = blogVoteKey(blogId);

  try {
    const res = await client.get(key);
    return {
      up: res?.data?.up_count ?? 0,
      down: res?.data?.down_count ?? 0,
    };
  } catch (error) {
    console.error(
      'CounterAPI error : ',
      error?.message || error,
      { status: error?.status, code: error?.code }
    );
    return { up: 0, down: 0};
  }
}

export default {
  hitVisitor,
  getVisitor,
  hitBlogView,
  getBlogViews,
  hitBlogVote,
  getBlogVotes
};
