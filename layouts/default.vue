<script setup lang="ts">
const theme = useTheme();
const viewport = useViewport();
const appConfig = useAppConfig();

const hours = useHoursStore();

function toggleTheme() {
	theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
	<!-- <v-layout class="rounded-md overflow-y-auto h-full"> -->
	<div>
		<v-app-bar elevation="2">
			<template #prepend>
				<v-btn icon @click="$router.push('/')" class="mr-2">
					<v-icon>mdi-clock</v-icon>
				</v-btn>

				<v-dialog max-width="500">
					<template v-slot:activator="{ props: activatorProps }">
						<v-btn
							prepend-icon="mdi-calendar"
							v-bind="activatorProps"
							text="Alterar Data"
							class="text-none text-subtitle-1"
							color="secondary"
							size="small"
							variant="flat"
						></v-btn>
					</template>

					<template v-slot:default="{ isActive }">
						<v-card title="Alterar Data">
							<v-card-text>
								<v-text-field
									v-model="hours.selectedDate"
									:rules="[(value: string) => !value || !isNaN(Date.parse(value)) || 'Deve ser uma data e hora válida.']"
									type="date"
									variant="outlined"
								/>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>

								<v-btn text="Cancelar" color="error" @click="isActive.value = false"></v-btn>
								<v-btn text="Ok" color="primary" @click="isActive.value = false"></v-btn>
							</v-card-actions>
						</v-card>
					</template>
				</v-dialog>
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
			<v-container class="pa-4" fluid>
				<v-row justify="center">
					<v-col cols="12" md="8" lg="6">
						<slot />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</div>
	<!-- </v-layout> -->
</template>
