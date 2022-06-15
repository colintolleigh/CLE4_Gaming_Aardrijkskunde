import * as PIXI from 'pixi.js'
import { Assets } from './assets'
import { JumpCat } from './jumpcat'

export class Game {

    
    // fields
    private jumpcat: JumpCat
    private _pixi: PIXI.Application

    // Properties
    public get pixi(): PIXI.Application { return this._pixi }

    constructor() {

        // this._pixi = new PIXI.Application({ width: 1440, height: 900, backgroundColor: 0x1099bb })
        this._pixi = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x1099bb })
        document.body.appendChild(this._pixi.view)

        new Assets(this)

        // this._pixi.loader
        //     .add("spritesheet", "spritesheet.json")
    }

    public loadCompleted() {
        let frames = this.createCatFrames()
        this.jumpcat = new JumpCat(this, frames, 100, 100)

        this._pixi.ticker.add((delta: number) => this.update(delta))
    }

    private update(delta: number) {
        this.jumpcat.update(delta)
    }

    private createCatFrames(): PIXI.Texture[] {
        // create an array of textures from an image path
        let frames: PIXI.Texture[] = [];

        for (let i = 1; i <= 38; i++) {
            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.from(`poes_${i}.png`));
        }
        return frames
    }
}

