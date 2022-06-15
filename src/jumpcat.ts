import * as PIXI from 'pixi.js'
import { Game } from './game'

export class JumpCat extends PIXI.AnimatedSprite {

    private readonly gravity: number = 0.0981
    private readonly bounce: number = 0.985

    private game: Game
    private speedX: number = 1
    private speedY: number = 5

    constructor(game: Game, textures, x: number, y: number) {
        super(textures)
        this.game = game

        /*
         * An AnimatedSprite inherits all the properties of a PIXI sprite
         * so you can change its position, its anchor, mask it, etc
         */

        this.x = x
        this.y = y
        this.scale.set(0.7)
        this.animationSpeed = 0.4;
        // this.loop = false
        this.play();

        this.game.pixi.stage.addChild(this);
        // this.onComplete = () => this.destroy()

    }

    public update(delta: number): void {
        super.update(delta)


        this.fall(delta)
        this.keepInScreen()
    }

    private fall(delta): void {
        this.x += this.speedX * delta
        this.y += this.speedY * delta
        this.speedY += this.gravity
    }

    private keepInScreen() {
        if (this.getBounds().left < 0) {
            this.speedX *= -1
            this.x = this.game.pixi.screen.left
        }
        if (this.getBounds().right > this.game.pixi.screen.right) {
            this.speedX *= -1
            this.x = this.game.pixi.screen.right - this.width
        }
        if (this.getBounds().bottom > this.game.pixi.screen.bottom) {
            this.bounceUpFrom(this.game.pixi.screen.bottom - this.height)
        }
    }

    private bounceUpFrom(height: number): void {
        // place on top of height (screen or object)
        this.y = height
        // keep the object bouncing without loss
        this.speedY *= -this.bounce
    }
}