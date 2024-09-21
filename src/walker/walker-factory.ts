import { Assets, Texture } from 'pixi.js';
import { Walker } from './walker';

export class WalkerFactory {
    private textures: Record<string, Texture> | undefined;

    constructor() {}

    async createWalker() {
        if (!this.textures) {
            const files = Array.from({ length: 8 }, (_, i) => i + 1).map(
                (x) => `Walking/Walking_000${x}.png`
            );

            this.textures = await Assets.load(files);
        }

        const walker = new Walker(Object.values(this.textures));

        return walker;
    }
}
