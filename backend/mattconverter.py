with open("drugreadable.txt", "r") as input_file, open("mattdoesdrugs.txt", "w") as output_file:
    for line in input_file:
        columns = line.strip().split("\t")
        if columns[2] in ["+", "="]:
            output_file.write("\t".join(columns) + "\n")
