<script setup lang="ts">
const theme = useColorMode();

onMounted(() => {
	if (theme.value !== "light" && theme.value !== "dark") theme.value = "light";
});
</script>

<template>
	<main>
		<v-responsive class="border">
			<v-app :theme="theme">
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</v-app>
		</v-responsive>
	</main>
</template>
