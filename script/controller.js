const controller = {
    change = (timer, pomodoros, settings) => {
        pomodoros++;

        if (timer.type == "Task") {
            if (pomodoros > settings.pomodoros) {
                return { timerInfo: longbreak.create(settings), pomodoros: 0 }
            }
            
            return { timerInfo: shortbreak.create(settings), pomodoros }
        }

        return { timerInfo: task.create(settings), pomodoros }
    }
}