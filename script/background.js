state.timerInfo = task.create(settings);
badge.update({ color: state.timerInfo.badge.color });

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
			let newTimer = controller.change(state.timerInfo, state.pomodoros, settings.get());
			state.pomodoros = newTimer.pomodoros;
			state.timerInfo = newTimer.timerInfo;
			state.timerInfo.timer.play();

			notification.show({ title: state.timerInfo.type, ...state.timerInfo.notification });
			badge.update({ color: state.timerInfo.badge.color });
		}

		if (value > 0) {
			badge.update({ text: TimerFormat.millisecondsToMinutes(value) });
		}
	}

	const update = () => {
		const x = state.timerInfo;

		if (x.timer.playing) {
			dueTimeVerifier(x.update());
		}

		sendMessageToPopup({
			playing: x.timer.playing,
			completedPomodoros: state.pomodoros,
			type: x.type,
			time: TimerFormat.millisecondsToText(x.timer.remain)
		});
	}

	connection.onMessage.addListener((message) => {
		if (!message.action) return;

		const x = state.timerInfo;

		switch (message.action) {
			case "play":
				x.timer.play();
				break;
			case "pause":
				x.timer.pause();
				break;
			case "reset":
				state.timerInfo = task.create(settings);
				badge.update({ color: state.timerInfo.badge.color });
				break;
			case "init":
				x.timer.play();
				break;
		}
	});
})