import { Counter } from 'counterapi';

const WORKSPACE = import.meta.env.VITE_COUNTER_WORKSPACE;
const SITE_KEY = 'first-counter-1729'; // slug for visitor's counter

// Create client using workspace
const client = new Counter({ workspace: WORKSPACE, debug: false, timeout: 5000 });

function blogKey(id) { return `blog-${id}`; }

async function handleError(fn) {
  try {
    return await fn();
  } catch (error) {
    console.error('CounterAPI error : ', error?.message || error, { status: error?.status, code: error?.code });
    return { value: 0, error };
  }
}

export async function hitVisitor() {
  return handleError(async () => {
    const res = await client.up(SITE_KEY);
    return { value: res?.data?.up_count ?? 0, data: res?.data };
  });
}

export async function getVisitor() {
  return handleError(async () => {
    const res = await client.get(SITE_KEY);
    return { value: res?.data?.up_count ?? 0, data: res?.data };
  });
}

export async function hitBlogView(blogId) {
  if (!blogId) return { value: 0 };
  return handleError(async () => {
    const res = await client.up(blogKey(blogId));
    return { value: res?.data?.up_count ?? 0, data: res?.data };
  });
}

export async function getBlogViews(blogId) {
  if (!blogId) return { value: 0 };
  return handleError(async () => {
    const res = await client.get(blogKey(blogId));
    return { value: res?.data?.up_count ?? 0, data: res?.data };
  });
}

export default { hitVisitor, getVisitor, hitBlogView, getBlogViews };
