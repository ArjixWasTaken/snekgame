/* eslint-disable @typescript-eslint/no-empty-function */
import { Direction, SnakePart } from "./SnakePart";



export class SnakeController {
    __keyDownHandler: any;
    paused = true;

    constructor(canvasCtx: CanvasRenderingContext2D, initialX: number, initialY: number) {
        this.canvasCtx = canvasCtx;

        const snake = this.snake = new SnakePart(initialX, initialY);
        this.snake.addChildren(1);

        const togglePaused = () => this.paused = !this.paused;
        const paused = () => this.paused;

        this.__keyDownHandler = (event: KeyboardEvent) => {
            if (event.key !== " " && paused()) return;
            
            switch (event.key) {
                case "ArrowUp":
                    snake.changeDirection(Direction.Up);
                    break;
                case "ArrowDown":
                    snake.changeDirection(Direction.Down);
                    break;
                case "ArrowLeft":
                    snake.changeDirection(Direction.Left);
                    break;
                case "ArrowRight":
                    snake.changeDirection(Direction.Right);
                    break;
                case " ":
                    togglePaused();
                    break;
            }
        }

        window.addEventListener("keydown", this.__keyDownHandler);
        this.paused = false;
    }

    isDisposed = false;
    dispose() {
        window.removeEventListener("keydown", this.__keyDownHandler);
        this.isDisposed = true;
    }

    canvasCtx: CanvasRenderingContext2D;
    snake: SnakePart;

    encounteredApple() {
        // TODO: Implement this.
        return false;
    }

    tick() {
        if (this.isDisposed) return true;
        if (this.paused) return;

        this.snake.tick();

        if (this.encounteredApple()) {
            this.snake.addChildren(1);
        }
    }

    render() {
        this.snake.render(this.canvasCtx);
    }
}
