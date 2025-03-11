import { DateTime } from "luxon";
import mockedHours from "@/assets/json/mocked-hours.json";
export interface IHour {
	title: string;
	startedAt: DateTime | string | null;
	endedAt?: DateTime | string | null;
	description?: string | null;
	category?: string | null;
	taskId?: string | null;
}

export const useHoursStore = defineStore(
	"hours",
	() => {
		const selectedDate = ref<Date | null>(new Date());
		const todayHours = ref<IHour[]>(mockedHours);

		return { selectedDate, todayHours };
	},
	{ persist: true }
);
