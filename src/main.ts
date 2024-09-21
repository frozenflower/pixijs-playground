import { Application } from 'pixi.js'
import './style.css'
import { WalkerFactory } from './walker/walker-factory';

const app = new Application();

globalThis.__PIXI_APP__ = app;

await app.init({
  backgroundColor: 'green',
  resizeTo: document.body
});

const walkerFactory = new WalkerFactory();

const walkers = await Promise.all(Array.from({length: 5}, () => walkerFactory.createWalker()));

walkers.forEach((w, i) => {
  w.x = app.screen.width / 2;
  w.y = app.screen.height * ((2 * i + 1) / 10);
  app.stage.addChild(w);
})

document.body.appendChild(app.canvas);
