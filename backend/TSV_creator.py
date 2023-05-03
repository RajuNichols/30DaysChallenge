# Make sure sumy is installed :)
# Uncomment the prints if you want output showing the data but it should be pretty solid for any picklefile you have
import pickle
from pathlib import Path
import re
import sumy
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer
import nltk
nltk.download('punkt')


#preprocessing
def clean_data(data):
  text = re.sub(r"\[[0-9]*\]"," ",data)
  text = text.lower()
  text = re.sub(r'\s+'," ",text)
  text = re.sub(r","," ",text)
  return text


available = Path("pickle1.txt")
if(available.is_file()):
  file = open("pickle1.txt", "rb")
  labels = pickle.load(file)
  file.close()

summaries = {}

# Using the positive labeled ones only
for row in labels:
  # print(row + ", " + labels[row][0][8:])
  if (labels[row][1] == "+" or labels[row][1] == "=" or labels[row][1] == "i"):
    summaries[row] = (labels[row][0][8:])
    print(row + " added!!\n")

tmp = ""
proc_summaries = {}

# Go through the summaries and take out the possible ||| in them, capitalize first word, strip blank space
for row in summaries:
  # print(summaries[row]+"\nAnd then here is that summarized:\n\n")
  clean_this_one = clean_data(summaries[row])
  parser = PlaintextParser.from_string(clean_this_one,Tokenizer("english"))
  summarizer = LexRankSummarizer()
  #Summarize the document with 2 sentences
  summary = summarizer(parser.document, 15)
  tmp = ""
  for sentence in summary:
    if str(sentence)[0] == '|':
      # print(str(sentence)[12:].strip().capitalize())
      tmp += str(sentence)[12:].strip().capitalize() + " "
      # print("\nAvoided 1 ID\n")
    else:
      # print(str(sentence).strip().capitalize())
      tmp += str(sentence).strip().capitalize() + " "
    # print(type(sentence))
  proc_summaries[row] = (tmp)
  print()

base = "https://pubmed.ncbi.nlm.nih.gov/"
  
f = open("outputTest.txt", "w")
for row in labels:
  if (labels[row][1] == "+" or labels[row][1] == "=" or labels[row][1] == "i"):
    # Edited this in github idk if there's syntax errors
    print(row + "\t" + labels[row][2] + "\t" + labels[row][1] + "\t" + labels[row][3] + "\t" + proc_summaries[row] + "\t" + base+row + "\n")
    # print(labels[row][2])
    # print(labels[row][3])
    # print(proc_summaries[row]+"\n\n")
    f.write(row + "\t" + labels[row][2] + "\t" + labels[row][1] + "\t" + labels[row][3] + "\t" + proc_summaries[row] + "\t" + base+row + "\n")

f.close()
