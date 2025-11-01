<script lang="ts">
	import type { Project } from '$lib/types';
	
	let { data } = $props<{ data: { projects: Project[] } }>();
  
	let editingProject = $state<Project | null>(null);
  
  function startEdit(project: Project) {
    editingProject = { ...project };
  }
  
  function cancelEdit() {
    editingProject = null;
  }
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
        <select id="pcategory" name="category" class="w-full rounded border p-2">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Full Stack</option>
        </select>
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
        <div class="py-3">
          {#if editingProject && editingProject.id === project.id}
            <!-- Edit Form -->
            <form method="POST" action="?/update" class="space-y-4">
              <input type="hidden" name="id" value={project.id} />
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="etitle" class="mb-1 block text-sm">Title</label>
                  <input id="etitle" name="title" value={editingProject.title} class="w-full rounded border p-2" required />
                </div>
                <div>
                  <label for="ecategory" class="mb-1 block text-sm">Category</label>
                  <select id="ecategory" name="category" class="w-full rounded border p-2">
                    <option value="frontend" selected={editingProject.category === 'frontend'}>Frontend</option>
                    <option value="backend" selected={editingProject.category === 'backend'}>Backend</option>
                    <option value="fullstack" selected={editingProject.category === 'fullstack'}>Full Stack</option>
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label for="edescription" class="mb-1 block text-sm">Description</label>
                  <textarea id="edescription" name="description" class="w-full rounded border p-2" rows="4" required>{editingProject.description}</textarea>
                </div>
                <div>
                  <label for="eimage" class="mb-1 block text-sm">Image URL</label>
                  <input id="eimage" name="image" value={editingProject.image || ''} class="w-full rounded border p-2" />
                </div>
                <div>
                  <label for="egithub" class="mb-1 block text-sm">GitHub URL</label>
                  <input id="egithub" name="github" value={editingProject.github || ''} class="w-full rounded border p-2" />
                </div>
                <div>
                  <label for="elive" class="mb-1 block text-sm">Live URL</label>
                  <input id="elive" name="live" value={editingProject.live || ''} class="w-full rounded border p-2" />
                </div>
                <div class="sm:col-span-2">
                  <label for="etechnologies" class="mb-1 block text-sm">Technologies (comma separated)</label>
                  <input id="etechnologies" name="technologies" value={editingProject.technologies.join(', ')} class="w-full rounded border p-2" />
                </div>
                <div>
                  <label for="efeatured" class="mb-1 block text-sm">Featured</label>
                  <input id="efeatured" type="checkbox" name="featured" checked={editingProject.featured} />
                </div>
              </div>
              <div class="flex gap-2">
                <button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white">Update</button>
                <button type="button" onclick={cancelEdit} class="rounded border px-4 py-2">Cancel</button>
              </div>
            </form>
          {:else}
            <!-- Project Display -->
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="font-medium">{project.title}</div>
                <div class="text-sm text-slate-600 capitalize">{project.category}</div>
                <div class="text-sm text-slate-500 mt-1">{project.description.slice(0, 100)}...</div>
                {#if project.featured}
                  <span class="inline-block rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 mt-1">Featured</span>
                {/if}
              </div>
              <div class="flex gap-2">
                <button onclick={() => startEdit(project)} class="rounded border px-3 py-1 text-sm hover:bg-slate-50">Edit</button>
                <form method="POST" action="?/delete" class="inline">
                  <input type="hidden" name="id" value={project.id} />
                  <button class="rounded border px-3 py-1 text-sm hover:bg-red-50 text-red-600">Delete</button>
                </form>
              </div>
            </div>
          {/if}
        </div>
      {/each}
      {#if data.projects.length === 0}
        <div class="py-4 text-sm text-slate-600">No projects yet.</div>
      {/if}
    </div>
  </div>
</div>


