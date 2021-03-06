///./scripts/_references.ts
class WonderCraft {
    "use strict";

    static STAGE_WIDTH = 1400;
    static STAGE_HEIGHT = 760;

    static WORLD_WIDTH = 1400;
    static WORLD_HEIGHT = 760;


    game: Phaser.Game;
    teamA: Wonder.Team;
    teamB: Wonder.Team;

    constructor() {
        //always use canvas to get better performance
        this.game = new Phaser.Game(WonderCraft.STAGE_WIDTH, WonderCraft.STAGE_HEIGHT, Phaser.CANVAS, "body", { preload: this.preload, create: this.create, update: this.update, render: this.render });
    }

    preload = (game: Phaser.Game) => {
        game.load.spritesheet("heroes", "assets/heroes.png", 35, 51);
        game.load.json("teamA", "assets/data/TestTeamA.json");
        game.load.json("teamB", "assets/data/TestTeamB.json");
        game.load.atlasJSONHash("units", "assets/Units.png", "assets/Units.json");
    }

    create = (game: Phaser.Game) => {
        //this.game.camera.bounds = null;
        //this.game.camera.roundPx = true;
        //this.game.camera.setSize(WonderCraft.STAGE_WIDTH, WonderCraft.STAGE_HEIGHT);
        //game.camera.focusOnXY(WonderCraft.WORLD_WIDTH / 2 + (WonderCraft.WORLD_HEIGHT / 2 * 0.35), WonderCraft.WORLD_HEIGHT / 2);

        game.time.advancedTiming = true;

        var seed = new Wonder.Random("TheSecretLifeOfWalterMitty");

        this.teamA = Wonder.buildTeam(game, game.cache.getJSON("teamA"));
        this.teamA.side = Wonder.TEAM_SIDE_LEFT;

        Wonder.initTeam(game, this.teamA);

        this.teamB = Wonder.buildTeam(game, game.cache.getJSON("teamB"));
        this.teamB.side = Wonder.TEAM_SIDE_RIGHT;

        Wonder.initTeam(game, this.teamB);

        //make enemy, and for WAR!!!
        this.teamA.enemy = this.teamB;
        this.teamB.enemy = this.teamA;

        //game.camera.follow(this.teamA.squads[2].hero.display)

        //this.teamA = Wonder.buildTestTeam(seed, "red");
        //this.teamB = Wonder.buildTestTeam(seed, "blue");
        //make enemy, and for WAR!!!
        //this.teamA.enemy = this.teamB;
        //this.teamB.enemy = this.teamA;

        //this.teamA.side = Wonder.TEAM_SIDE_LEFT;
        //this.teamB.side = Wonder.TEAM_SIDE_RIGHT;


        //Wonder.initDebugDraw(game, this.teamA);
        //Wonder.initDebugDraw(game, this.teamB);
    }

    //wait 2 seconds to start
    count = 0;
    update = (game: Phaser.Game) => {
        if (this.count > 120) {
            this.teamA.update();
            this.teamB.update();
        }
        this.count++;
    }

    render = (game: Phaser.Game) => {
        this.teamA.render();
        this.teamB.render();
        if (this.count % 5 === 0) game.world.sort("y", Phaser.Group.SORT_ASCENDING);
        game.debug.text(game.time.fps.toString(), 2, 14, "#00FF00");
        //game.camera.scale.setTo(0.75);
    }
}

window.onload = function() {
    new WonderCraft();
};
