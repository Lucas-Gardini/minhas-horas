<script setup lang="ts">
import { getCurrentWindow } from "@tauri-apps/api/window";

const route = useRoute();

onMounted(async () => {
	if (route.path === "/widget") {
		window.addEventListener("keyup", (e) => {
			if (e.key === "Escape") getCurrentWindow().close();
		});
		return;
	}

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
