const timer = {
    remain: '',
    end: '',
    playing: '',
    
    create: function(time) {
        this.remain = TimerFormat.textToMilliseconds(time) + 999; // Add one second to avoid "flickering" on start
        this.end = new Date().getTime() + this.remain;
        this.playing = false;
    },

    play: function() {
        this.playing = true;
		this.end = new Date().getTime() + this.remain;
    },

    pause: function() {
        this.playing = false;
    },

    update: function() {
        if (this.playing) {
			const now = new Date().getTime();

			if (now <= this.end) {
				this.remain = this.end - now;
			} else {
				this.remain = 0;
			}
		}

		return this.remain;
    }
}

const task = {
    create: (settings) => {
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
    create: (settings) => {
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
    create: (settings) => {
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