from pathlib import Path
import pickle 

available = Path("outputs.txt")
if(available.is_file()):
  file = open("outputs.txt", "rb")
  labels = pickle.load(file)
  file.close()

base = "https://pubmed.ncbi.nlm.nih.gov/"

for row in labels:
  if (labels[row][1] == "+" or labels[row][1] == "=" or labels[row][1] == "i"):
    print(row + "\t" + base+row)