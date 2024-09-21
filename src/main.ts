import { Application, Assets, Sprite } from 'pixi.js'
import './style.css'

const app = new Application();

globalThis.__PIXI_APP__ = app;

await app.init({
  backgroundColor: 'white'
});

document.body.appendChild(app.canvas);

const texture = await Assets.load('Walking_0001.png');

const person = Sprite.from(texture);

person.scale.set(4, 4);

person.anchor.set(0.5);

person.x = app.renderer.width / 2;
person.y = app.renderer.height / 2;

app.stage.addChild(person);