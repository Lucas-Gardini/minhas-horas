<template>
	<v-layout class="rounded-md">
		<v-navigation-drawer>
			<v-list>
				<v-list-item title="Navigation drawer"></v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar title="Application bar" elevation="2">
			<template v-slot:prepend>
				<v-app-bar-nav-icon></v-app-bar-nav-icon>
			</template>
		</v-app-bar>

		<v-main class="d-flex align-center justify-center" style="min-height: 300px">
			<slot />
		</v-main>
	</v-layout>
</template>
