import { Application, Sprite, Texture } from 'pixi.js';
import './style.css';
import { WalkerFactory } from './walker/walker-factory';
import { Walker } from './walker/walker';

const app = new Application();

const bg = new Sprite(Texture.WHITE);

const selectedWalkers: Array<Walker> = [];

globalThis.__PIXI_APP__ = app;

await app.init({
    resizeTo: document.body,
});

bg.width = app.screen.width;
bg.height = app.screen.height;
bg.tint = 'green';
bg.eventMode = 'static';

bg.on('pointerup', (e) => {
    selectedWalkers.forEach((w) => {
        w.moveTo(e.global);
    });
});

app.stage.addChild(bg);

const walkerFactory = WalkerFactory.instance(selectedWalkers);

const walkers = await Promise.all(
    Array.from({ length: 5 }, () => walkerFactory.createWalker())
);

walkers.forEach((w, i) => {
    w.x = app.screen.width / 2;
    w.y = app.screen.height * ((2 * i + 1) / 10);
    app.stage.addChild(w);
});

document.body.appendChild(app.canvas);
