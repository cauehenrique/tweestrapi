<script lang="ts" setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
})
</script>

<template>
	<div class="border border-gray-300 shadow-sm p-4 rounded relative">
		<h1 class="font-bold text-lg">{{ title }}</h1>
		<p>{{ content }}</p>
	</div>
</template>
