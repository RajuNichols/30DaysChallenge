import pprint
import xml.etree.ElementTree as ET
pp = pprint.PrettyPrinter(width=41, compact=True)

myfiles = ["27511987.xml","28988570.xml","29110618.xml","29895183.xml","30644552.xml","30666002.xml","30896633.xml","31570493.xml","31749652.xml","32134010.xml","32585699.xml","33106908.xml","34084149.xml","34205612.xml","34440946.xml","34684419.xml","34836193.xml","35334588.xml","35420700.xml"]

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
        label = str(input("What's the label?: "))
        print(label)
        labels[id]= [value,label]
        
    
         
  
# for ind in range(0,len(concls)):
#   pp.pprint(concls[ind])

#   if(concls[ind][0:8] in labels):
#     print("There is a duplicate. Here's the previous entry.")
#     print(concls[ind][0:8], labels[concls[ind][0:8]])

#     print("And the new text: ")
#     pp.pprint(concls[ind])
#     #+, =, -, x, i
#     label = str(input("What's the final label?: "))
#     print(label)
#     labels[concls[ind][0:8]]= label

#   else:
#     #+, =, -, x, i
#     label = str(input("What's the label?: "))
#     print(label)
#     labels[concls[ind][0:8]]= label

     

# temp = ""
# for ind in range(0,len(labels)):
#     if(labels[ind][1]==temp):
#         pp.pprint(concls[ind-1])
#         pp.pprint(labels[ind-1])
#         print(ind)
#         pp.pprint(concls[ind])
#         pp.pprint(labels[ind])

#         label = str(input("What's the label?: "))
#         finlabels.append([concls[ind][0:8], label])
#         print(temp)
#         temp = labels[ind][1]
#     else:
#       temp = labels[ind][1]


for id,value in labels.items():
    print(id,value)