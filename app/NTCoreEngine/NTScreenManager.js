/**
 * Created by Nikhil Peter on 04-11-2017.
 */

class NTScreenManager
{
    constructor()
    {
        this._gameScene = null;

        this._screens = [];
    }

    loadScene(gameScene)
    {
        this._gameScene = gameScene;
    }

    loadNewScreen(screen)
    {
        screen.userData.loadNewScreen = true;

        screen.loadContent();
    }
    
    addScreen(screen)
    {
        screen.loadContent();
    }

    add(screen)
    {
        this._screens.push(screen);

        this._gameScene.addChild(screen);
    }

    remove(screen)
    {
        screen.unload();
        this._gameScene.removeChild(screen);

        this._screens.splice(this._screens.indexOf(screen), 1);
        screen = null;
    }

    removeAllScreen()
    {
        while (this._screens.length > 0)
            this.remove(this._screens[0]);
    }

    reveal(screen)
    {
        if(screen.userData.loadNewScreen)
            this.removeAllScreen();

        screen.onReveal();
        this.add(screen);
    }
}