<script setup lang="ts">
onMounted(async () => {
	const savedConfig = localStorage.getItem("app:config");
	if (savedConfig) {
		const keyCombination = JSON.parse(savedConfig).quickPanelKeyCombination?.value;
		try {
			if (await checkIfKeyCombinationIsRegistered(keyCombination)) await unregisterKeyCombination(keyCombination);

			registerKeyCombination(keyCombination);
		} catch {}
	}
});
</script>

<template>
	<main>
		<v-responsive class="border">
			<v-app>
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</v-app>
		</v-responsive>
	</main>
</template>
