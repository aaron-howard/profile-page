<script lang="ts">
  export let data: { posts: Array<any> };
</script>

<div class="mx-auto max-w-5xl p-6">
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Manage Blog Posts</h1>
  </div>

  <form method="POST" action="?/create" class="mb-10 rounded border border-slate-200 bg-white p-4 shadow-sm">
    <h2 class="mb-3 text-lg font-medium">Create Post</h2>
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label for="title" class="mb-1 block text-sm">Title</label>
        <input id="title" name="title" class="w-full rounded border p-2" required />
      </div>
      <div>
        <label for="author" class="mb-1 block text-sm">Author</label>
        <input id="author" name="author" class="w-full rounded border p-2" />
      </div>
      <div>
        <label for="category" class="mb-1 block text-sm">Category</label>
        <input id="category" name="category" class="w-full rounded border p-2" />
      </div>
      <div>
        <label for="readTime" class="mb-1 block text-sm">Read Time</label>
        <input id="readTime" name="readTime" class="w-full rounded border p-2" />
      </div>
      <div class="sm:col-span-2">
        <label for="tags" class="mb-1 block text-sm">Tags (comma separated)</label>
        <input id="tags" name="tags" class="w-full rounded border p-2" />
      </div>
      <div class="sm:col-span-2">
        <label for="excerpt" class="mb-1 block text-sm">Excerpt</label>
        <textarea id="excerpt" name="excerpt" class="w-full rounded border p-2" rows="2"></textarea>
      </div>
      <div class="sm:col-span-2">
        <label for="content" class="mb-1 block text-sm">Content</label>
        <textarea id="content" name="content" class="w-full rounded border p-2" rows="6" required></textarea>
      </div>
      <div>
        <label for="featured" class="mb-1 block text-sm">Featured</label>
        <input id="featured" type="checkbox" name="featured" />
      </div>
    </div>
    <div class="mt-4">
      <button class="rounded bg-slate-900 px-4 py-2 text-white">Create</button>
    </div>
  </form>

  <div class="rounded border border-slate-200 bg-white p-4 shadow-sm">
    <h2 class="mb-3 text-lg font-medium">Existing Posts</h2>
    <div class="divide-y">
      {#each data.posts as post}
        <div class="flex items-start justify-between py-3">
          <div>
            <div class="font-medium">{post.title}</div>
            <div class="text-sm text-slate-600">{post.category} • {post.author}</div>
          </div>
          <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={post.id} />
            <button class="rounded border px-3 py-1 text-sm">Delete</button>
          </form>
        </div>
      {/each}
      {#if data.posts.length === 0}
        <div class="py-4 text-sm text-slate-600">No posts yet.</div>
      {/if}
    </div>
  </div>
</div>


