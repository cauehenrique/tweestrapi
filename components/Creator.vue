<script lang="ts" setup>
import type { Post } from "types/posts"

const emit = defineEmits(["newPost"])

const title = ref("")
const content = ref("")
const loadingSubmit = ref(false)

const buttonDisabled = computed(() => title.value === "" || content.value === "" || loadingSubmit.value)

const handleSubmit = async () => {
	loadingSubmit.value = true

	const newPost = await createNewPost()
	emit("newPost", newPost)

	title.value = ""
	content.value = ""

	loadingSubmit.value = false
}

const createNewPost = async () => {
	if (title.value === "" || content.value === "") return

	const { data } = await fetch("http://localhost:1337/api/posts", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			data: { title: title.value, content: content.value },
		}),
	}).then((res) => res.json())

	return data as Post
}
</script>

<template>
	<form class="flex flex-col space-y-2" @submit.prevent="handleSubmit">
		<input
			type="text"
			placeholder="You should put some title here!"
			class="border border-gray-400 focus:ring-2 ring-green-200 outline-none p-2 rounded"
			v-model="title"
		/>
		<textarea
			type="text"
			rows="3"
			placeholder="What are you thinking about?"
			maxlength="250"
			class="border border-gray-400 focus:ring-2 ring-green-200 outline-none p-2 rounded resize-none"
			v-model="content"
		></textarea>
		<button type="submit" :disabled="buttonDisabled">
			<span v-if="!loadingSubmit">Tweest</span>
			<IconSpinner v-else />
		</button>
	</form>
</template>

<style scoped>
button {
	@apply bg-green-500 active:bg-green-600
				text-white
				px-3 py-2
				rounded
				font-semibold
				flex
				items-center
				justify-center
				cursor-pointer disabled:cursor-not-allowed
				disabled:opacity-50;
}
</style>
