import { AnimatedSprite, AnimatedSpriteFrames } from "pixi.js";

export class Walker extends AnimatedSprite {
    private shouldStop = false;

    constructor(frames: AnimatedSpriteFrames, autoUpdate?: boolean) {
        super(frames, autoUpdate);

        this.anchor.set(0.5);
        this.scale.set(4, 4);

        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.animationSpeed = 0.15;

        this.setupEventHandlers();
    }

    private setupEventHandlers() {
        this.onLoop = () => {
            if (this.shouldStop) {
                this.stop();
                this.shouldStop = false;
            }
        }

        this.on('mousedown', () => {
            if (this.playing) {
                this.shouldStop = true;
            } else {
                this.shouldStop = false;
                this.play();
            }
        });
    }
}