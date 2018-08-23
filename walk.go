package main

import (
	"encoding/csv"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
)

var appendParam = flag.String("a", "./", "append data in the directory path")

func main() {
	flag.Usage = func() {
		fmt.Fprintf(os.Stderr, "usage: %s [flags] directory_path\n", os.Args[0])
		flag.PrintDefaults()
	}
	flag.Parse()
	// Preparing output csv and writer
	file, err := os.OpenFile("result.csv", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		fmt.Println("Error: ", err)
		return
		file, err = os.Create("result.csv")
		if err != nil {
			log.Fatal(err)
			return
		}
	}

	defer file.Close()
	writer := csv.NewWriter(file)
	defer writer.Flush()

	// Preparing dir from command-line flag
	rootDir := filepath.Clean(*appendParam)

	// Preparing data from directory names
	var data [][]string
	err = filepath.Walk(rootDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			fmt.Printf("prevent panic by handling failure accessing a path %q: %v\n", rootDir, err)
			return err
		}
		// predefined directory hierarchy
		// We only add subdirectories, excluding rootDir
		if info.IsDir() && !strings.Contains(rootDir, info.Name()) {
			element := []string{path, ""}
			data = append(data, element)
		}
		return nil
	})
	if err != nil {
		fmt.Printf("error walking the path %q: %v\n", rootDir, err)
		return
	}

	// Writing data into csv file
	for _, value := range data {
		err := writer.Write(value)
		if err != nil {
			log.Fatal(err)
		}
	}
}
