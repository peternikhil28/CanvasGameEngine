/**
 * Created by Nikhil Peter on 05-11-2017.
 */

NTEngine.screenWidth = 1280;
NTEngine.screenHeight = 720;

NTEngine.init = ()=>
{
    let gameScene = new NTGameScene();
    NTEngine.screenManager.loadScene(gameScene);

    let screen = new FruitSlotMachine("res/fruitslot/", "FruitSlotMachine");
    NTEngine.screenManager.loadNewScreen(screen);



    NTEngine.listener.setNoInternetCallback(handleNoInternet)

    function handleNoInternet (request)
    {
        let screen = new NoInternetPopup("res/popups/", "NoInternetPopup", request);
        NTEngine.screenManager.addScreen(screen);
    }
};