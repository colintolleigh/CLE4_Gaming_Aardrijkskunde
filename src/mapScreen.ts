import * as PIXI from 'pixi.js'
import MapOfNL from './images/MapOfNL.png'

 class Map {
    //canvas
//    private pixiWidth = 600
//    private pixiHeight = 650


    //globals
    private pixi : PIXI.Application;
    private loader : PIXI.Loader;
    private mapOfNL : PIXI.Sprite;

    doomClock:number = 1250 
     map: any;

    
    constructor(){
        this.pixi = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x1099bb });
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader.add('mapTexture', MapOfNL);
        this.loader.load(()=>this.loadCompleted());

    }
   private loadCompleted(){
        this.map = new PIXI.Sprite(this.loader.resources["mapTexture"].texture!);
        // map.height = this.pixiHeight;
        // map.width = this.pixiWidth;
        this.map.x = 470
        this.map.y = 68
        this.map.scale.set(0.5)
        this.pixi.stage.addChild(this.map);

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
