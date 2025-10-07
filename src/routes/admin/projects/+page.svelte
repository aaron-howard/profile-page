<script lang="ts">
  export let data: { projects: Array<any> };
</script>

<div class="mx-auto max-w-5xl p-6">
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Manage Projects</h1>
  </div>

  <form method="POST" action="?/create" class="mb-10 rounded border border-slate-200 bg-white p-4 shadow-sm">
    <h2 class="mb-3 text-lg font-medium">Create Project</h2>
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label for="ptitle" class="mb-1 block text-sm">Title</label>
        <input id="ptitle" name="title" class="w-full rounded border p-2" required />
      </div>
      <div>
        <label for="pcategory" class="mb-1 block text-sm">Category</label>
        <input id="pcategory" name="category" class="w-full rounded border p-2" />
      </div>
      <div class="sm:col-span-2">
        <label for="pdescription" class="mb-1 block text-sm">Description</label>
        <textarea id="pdescription" name="description" class="w-full rounded border p-2" rows="4" required></textarea>
      </div>
      <div>
        <label for="pimage" class="mb-1 block text-sm">Image URL</label>
        <input id="pimage" name="image" class="w-full rounded border p-2" />
      </div>
      <div>
        <label for="pgithub" class="mb-1 block text-sm">GitHub URL</label>
        <input id="pgithub" name="github" class="w-full rounded border p-2" />
      </div>
      <div>
        <label for="plive" class="mb-1 block text-sm">Live URL</label>
        <input id="plive" name="live" class="w-full rounded border p-2" />
      </div>
      <div class="sm:col-span-2">
        <label for="ptechnologies" class="mb-1 block text-sm">Technologies (comma separated)</label>
        <input id="ptechnologies" name="technologies" class="w-full rounded border p-2" />
      </div>
      <div>
        <label for="pfeatured" class="mb-1 block text-sm">Featured</label>
        <input id="pfeatured" type="checkbox" name="featured" />
      </div>
    </div>
    <div class="mt-4">
      <button class="rounded bg-slate-900 px-4 py-2 text-white">Create</button>
    </div>
  </form>

  <div class="rounded border border-slate-200 bg-white p-4 shadow-sm">
    <h2 class="mb-3 text-lg font-medium">Existing Projects</h2>
    <div class="divide-y">
      {#each data.projects as project}
        <div class="flex items-start justify-between py-3">
          <div>
            <div class="font-medium">{project.title}</div>
            <div class="text-sm text-slate-600">{project.category}</div>
          </div>
          <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={project.id} />
            <button class="rounded border px-3 py-1 text-sm">Delete</button>
          </form>
        </div>
      {/each}
      {#if data.projects.length === 0}
        <div class="py-4 text-sm text-slate-600">No projects yet.</div>
      {/if}
    </div>
  </div>
</div>


