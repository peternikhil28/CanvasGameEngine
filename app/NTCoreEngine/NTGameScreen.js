/**
 * Created by Nikhil Peter on 04-11-2017.
 */

class NTGameScreen extends NTContainer
{
    constructor(assetPath, layoutName)
    {
        super();

        this._assetPath = assetPath;
        this._layoutName = layoutName;
    }

    loadContent()
    {
        this.loadLayout();
    }

    loadLayout()
    {
        NTUtils.loadJSON(this._assetPath + this._layoutName + '_Layout.json', this.onLayoutLoaded.bind(this));
    }

    onLayoutLoaded(inData)
    {
        let data = JSON.parse(inData);
        let objectDataList = data["objects"];

        for(let index=0; index<objectDataList.length; index++)
        {
            let objectData = objectDataList[index];

            let displayObject;

            switch (objectData.type)
            {
                case "Sprite":
                    displayObject = NTUtils.createSprite(this._assetPath, objectData);
                    break;

                case "Button":
                    displayObject = NTUtils.createButton(this._assetPath, objectData);
                    displayObject.addTouchListener(this.onButtonClicked.bind(this));
                    break;
                default:
                    displayObject = this.createCustomObject(objectData);
                    break;
            }

            if(displayObject!=null)
            {
                this.addChild(displayObject);
                this.onObjectCreated(displayObject, objectData);
            }
        }

        this.onLayoutComplete();
    }

    createCustomObject(objectData)
    {
    
    }

    onObjectCreated(object, objectData)
    {
    
    }

    onLayoutComplete()
    {
        NTEngine.screenManager.reveal(this);
    }

    onReveal()
    {
    
    }

    onButtonClicked(target)
    {
        
    }
}
