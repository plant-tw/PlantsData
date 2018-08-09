# PlantsData

This repository hosts training data labeling and related program, excluding collected training data. The whole project with collected training data can be downloaded [here](https://drive.google.com/open?id=1qCvyVZPYzIwXzt5iS39ho5gaDtBdDf7N) (it's huge).

## Labeling Steps

You may create your own labeling utility programs, as long as the output `result.csv` meets the same format.

Currently, here's how we organize and label collected data:

1. Create a folder named after the collecting date. Put in images(collected by [PlantsCam-iOS](https://github.com/plant-tw/PlantsCam-iOS)) with iTunes File Sharing.
2. Run `./walk` to create `result.csv`. Afterwards, simply run `./walk -a xxxxxxxx` to add the new folder xxxxxxxx to append to `result.csv`. (You need to run `go build walk.go` before using it)
3. Label the data in `result.csv` and commit it.

Plus, run `./total` to see total kinds of plants labeled.

## Training

See the project [plant-tw/models_plant](https://github.com/plant-tw/models_plant)

## License

The program is licensed under GNU Affero General Public License v3.0. Check the [LICENSE](https://github.com/plant-tw/PlantsCam-iOS/blob/master/LICENSE) file.

The collected training data are licensed separately. Check the LICENSE file in each project folder.
