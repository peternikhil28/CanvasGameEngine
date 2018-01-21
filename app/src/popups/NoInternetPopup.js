/**
 * Created by Nikhil Peter on 08-11-2017.
 */

class NoInternetPopup extends NTNoInternetScreen
{
    constructor(assetPath, layoutName, request)
    {
        super(assetPath, layoutName);

        this._request = request;
    }

    createCustomObject(objectData)
    {
        super.createCustomObject(objectData);

        switch (objectData.type)
        {
            case "Label":
                let fontSize = 30;
                let label = new NTLabel("Arial", fontSize, objectData.w, objectData.h);
                label.position.set(objectData.x, objectData.y);
                return label;
                break;
        }
    }

    onObjectCreated(object, objectData)
    {
        super.onObjectCreated(object, objectData);

        switch (objectData.name)
        {
            case "NoInternet":
                object.setLabel("No Internet. Trying to reconnect.");
                break;
        }
    }
}