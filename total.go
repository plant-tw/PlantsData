package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
)

func main() {
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
	fmt.Printf("There's %d kinds of plants:\n", len(s))
	fmt.Println(s)
}
