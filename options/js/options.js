const connection = chrome.runtime.connect({
	name: "background-settings"
});

const minutesInputs = Array.from(document.getElementsByClassName("minutes"));
const secondsInputs = Array.from(document.getElementsByClassName("seconds"));
const pomodorosInput = document.getElementById("numberPomodoros");

const studyClockLine = document.getElementById("study");
const shortBreakClockLine = document.getElementById("shortBreak");
const longBreakClockLine = document.getElementById("longBreak");

const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");

const sendMessageToBackground = (message) => {

	connection.postMessage({
		"action": message
	});

}

const addValidationListeners = () => {

	document.addEventListener("keypress", (keyEvent) => {

		const keyPressed = new Key(keyEvent.key);

		const isValid = !keyPressed.isNumber() && !keyPressed.isSpecial() && !keyPressed.isDirectional();

		isValid && keyEvent.preventDefault();

	});

	[...minutesInputs, ...secondsInputs].map(input => {

		input.addEventListener("focusout", function () {

			const minutesInput = this.parentElement.getElementsByClassName("minutes")[0];
			const secondsInput = this.parentElement.getElementsByClassName("seconds")[0];

			InterfaceService.preventBothClocksBeingZero(minutesInput, secondsInput);

		});

	});

	minutesInputs.map(input => {

		input.addEventListener("focusout", () => input.value = new MinutesInput(input.value).format());

	});

	secondsInputs.map(input => {

		input.addEventListener("focusout", () => input.value = new SecondsInput(input.value).format());

	});

	pomodorosInput.addEventListener("focusout", () => pomodorosInput.value = new PomodorosInput(pomodorosInput.value).format());

	saveButton.addEventListener("click", () => {

		const values = {
			task: TimerFormat.minutesAndSecondsToText(studyClockLine.getElementsByClassName("minutes")[0].value, studyClockLine.getElementsByClassName("seconds")[0].value),
			shortbreak: TimerFormat.minutesAndSecondsToText(shortBreakClockLine.getElementsByClassName("minutes")[0].value, shortBreakClockLine.getElementsByClassName("seconds")[0].value),
			longbreak: TimerFormat.minutesAndSecondsToText(longBreakClockLine.getElementsByClassName("minutes")[0].value, longBreakClockLine.getElementsByClassName("seconds")[0].value),
			pomodoros: pomodorosInput.value,
			soundEnabled: document.getElementById("sound").checked
		}

		settings.set(values);

		updateInputsWithSettingsContent();

		sendMessageToBackground("reset");

	});

	resetButton.addEventListener("click", () => {

		settings.set({ pomodoros: 4, task: "25:00", shortbreak: "05:00", longbreak: "30:00", soundEnabled: true });

		updateInputsWithSettingsContent();

		sendMessageToBackground("reset");

	});

}

const updateInputsWithSettingsContent = () => {

	const values = settings.get();

	InterfaceService.updateClockLine(studyClockLine, values.task);
	InterfaceService.updateClockLine(shortBreakClockLine, values.shortbreak);
	InterfaceService.updateClockLine(longBreakClockLine, values.longbreak);
	InterfaceService.updatePomodorosValue(values.pomodoros);
	InterfaceService.updateNotificationSoundOption(values.soundEnabled);

}

window.onload = () => {

	updateInputsWithSettingsContent();
	addValidationListeners();

};