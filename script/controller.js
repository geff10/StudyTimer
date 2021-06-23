const controller = {
    change: (timer, pomodoros, settings) => {
        switch (timer.type) {
            case "Task":
                pomodoros++;
                if (pomodoros >= settings.pomodoros) {
                    return { timerInfo: longbreak.create(settings), pomodoros }
                }
                return { timerInfo: shortbreak.create(settings), pomodoros }
            case "Short Break":
                return { timerInfo: task.create(settings), pomodoros }
            case "Long Break":
                return { timerInfo: task.create(settings), pomodoros: 0 }
        }
    }
}