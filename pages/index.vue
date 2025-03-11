<script setup lang="ts">
const hours = useHoursStore();

const welcomeMessage = computed(() => {
	const currentHour = new Date().getHours();
	if (currentHour < 12) return "Bom dia";
	if (currentHour < 18) return "Boa tarde";
	return "Boa noite";
});
</script>

<template>
	<div>
		<v-card>
			<v-card-title>
				<header class="flex flex-row items-center justify-between w-full">
					<h1>{{ welcomeMessage }}, usuário!</h1>

					<v-dialog scrollable width="auto" fullscreen>
						<template v-slot:activator="{ props: activatorProps }">
							<v-btn v-bind="activatorProps" class="text-none text-subtitle-1" color="primary" size="small" variant="flat">
								Novo Lançamento
							</v-btn>
						</template>

						<template v-slot:default="{ isActive }">
							<hour-form />
						</template>
					</v-dialog>
				</header>
			</v-card-title>
			<v-card-text>
				<v-timeline side="end">
					<v-timeline-item v-for="(hour, i) in hours.todayHours" :key="i" :dot-color="'#ff0032'" size="small">
						<v-alert :value="true">
							{{ hour }}
						</v-alert>
					</v-timeline-item>
				</v-timeline>
			</v-card-text>
		</v-card>
	</div>
</template>
