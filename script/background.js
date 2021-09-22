// To Do: Fix sound alert config
const settingsData = settings.get();
let currentTimer, pomodoros;

const init = () => {
	currentTimer = task.create(settingsData);
	pomodoros = 0;
	badge.update({ color: currentTimer.badge.color });
}

init();

chrome.runtime.onConnect.addListener((connection) => {
	const sendMessageToPopup = (message) => {
		try {
			connection.postMessage({
				"timer": message
			});
		} catch (error) {}
	}

	const dueTimeVerifier = (value) => {
		if (value <= 0) {
			let values = controller.change(currentTimer, pomodoros, settingsData);
			pomodoros = values.pomodoros;
			currentTimer = values.newTimer;

			currentTimer.timer.play();
			notification.show(currentTimer.type, currentTimer.notification.message, currentTimer.notification.image, settingsData.soundEnabled);
			badge.update({ color: currentTimer.badge.color });
		}

		if (value > 0) {
			badge.update({ text: `${TimerFormat.millisecondsToMinutes(value - 999)}` });  // Remove the extra second
		}
	}

	const update = () => {
		const x = currentTimer;

		if (x.timer.playing) {
			dueTimeVerifier(x.timer.update());
		}

		sendMessageToPopup({
			playing: x.timer.playing,
			completedPomodoros: pomodoros,
			type: x.type,
			time: TimerFormat.millisecondsToText(x.timer.remain)
		});
	}

	connection.onMessage.addListener((message) => {
		if (!message.action) return;

		const x = currentTimer;

		switch (message.action) {
			case "play":
				x.timer.play();
				break;
			case "pause":
				x.timer.pause();
				break;
			case "reset":
				init();
				break;
			case "init":
				update();
				setInterval(() => { update() }, 200);
				break;
		}
	});
});