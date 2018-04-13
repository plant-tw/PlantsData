package main

import (
	"encoding/csv"
	"io/ioutil"
	"log"
	"os"
)

func main() {
	// Preparing files
	files, err := ioutil.ReadDir("./")
	if err != nil {
		log.Fatal(err)
	}

	// Preparing output csv and writer
	file, err := os.Create("result.csv")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	writer := csv.NewWriter(file)
	defer writer.Flush()

	// Preparing data from filenames
	var data [][]string
	for _, f := range files {
		if f.Name() == "ls.go" || f.Name() == ".DS_Store" {
			continue
		}
		element := []string{f.Name(), ""}
		data = append(data, element)
	}

	// Writing data into csv file
	for _, value := range data {
		err := writer.Write(value)
		if err != nil {
			log.Fatal(err)
		}
	}
}
