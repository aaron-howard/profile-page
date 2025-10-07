<script lang="ts">
  let { } = $props();
</script>

<div class="mx-auto max-w-4xl p-6">
  <h1 class="mb-6 text-3xl font-semibold">Admin Dashboard</h1>
  <div class="grid gap-4 sm:grid-cols-2">
    <a href="/admin/blogs" class="rounded border border-slate-200 bg-white p-4 shadow-sm hover:shadow">
      <h2 class="text-xl font-medium">Manage Blog Posts</h2>
      <p class="text-slate-600">Create, update, and delete blog posts.</p>
    </a>
    <a href="/admin/projects" class="rounded border border-slate-200 bg-white p-4 shadow-sm hover:shadow">
      <h2 class="text-xl font-medium">Manage Projects</h2>
      <p class="text-slate-600">Create, update, and delete projects.</p>
    </a>
  </div>
</div>


