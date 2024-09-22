import {
    AnimatedSprite,
    AnimatedSpriteFrames,
    Graphics,
    Point,
    Ticker,
} from 'pixi.js';

export class Walker extends AnimatedSprite {
    isSelected = false;

    private shouldStop = false;

    private rect: Graphics | undefined;

    private moveTarget: Point | undefined;

    private ticker = Ticker.shared;

    constructor(frames: AnimatedSpriteFrames, autoUpdate?: boolean) {
        super(frames, autoUpdate);

        this.anchor.set(0.5);
        this.scale.set(4, 4);

        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.animationSpeed = 0.15;

        this.rect = new Graphics()
            .rect(
                -(this.width / 2),
                -(this.height / 2),
                this.width,
                this.height
            )
            .stroke('white');

        this.rect.scale.set(0.25, 0.25);

        this.setupEventHandlers();
    }

    moveTo(point: Point) {
        this.moveTarget = new Point(point.x, point.y);
        this.ticker.remove(this.move);
        this.ticker.add(this.move);
    }

    setSelected(value: boolean) {
        this.isSelected = value;

        if (this.rect === undefined) {
            return;
        }

        if (value) {
            this.addChild(this.rect);
        } else {
            this.removeChild(this.rect);
        }
    }

    private move = () => {
        if (this.moveTarget === undefined) {
            return;
        }

        this.play();

        const vectorX = this.moveTarget.x - this.x;
        const vectorY = this.moveTarget.y - this.y;

        const directionX = Math.sign(vectorX);
        const directionY = Math.sign(vectorY);

        let angleX = this.angle;
        let angleY = this.angle;

        switch (directionX) {
            case 1:
                angleX = 90;
                break;
            case -1:
                angleX = 270;
                break;
            default:
                break;
        }

        switch (directionY) {
            case 1:
                angleY = 180;
                break;
            case -1:
                angleY = 0;
                break;
            default:
                break;
        }

        this.angle = (angleX + angleY) / 2;

        this.x = this.x + directionX * Math.min(Math.abs(vectorX), 1);
        this.y = this.y + directionY * Math.min(Math.abs(vectorY), 1);

        if (directionX === 0 && directionY === 0) {
            this.moveTarget = undefined;
            this.ticker.remove(this.move);
            this.shouldStop = true;
        }
    };

    private setupEventHandlers() {
        this.onLoop = () => {
            if (this.shouldStop) {
                this.stop();
                this.shouldStop = false;
            }
        };
    }
}
