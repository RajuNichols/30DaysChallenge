import json

# This block will convert the JSON data to a python list
def load2d(filename):
  with open(filename) as f:
    new = json.load(f)
  return new
# This block will grab info from the list and turn it into urls
#  format: https://pubmed.ncbi.nlm.nih.gov/?term=word1+word2



def list2url(termlist):
  outlist = []
  term = ""
  for row in termlist:
    for term in row:

      #keeps the tag term in the list for further processing, ignore it for url creation
      if(term.startswith("/")):
        outlist.append(term)
        continue
        
      outlist.append("https://pubmed.ncbi.nlm.nih.gov/?term=" + term.replace(" ","+") + "+pmc+open+access%5Bfilter%5D")
  return outlist

ourList2 = load2d("drugsgen.txt")

scrapyList = list2url(ourList2)
print(scrapyList)
