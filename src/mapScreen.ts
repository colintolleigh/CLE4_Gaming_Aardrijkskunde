import * as PIXI from 'pixi.js'
import MapOfNL from './images/MapOfNL.png'

 class Map {
    //canvas
   private pixiWidth = 600
   private pixiHeight = 650

    //globals
    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    doomClock:number = 1250 

    
    constructor(){
        this.pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight });
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader.add('mapTexture', MapOfNL);
        this.loader.load(()=>this.loadCompleted());

    }
   private loadCompleted(){
        let map = new PIXI.Sprite(this.loader.resources["mapTexture"].texture!);
        map.height = this.pixiHeight;
        map.width = this.pixiWidth;
        this.pixi.stage.addChild(map);

        this.pixi.ticker.add((delta)=>this.update(delta));

    }

    update(delta:number){
        this.doomClock-=delta
        let secondsLeft = Math.floor(this.doomClock / 60)
        if(this.doomClock <= 0) {
            console.log("De tijd is op!")
        } else {
            console.log(`Nog ${secondsLeft} seconden over!`)
        }
    }
}

new Map();
