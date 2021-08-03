const settings = {
    get: () => {
        const storage = window.localStorage;

        const values = {
            pomodoros: storage.getItem("pomodoros"),
            task: storage.getItem("studytime"),
            shortbreak: storage.getItem("shortbreak"),
            longbreak: storage.getItem("longbreak"),
            soundEnabled: storage.getItem("soundEnabled")
        }

        return values.pomodoros ? values : { pomodoros: 4, task: "25:00", shortbreak: "05:00", longbreak: "30:00", soundEnabled: true };
    },

    set: (values) => {
        const storage = window.localStorage;

        storage.setItem("pomodoros", values.pomodoros);
        storage.setItem("studytime", values.task);
        storage.setItem("shortbreak", values.shortbreak);
        storage.setItem("longbreak", values.longbreak);
        storage.setItem("soundEnabled", values.soundEnabled);
    }
}