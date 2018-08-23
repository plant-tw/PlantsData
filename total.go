package main

import (
	"encoding/csv"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
)

type Class struct {
	Img string
	Txt string
}

var outputParam = flag.String("o", "", "output document as a json file")

func main() {
	flag.Usage = func() {
		fmt.Fprintf(os.Stderr, "usage: %s [flags] file_path\n", os.Args[0])
		flag.PrintDefaults()
	}
	flag.Parse()
	// Preparing csv and reader
	file, err := os.Open("result.csv")
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

	r := csv.NewReader(file)

	var s []string
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}
		var existed = false
		for _, a := range s {
			if a == record[1] {
				existed = true
				continue
			}
		}
		if !existed {
			s = append(s, record[1])
		}
	}
	fmt.Printf("There are %d class(es):\n", len(s))
	fmt.Println(s, "\n")

	// Save to json file if outputParam assigned
	save(s, *outputParam)
}

func save(classes []string, docFile string) {
	if docFile == "" {
		return
	}
	var m map[string]Class
	raw, err := ioutil.ReadFile(docFile)
	if err != nil {
		log.Println(err)
		fmt.Println("will create a new file...")
		m = make(map[string]Class)
	}
	json.Unmarshal(raw, &m)
	for _, class := range classes {
		_, ok := m[class]
		if !ok {
			classValue := Class{}
			m[class] = classValue
		}
	}
	jsonData, err := json.MarshalIndent(m, "", "    ")
	if err != nil {
		log.Println(err)
		return
	}
	err = ioutil.WriteFile(docFile, jsonData, 0644)
	if err != nil {
		log.Println(err)
		return
	}
	fmt.Printf("%q is saved, with %d class(es).\n", docFile, len(m))
}
