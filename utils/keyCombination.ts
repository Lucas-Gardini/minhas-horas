import { getAllWindows } from "@tauri-apps/api/window";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { register, isRegistered, unregister } from "@tauri-apps/plugin-global-shortcut";

export async function checkIfKeyCombinationIsRegistered(keyCombination: string) {
	return await isRegistered(keyCombination);
}

export async function registerKeyCombination(keyCombination: string) {
	return await register(keyCombination, async () => {
		const windows = await getAllWindows();
		const widgetWindow = windows.find((window) => window.label === "widget");

		if (widgetWindow) {
			await widgetWindow.setFocus();
			return;
		}

		// Create a new widget window
		const newWindow = new WebviewWindow("widget", {
			url: window.location.origin + "/widget",
			width: 800,
			minWidth: 800,
			height: 200,
			minHeight: 200,
			x: 0,
			y: 0,
			resizable: false,
			decorations: true,
			focus: true,
			alwaysOnTop: true,
			closable: false,
			hiddenTitle: true,
			title: "widget",
			maximizable: false,
			skipTaskbar: true,
			titleBarStyle: "transparent",
		});

		newWindow.once("tauri://created", () => {
			console.log("Widget window created successfully!");
			newWindow.setFocus();
			newWindow.setDecorations(false);
		});

		newWindow.once("tauri://error", (e) => {
			console.error("Error creating widget window:", e);
		});
	});
}

export async function unregisterKeyCombination(keyCombination: string) {
	return await unregister(keyCombination);
}
