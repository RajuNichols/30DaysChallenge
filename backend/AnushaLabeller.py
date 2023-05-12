from pathlib import Path
import pickle
import shutil

p = Path('.')
listOfPaths = []
for uniquePath in list(p.glob('*.xml')):
  listOfPaths.append(str(uniquePath))

listOfPaths.sort()
import pprint
import xml.etree.ElementTree as ET
pp = pprint.PrettyPrinter(width=41, compact=True)

myfiles = listOfPaths

concls = []
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
            if ((gchild.tag == "infon" and gchild.attrib["key"] == "section_type" and gchild.text == "ABSTRACT") or (gchild.tag == "infon" and gchild.attrib["key"] == "section_type" and gchild.text == "CONCL")):
              found = True
            if (found and gchild.tag == "text" and ("CONCLUSION" in (gchild.text).upper())):
              next_up = True

print("conclusions: ", labels)
session = []
if Path("outputs.txt").is_file():
  with open("outputs.txt", "rb") as file:
    labels = pickle.load(file)

printingTime = False
for i in range(len(concls)):
  id = concls[i][0]
  value = concls[i][1]
  title = concls[i][2]
  cat = concls[i][3]
  if id in labels:
    print("There is a duplicate. Here's the previous entry.")
    pp.pprint(labels[id][0])
    print("And the new text: ")
    pp.pprint(value)
    label = str(input("What's the final label?: "))
    print(label)
    temp = labels[id]
    if label != 'P':
      labels[id] = [temp[0] + " ||| " + value, label, title, cat]
      session.append(id)
    else:
      printingTime = True
      break
  else:
    pp.pprint(value)
    pp.pprint("Article title is: "+title)
    label = str(input("What's the label?: "))
    print(label)
    if label != 'P':
      labels[id] = [value, label, title, cat]
      session.append(id)
    else:
      printingTime = True
      break

if printingTime:
  print("You labelled these ids in this session: ")
  for id in session:
    print(id)
  with open("outputs.txt", "wb") as file:
    pickle.dump(labels, file)

  # move files
  directory = Path("moving")
  directory.mkdir(parents=True, exist_ok=True)

# move the files to the "moving" directory
for id in session:
    filename = id + ".xml"
    src_path = Path(filename)
    dest_path = directory / filename
    shutil.move(src_path, dest_path)
