const timer = {
    create = (time) => {
        remain = new TimerFormat().textToMilliseconds(time);
        end = new Date().getTime() + remain;
        playing = false;
    },

    play = () => {
        playing = true;
		end = new Date().getTime() + remain;
    },

    pause = () => {
        playing = false;
    },

    update = () => {
        if (playing) {
			const now = new Date().getTime();

			if (now <= end) {
				remain = end - now;
			} else {
				remain = 0;
			}
		}

		return remain;
    }
}

const task = {
    create = (settings) => {
        timer.create(settings.task);

        return {
            type: "Task",
            badge: {
                color: "#737373"
            },
            notification: {
                message: "Your break is over. Back to work!",
                image: "../icons/studyIcon.png"
            },
            timer: timer
        }
    }
}

const shortbreak = {
    create = (settings) => {
        timer.create(settings.shortbreak);

        return {
            type: "Short Break",
            badge: {
                color: "#006504"
            },
            notification: {
                message: "It's time to take a break.",
                image: "../icons/breakIcon.png"
            },
            timer: timer
        }
    }
}

const longbreak = {
    create = (settings) => {
        timer.create(settings.longbreak);

        return {
            type: "Long Break",
            badge: {
                color: "#0060df"
            },
            notification: {
                message: "You completed the pomodoro cycle! Enjoy your longer break.",
                image: "../icons/breakIcon.png"
            },
            timer: timer
        }
    }
}