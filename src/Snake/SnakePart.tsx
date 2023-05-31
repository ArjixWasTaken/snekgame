/* eslint-disable @typescript-eslint/no-empty-function */

export enum Direction {
    None,
    Up,
    Down,
    Left,
    Right
}


export class SnakePart {
    constructor(x: number, y: number, direction: Direction = Direction.None) {
        this.state = {
            x, y,
            direction,
        }

        if (direction === Direction.None) {
            this.state.direction = Math.floor(Math.random() * 4) + 1 as Direction
        }

        const canvas = new OffscreenCanvas(40, 40);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not create sprite context");

        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 40, 40);

        this.#sprite = canvas.transferToImageBitmap();
    }

    #sprite: ImageBitmap;

    state: {
        x: number,
        y: number,

        direction: Direction,
        child?: SnakePart
    }

    addChildren(count = 1) {
        for (let i = 0; i < count; i++) {
            if (typeof this.state.child !== "undefined") {
                this.state.child.addChildren();
            } else {
                this.state.child = new SnakePart(this.state.x, this.state.y, this.state.direction);
            }
        }
    }

    changeDirection(direction: Direction) {
        this.state.direction = direction;
    }

    tick() {
        switch (this.state.direction) {
            case Direction.Up:
                this.state.y -= 2;
                break;
            case Direction.Down:
                this.state.y += 2;
                break;
            case Direction.Left:
                this.state.x -= 2;
                break;
            case Direction.Right:
                this.state.x += 2;
                break;
        }

        if (this.state.y > 511) this.state.y = -11;
        if (this.state.y < -11) this.state.y = 500;
        if (this.state.x > 511) this.state.x = 11;
        if (this.state.x < -11) this.state.x = 500;

        this.state.child?.changeDirection(this.state.direction);
        this.state.child?.tick();
    }



    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.#sprite, this.state.x + 11, this.state.y + 11);

        this.state.child?.render(ctx);
    }
}
