const controller = {
    change: (timer, pomodoros, settings) => {
        switch (timer.type) {
            case "Task":
                pomodoros++;
                if (pomodoros >= settings.pomodoros) {
                    return { newTimer: longbreak.create(settings), pomodoros }
                }
                return { newTimer: shortbreak.create(settings), pomodoros }
            case "Short Break":
                return { newTimer: task.create(settings), pomodoros }
            case "Long Break":
                return { newTimer: task.create(settings), pomodoros: 0 }
        }
    }
}