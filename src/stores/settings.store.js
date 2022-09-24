export const SettingsStore = {
    timeAmount: 60,
    time: 60,
    cardsAmount: 8,
    difficulty: Number(localStorage.difficulty) ? Number(localStorage.difficulty) : 1,
    getTimeAmount() {
        return Number(this.timeAmount)
    },
    getTime() {
        return Number(this.time)
    },
    getCardsAmount() {
        return Number(this.cardsAmount)
    },
    getDifficulty() {
        return Number(this.difficulty)
    },
    setDifficulty(difficulty) {
        this.difficulty = difficulty
        localStorage.difficulty = difficulty
        this.setDefault()
    },
    setTimeAmount() {
        this.timeAmount = this.difficulty === 1 ? 60
            : this.difficulty === 2 ? 90
                : this.difficulty === 3 ? 120
                    : 150
        this.time = this.timeAmount
    },
    setCardsAmount() {
        this.cardsAmount = this.difficulty === 1 ? 8
            : this.difficulty === 2 ? 16
                : this.difficulty === 3 ? 24
                    : 36
    },
    setDefault() {
        this.setTimeAmount()
        this.setCardsAmount()
    }
}

SettingsStore.setDefault()
