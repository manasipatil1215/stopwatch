class Stopwatch {
    constructor() {
        this.startTime = 0;
        this.intervalId = null;
        this.running = false;
        this.display = document.getElementById("display");
        this.startStopButton = document.getElementById("startStop");
        this.resetButton = document.getElementById("reset");

        this.startStopButton.addEventListener("click", this.startStop.bind(this));
        this.resetButton.addEventListener("click", this.reset.bind(this));
    }

    startStop() {
        if (this.running) {
            clearInterval(this.intervalId);
            this.running = false;
            this.startStopButton.textContent = "Start";
        } else {
            const startTime = Date.now() - (this.startTime || 0);
            this.intervalId = setInterval(() => {
                this.display.textContent = this.formatTime(Date.now() - startTime);
            }, 10);
            this.startTime = startTime;
            this.running = true;
            this.startStopButton.textContent = "Stop";
        }
    }

    reset() {
        clearInterval(this.intervalId);
        this.running = false;
        this.startTime = 0;
        this.display.textContent = "00:00:00";
        this.startStopButton.textContent = "Start";
    }

    formatTime(milliseconds) {
        const pad = (num) => String(num).padStart(2, "0");
        const seconds = pad(Math.floor(milliseconds / 1000) % 60);
        const minutes = pad(Math.floor(milliseconds / 60000) % 60);
        const hours = pad(Math.floor(milliseconds / 3600000));
        return `${hours}:${minutes}:${seconds}`;
    }
}

const stopwatch = new Stopwatch();