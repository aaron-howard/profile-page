# Svelte 5 Migration Quick Reference

## Components Requiring Migration

### 1. `src/routes/blog/+page.svelte`
**Current Issues:**
- Uses `export let data`
- Uses `$:` reactive statements (lines 50, 54)

**Migration Steps:**
```svelte
<!-- BEFORE -->
<script lang="ts">
  export let data: { posts: Array<any> };
  let selectedCategory = 'all';
  $: filteredPosts = blogPosts;
  $: featuredPosts = selectedCategory === 'all' 
    ? filteredPosts.filter((p) => p.featured)
    : filteredPosts.filter((p) => p.featured);
</script>

<!-- AFTER -->
<script lang="ts">
  import type { BlogPost } from '$lib/types';
  
  let { data } = $props<{ data: { posts: BlogPost[] } }>();
  let selectedCategory = $state('all');
  
  const filteredPosts = $derived(
    selectedCategory === 'all' 
      ? data.posts 
      : data.posts.filter((p) => p.category === selectedCategory)
  );
  
  const featuredPosts = $derived(
    filteredPosts.filter((p) => p.featured)
  );
  
  const nonFeaturedPosts = $derived(
    filteredPosts.filter((p) => !p.featured || selectedCategory !== 'all')
  );
</script>
```

### 2. `src/routes/projects/+page.svelte`
**Current Issues:**
- Uses `export let data`
- Uses `$:` reactive statements (lines 16-18)

**Migration Steps:**
```svelte
<!-- BEFORE -->
<script lang="ts">
  export let data: { projects: Array<any> };
  let selectedCategory = 'all';
  $: frontendProjects = filteredProjects.filter((p) => p.category === 'frontend');
</script>

<!-- AFTER -->
<script lang="ts">
  import type { Project } from '$lib/types';
  
  let { data } = $props<{ data: { projects: Project[] } }>();
  let selectedCategory = $state('all');
  
  const filteredProjects = $derived(
    selectedCategory === 'all' 
      ? data.projects 
      : data.projects.filter((p) => p.category === selectedCategory)
  );
  
  const frontendProjects = $derived(
    filteredProjects.filter((p) => p.category === 'frontend')
  );
  
  const backendProjects = $derived(
    filteredProjects.filter((p) => p.category === 'backend')
  );
  
  const fullstackProjects = $derived(
    filteredProjects.filter((p) => p.category === 'fullstack')
  );
</script>
```

### 3. `src/routes/admin/blogs/+page.svelte`
**Current Issues:**
- Uses `export let data`

**Migration Steps:**
```svelte
<!-- BEFORE -->
<script lang="ts">
  export let data: { posts: Array<any> };
</script>

<!-- AFTER -->
<script lang="ts">
  import type { BlogPost } from '$lib/types';
  
  let { data } = $props<{ data: { posts: BlogPost[] } }>();
</script>
```

### 4. `src/routes/admin/projects/+page.svelte`
**Current Issues:**
- Uses `export let data`

**Migration Steps:**
```svelte
<!-- BEFORE -->
<script lang="ts">
  export let data: { projects: Array<any> };
</script>

<!-- AFTER -->
<script lang="ts">
  import type { Project } from '$lib/types';
  
  let { data } = $props<{ data: { projects: Project[] } }>();
</script>
```

### 5. `src/routes/contact/+page.svelte`
**Current Issues:**
- Uses `export let data` and `export let form`

**Migration Steps:**
```svelte
<!-- BEFORE -->
<script lang="ts">
  export let data: PageData;
  export let form: ActionData;
</script>

<!-- AFTER -->
<script lang="ts">
  import type { PageData, ActionData } from './$types';
  
  let { data, form } = $props<{ 
    data: PageData;
    form: ActionData;
  }>();
</script>
```

### 6. `src/routes/login/+page.svelte`
**Current Issues:**
- Uses `export let form`

**Migration Steps:**
```svelte
<!-- BEFORE -->
<script lang="ts">
  export let form: { error?: string } | undefined;
</script>

<!-- AFTER -->
<script lang="ts">
  let { form } = $props<{ 
    form: { error?: string } | undefined 
  }>();
</script>
```

### 7. `src/routes/+page.svelte`
**Current Issues:**
- Uses `export let` pattern (needs verification)

**Note:** Check this file and migrate if needed.

## Type Definitions Needed

Create `src/lib/types.ts`:

```typescript
export interface BlogPost {
  id: number;
  title: string;
  excerpt?: string | null;
  content: string;
  author: string;
  date: Date | string;
  category: string;
  readTime?: string | null;
  featured: boolean;
  tags: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  technologies: string[];
  category: string;
  github?: string | null;
  live?: string | null;
  featured: boolean;
}
```

## Migration Checklist

- [ ] Create `src/lib/types.ts` with proper interfaces
- [ ] Migrate `blog/+page.svelte` - Replace `export let` and `$:` statements
- [ ] Migrate `projects/+page.svelte` - Replace `export let` and `$:` statements
- [ ] Migrate `admin/blogs/+page.svelte` - Replace `export let`
- [ ] Migrate `admin/projects/+page.svelte` - Replace `export let`
- [ ] Migrate `contact/+page.svelte` - Replace `export let`
- [ ] Migrate `login/+page.svelte` - Replace `export let`
- [ ] Test all pages after migration
- [ ] Verify no console warnings about deprecated patterns

## Testing After Migration

1. Verify all pages render correctly
2. Check that filtering still works (blog categories, project categories)
3. Test form submissions
4. Verify admin pages load correctly
5. Check for any console warnings

