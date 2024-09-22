import { Assets, Texture } from 'pixi.js';
import { Walker } from './walker';

export class WalkerFactory {
    static instance(selectedWalkers: Array<Walker>) {
        if (this.instance_ === undefined) {
            this.instance_ = new WalkerFactory(selectedWalkers);
        }

        return this.instance_;
    }

    private static instance_: WalkerFactory | undefined;

    private textures: Record<string, Texture> | undefined;

    private constructor(private selectedWalkers: Array<Walker>) {}

    async createWalker() {
        if (!this.textures) {
            const files = Array.from({ length: 8 }, (_, i) => i + 1).map(
                (x) => `Walking/Walking_000${x}.png`
            );

            this.textures = await Assets.load(files);
        }

        const walker = new Walker(Object.values(this.textures));

        walker.on('pointerup', (e) => {
            const presentAt = this.selectedWalkers.indexOf(walker);
            if (presentAt >= 0) {
                this.selectedWalkers.splice(presentAt, 1);
                walker.setSelected(false);
            } else {
                this.selectedWalkers.push(walker);
                walker.setSelected(true);
            }
        });

        return walker;
    }
}
