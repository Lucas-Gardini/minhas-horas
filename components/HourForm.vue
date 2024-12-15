<script setup lang="ts">
import { DateTime } from "luxon";
import { ref } from "vue";

const form = ref({
	title: "",
	startedAt: DateTime.now(),
	endedAt: undefined,
	description: undefined,
	category: undefined,
	taskId: undefined,
} as IHour);

const isValid = ref(false);

const categories = ["Categoria A", "Categoria B", "Categoria C"];

const rules = {
	required: (value: string) => !!value || "Campo obrigatório.",
	isDateTime: (value: string) => {
		return !value || !isNaN(Date.parse(value)) || "Deve ser uma data e hora válida.";
	},
	maxLength: (max: number) => (value: string) => !value || value.length <= max || `Máximo de ${max} caracteres.`,
};

const resetForm = () => {
	form.value = {
		title: "",
		startedAt: DateTime.now(),
		endedAt: undefined,
		description: undefined,
		category: undefined,
		taskId: undefined,
	};
};

const submitForm = () => {
	if (isValid.value) {
		console.log("Formulário enviado:", form.value);
		// Aqui você pode lidar com o envio do formulário
	}
};
</script>

<template>
	<v-container class="pa-4" fluid>
		<v-row justify="center">
			<v-col cols="12" md="8" lg="6">
				<v-card>
					<v-card-title> Registro de Horas </v-card-title>
					<v-card-text>
						<v-form ref="form" v-model="isValid" lazy-validation class="flex flex-column gap-3">
							<!-- Título -->
							<v-text-field
								v-model="form.title"
								label="Título"
								:rules="[rules.required, rules.maxLength(50)]"
								variant="outlined"
								required
							/>

							<!-- Campos de data lado a lado -->
							<v-row>
								<v-col cols="12" sm="6">
									<v-text-field
										v-model="form.startedAt"
										label="Início"
										:rules="[rules.required, rules.isDateTime]"
										type="datetime-local"
										variant="outlined"
										required
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field
										v-model="form.endedAt"
										label="Fim (opcional)"
										:rules="[rules.isDateTime]"
										type="datetime-local"
										variant="outlined"
									/>
								</v-col>
							</v-row>

							<!-- Descrição -->
							<v-textarea
								v-model="form.description"
								label="Descrição"
								:rules="[rules.required, rules.maxLength(255)]"
								variant="outlined"
								rows="3"
								required
							/>

							<!-- Categoria -->
							<v-select v-model="form.category" :items="categories" label="Categoria (opcional)" variant="outlined" />

							<!-- ID da Tarefa -->
							<v-text-field v-model="form.taskId" label="ID da Tarefa (opcional)" variant="outlined" />
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-btn color="primary" :disabled="!isValid" @click="submitForm"> Salvar </v-btn>
						<v-btn link @click="resetForm"> Limpar </v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
/* Estilização adicional opcional */
</style>
