<script setup lang="ts">
const config = ref({
	quickPanelKeyCombination: {
		value: "",
		error: "",
		validation: (value: string) => {
			if (typeof value === "string" && value.match(/^(ctrl|shift|alt|meta)\+([a-z0-9])$/i) !== null) return true;
			return "Combinação de teclas inválida";
		},
	},
});

async function saveConfig() {
	if (config.value.quickPanelKeyCombination.error) return;

	if (config.value.quickPanelKeyCombination.value) {
		if (await checkIfKeyCombinationIsRegistered(config.value.quickPanelKeyCombination.value))
			await unregisterKeyCombination(config.value.quickPanelKeyCombination.value);

		await registerKeyCombination(config.value.quickPanelKeyCombination.value);
	}

	localStorage.setItem("app:config", JSON.stringify(config.value));
}

const loadingConfig = ref(true);
onMounted(() => {
	const savedConfig = localStorage.getItem("app:config");
	if (savedConfig) Object.assign(config.value, JSON.parse(savedConfig));

	loadingConfig.value = false;
});
</script>

<template>
	<v-form @submit.prevent="saveConfig">
		<div id="quick-panel">
			<v-label> Combinação de teclas do painel rápido </v-label>
			<key-combination-input
				v-if="!loadingConfig"
				:initialValue="config.quickPanelKeyCombination.value"
				@success="({ metaKeys, normalKeys }) => (config.quickPanelKeyCombination.value = metaKeys.concat(normalKeys).join('+'))"
			></key-combination-input>
		</div>

		<v-btn class="mt-5 w-[200px]" type="submit" color="primary" block>Salvar Configurações</v-btn>
	</v-form>
</template>
