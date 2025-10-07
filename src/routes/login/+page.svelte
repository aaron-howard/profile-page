<script lang="ts">
  import { enhance } from '$app/forms';
  export let form: { error?: string } | undefined;
</script>

<div class="mx-auto max-w-sm p-6">
  <h1 class="mb-4 text-2xl font-semibold">Admin Login</h1>
  {#if form?.error}
    <p class="mb-3 rounded bg-red-50 p-2 text-sm text-red-700">{form.error}</p>
  {/if}
  <form method="POST" use:enhance>
    <label class="mb-1 block text-sm font-medium" for="token">Access Token</label>
    <input
      id="token"
      name="token"
      type="password"
      class="mb-4 w-full rounded border border-slate-300 p-2"
      autocomplete="current-password"
      required
    />
    <button type="submit" class="w-full rounded bg-slate-900 p-2 text-white">Sign in</button>
  </form>
</div>


