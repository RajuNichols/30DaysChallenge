
from pathlib import Path

p = Path('.')

listOfPaths = []
for uniquePath in list(p.glob('**/*.xml')):
  listOfPaths.append(str(uniquePath))

import pprint
import xml.etree.ElementTree as ET
pp = pprint.PrettyPrinter(width=41, compact=True)

myfiles = listOfPaths

#text
concls = []
#labels, id
labels = {}

finlabels = []

filenum = 0
for filename in myfiles:
  filenum += 1
  tree = ET.parse(filename)
  root = tree.getroot()
  next_up = False
  for child in root[3]:
    if ((child.tag == "passage")):
        found = False
        if (next_up):
          next_up = False
          for gchild in child:
            if (gchild.tag == "text" and len(gchild.text) > 40):
              
              concls.append([filename[:len(filename)-4], filename[:len(filename)-4]+ " " + str(gchild.text)])
              
        else:
          for gchild in child:
            #if this is found in an infon element then we want to search it's siblings for the text at the bottom
            if ((gchild.tag == "infon" and gchild.attrib["key"] == "section_type" and gchild.text == "ABSTRACT") or (gchild.tag == "infon" and gchild.attrib["key"] == "section_type" and gchild.text == "CONCL")):
              found = True
            #if this is the contents then the next one will have the results paragraph
            if (found and gchild.tag == "text" and ("CONCLUSION" in (gchild.text).upper())):
              next_up = True


print(concls)
printingTime = False
#labels = {id:conclusion text, sentiment label}...
for i in concls:
    id = i[0]
    value = i[1]
    if(id in labels):
        print("There is a duplicate. Here's the previous entry.")
        # print(concls[ind][0:8], labels[concls[ind][0:8]])
        pp.pprint(labels[id][0])

        print("And the new text: ")
        pp.pprint(value)
        #+, =, -, x, i
        label = str(input("What's the final label?: "))
        print(label)
        temp = labels[id]
        labels[id] = [temp[0],label]
    else:
        pp.pprint(value)
        #+, =, -, x, i

        # use 'P' to exit
        label = str(input("What's the label?: "))
        print(label)
        if label != 'P':
          labels[id]= [value,label]
        else:
          printingTime = True
          break

if printingTime:
  f = open("outputs.txt", "a")
  f.write(labels)
  # print(labels)

for id,value in labels.items():
    print(id,value)
