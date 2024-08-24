<script lang="ts">
	import { onMount } from 'svelte';

	let data: unknown = null;
	let loading = true;
	let error: null = null;

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/api/forum');
			if (!response.ok) {
				throw new Error('API request failed');
			}
			data = await response.json();
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	});
</script>

<h1>Data from API</h1>

{#if loading}
	<p>Loading...</p>
{:else if error}
	<p>Error: {error}</p>
{:else}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{/if}
