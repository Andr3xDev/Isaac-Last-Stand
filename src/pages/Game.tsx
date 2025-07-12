import React, { useEffect, useRef } from "react";
import * as Phaser from "phaser";

interface GameComponentProps {
    customWidth?: number;
    customHeight?: number;
}

const GameComponent: React.FC<GameComponentProps> = ({
    customWidth,
    customHeight,
}) => {
    const gameRef = useRef<Phaser.Game | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const gameWidth = customWidth || Math.floor(window.innerWidth);
        const gameHeight = customHeight || Math.floor(window.innerHeight);

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: gameWidth,
            height: gameHeight,
            parent: containerRef.current!,
            backgroundColor: "#202020",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 0, x: 0 },
                    debug: false,
                },
            },
            scene: GameScene,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
        };

        gameRef.current = new Phaser.Game(config);

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, [customWidth, customHeight]);

    return (
        <div className="w-screen h-screen flex flex-col p-4 justify-center items-center gap-3">
            <div ref={containerRef} className="w-full h-10/12" />
            <div className="h-1/7 bg-[#202020] rounded-lg mt-4 p-6 text-white font-sans shadow-lg">
                <div className="flex gap-8 text-sm">
                    <span className="flex items-center gap-1">Life: ❤️❤️</span>
                    <span className="flex items-center gap-1">Keys: 🔑 0</span>
                    <span className="flex items-center gap-1">Kills: X</span>
                    <span className="flex items-center gap-1">Bombs: 💣 0</span>
                </div>
            </div>
        </div>
    );
};

class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasdKeys!: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
    };
    private readonly PLAYER_SPEED = 450;

    constructor() {
        super({ key: "GameScene" });
    }

    preload(): void {
        // General textures
        this.createSimpleTextures();
    }

    create(): void {
        // map
        this.createRoom();

        // players
        this.createPlayer();

        // controls
        this.setupControls();
    }

    update(): void {
        this.handlePlayerMovement();
    }

    private createSimpleTextures(): void {
        // Background
        this.load.image("background", "/src/assets/maps/map.png");

        // Character
        this.load.image("playerSprite", "/src/assets/pj/pj.png");
    }

    private createRoom(): void {
        const bg = this.add.image(0, 0, "background");
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    }

    private createPlayer(): void {
        const startX = this.cameras.main.width / 2;
        const startY = this.cameras.main.height / 2;

        this.player = this.physics.add.sprite(startX, startY, "playerSprite");
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.2);

        // Limits
        const tileSize = 32;
        this.physics.world.setBounds(
            tileSize,
            tileSize,
            this.cameras.main.width - tileSize * 6,
            this.cameras.main.height - tileSize * 5
        );
    }

    private setupControls(): void {
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Main movement
        this.wasdKeys = this.input.keyboard!.addKeys("W,S,A,D") as {
            W: Phaser.Input.Keyboard.Key;
            A: Phaser.Input.Keyboard.Key;
            S: Phaser.Input.Keyboard.Key;
            D: Phaser.Input.Keyboard.Key;
        };
    }

    private handlePlayerMovement(): void {
        let velocityX = 0;
        let velocityY = 0;

        // Horizontal move
        if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
            velocityX = -this.PLAYER_SPEED;
        } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
            velocityX = this.PLAYER_SPEED;
        }

        // Vertical move
        if (this.cursors.up.isDown || this.wasdKeys.W.isDown) {
            velocityY = -this.PLAYER_SPEED;
        } else if (this.cursors.down.isDown || this.wasdKeys.S.isDown) {
            velocityY = this.PLAYER_SPEED;
        }

        // Diagonal move
        const length = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

        if (length > 0) {
            velocityX = (velocityX / length) * this.PLAYER_SPEED;
            velocityY = (velocityY / length) * this.PLAYER_SPEED;
        }

        this.player.setVelocity(velocityX, velocityY);
    }
}

export default GameComponent;
