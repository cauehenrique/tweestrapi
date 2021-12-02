<script lang="ts" setup>
import type { Post, PostsResponse } from "types/posts"

const { data: postsResponse } = await useFetch<string, PostsResponse>("http://localhost:1337/api/posts")
const { data: posts } = unref(postsResponse)

const handleNewPost = (newPost: Post) => {
	posts.unshift(newPost)
}
</script>

<template>
	<div class="mx-auto max-w-4xl p-8">
		<div class="mb-6">
			<h1 class="font-bold text-3xl">Tweestrapi</h1>
			<h2 class="text-gray-500 text-lg">
				Definitely not a clone of some blue bird social media, made with Nuxt 3 + Strapi.
			</h2>
		</div>
		<Creator @newPost="handleNewPost" />
		<div class="w-full bg-gray-200 h-px my-6" v-if="posts.length > 0"></div>
		<div class="grid grid-cols-1 gap-4 grid-flow-row auto-rows-fr">
			<Post
				v-for="(post, i) in posts"
				:key="i"
				:title="post.attributes.title"
				:content="post.attributes.content"
			/>
		</div>
		<a href="//github.com/cauehenrique" target="_blank" id="github">
			<IconGitHub />
		</a>
	</div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.feather {
	@apply w-6 h-6;
}

#github {
	@apply fixed
				p-3
				bottom-4
				right-4
				bg-green-500 hover:bg-green-400 active:bg-green-600
				text-white rounded-full;
}
</style>
