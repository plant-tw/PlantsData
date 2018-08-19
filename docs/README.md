# Document for Identified Plant

Use in-app webview to load [https://plant-tw.github.io/PlantsData/](https://plant-tw.github.io/PlantsData/). After on-device inference, run `evaluateJavascript()` of the webview, with code below:

```
doc.show(${label_of_identified_plant});
```
That only shows name and description, with great performace that keeps up with on-device inference.

To load images, run with this:

```
doc.loadImages();
```
