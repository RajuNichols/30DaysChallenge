
from pathlib import Path
import pickle

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
  title = ""
  foundTitle = False
  category = root.find('category').text
  for child in root[3]:
    if ((child.tag == "passage")):
        found = False
        this_is_title = False

        if (next_up):
          next_up = False
          for gchild in child:
            if (gchild.tag == "text" and len(gchild.text) > 40):
              concls.append([filename[:len(filename)-4], filename[:len(filename)-4]+ " " + str(gchild.text),title,category])

        else:
          for gchild in child:

            if (this_is_title and not foundTitle):
              title = gchild.text
              foundTitle = True
            else:
              if (gchild.tag == "offset" and gchild.text == "0"):
                this_is_title = True
                        #if this is found in an infon element then we want to search it's siblings for the text at the bottom
            if ((gchild.tag == "infon" and gchild.attrib["key"] == "section_type" and gchild.text == "ABSTRACT") or (gchild.tag == "infon" and gchild.attrib["key"] == "section_type" and gchild.text == "CONCL")):
              found = True
            #if this is the contents then the next one will have the results paragraph
            if (found and gchild.tag == "text" and ("CONCLUSION" in (gchild.text).upper())):
              next_up = True




# print(concls)
printingTime = False
#labels = {id:conclusion text, sentiment label}...
for i in range(0,len(concls)):
    id = concls[i][0]
    value = concls[i][1]
    title = concls[i][2]
    cat   = concls[i][3]
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

        # I think this is a good way to handle duplicates?
        labels[id] = [temp[0] + " ||| " + value,label,title,cat]
    else:
        pp.pprint(value)
        pp.pprint("Article title is:"+title)
        #+ (include positive), =(include), -(include negative), x(remove), i(informational)

        # use 'P' to exit
        label = str(input("What's the label?: "))
        print(label)
        if label != 'P':
          labels[id]= [value,label,title,cat]
        else:
          printingTime = True
          break

if printingTime:
  file = open("outputs.txt", "ab")

  pickle.dump(labels, file)

  # f = open("outputs.txt", "a")
  # f.write(str(labels))
  # print(str(labels))

file.close()

with open('outputs.txt', 'rb') as handle:
    data = handle.read()
d = pickle.loads(data)
# print(f.read())

for key,value in d.items():
  print(value[0],value[1],value[2])
