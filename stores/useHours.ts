import { DateTime } from "luxon";

export interface IHour {
	title: string;
	startedAt: DateTime;
	endedAt?: DateTime;
	description?: string;
	category?: string;
	taskId?: string;
}

export const useHoursStore = defineStore(
	"hours",
	() => {
		const totalHours = ref<IHour[]>([]);
		const todayHours = ref<IHour[]>([]);

		return { totalHours, todayHours };
	},
	{ persist: true }
);
