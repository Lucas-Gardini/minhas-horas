<script setup lang="ts">
const props = defineProps<{
	initialValue: string;
}>();
const emit = defineEmits(["success"]);

const metaKeys = ["ctrl", "shift", "alt"];
const normalKeys = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

const modelValueMetaKeys = ref<string[]>([]);
const modelValueNormalKeys = ref<string>("");

watch([modelValueMetaKeys, modelValueNormalKeys], () => {
	if (modelValueMetaKeys.value.length + modelValueNormalKeys.value?.length === 0) return;
	emit("success", { metaKeys: [...modelValueMetaKeys.value], normalKeys: [modelValueNormalKeys.value] });
});

const form = ref<HTMLFormElement | null>(null);

onMounted(() => {
	if (props.initialValue) {
		modelValueMetaKeys.value = props.initialValue.split("+").filter((key) => metaKeys.includes(key));
		modelValueNormalKeys.value = props.initialValue.split("+").filter((key) => !metaKeys.includes(key))?.[0];
	}
});
</script>

<template>
	<v-form ref="form" @submit.prevent class="grid grid-rows-2a grid-cols-12 gap-2" #default="{ errors }">
		<v-combobox
			v-model="modelValueMetaKeys"
			class="sm:col-span-5"
			:items="metaKeys"
			variant="outlined"
			multiple
			:rules="[(v) => v?.length > 0 || 'Selecione ao menos uma tecla']"
			hide-details
		></v-combobox>
		<v-combobox
			v-model="modelValueNormalKeys"
			class="sm:col-span-7"
			:items="normalKeys"
			variant="outlined"
			:rules="[(v) => v?.length > 0 || 'Selecione ao menos uma tecla']"
			hide-details
		></v-combobox>
	</v-form>
</template>
