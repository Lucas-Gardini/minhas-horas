<script setup lang="ts">
const theme = useTheme();
const viewport = useViewport();
const appConfig = useAppConfig();

function toggleTheme() {
	theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
	<v-layout class="rounded-md">
		<v-app-bar class="sticky top-0" elevation="2">
			<template #prepend>
				<v-btn icon @click="$router.push('/')">
					<v-icon>mdi-clock</v-icon>
				</v-btn>
			</template>
			<template #append>
				<v-btn icon @click="toggleTheme">
					<v-icon>{{ theme.global.name.value === "dark" ? "mdi-white-balance-sunny" : "mdi-moon-waning-crescent" }}</v-icon>
				</v-btn>

				<v-btn icon @click="$router.push('config')">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
			</template>
		</v-app-bar>

		<v-main class="flex-1 items-center justify-center px-5 mt-5" style="min-height: 300px">
			<slot />
		</v-main>
	</v-layout>
</template>
