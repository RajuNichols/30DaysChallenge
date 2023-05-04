from nltk.corpus import stopwords
import pickle
from pathlib import Path
import pandas
import csv
import re
from nltk.tokenize import word_tokenize 
from sklearn.feature_extraction.text import CountVectorizer
from nltk.classify import NaiveBayesClassifier

available = Path("mattAnusha.txt")
labels = []
if(available.is_file()):
  data=pandas.read_csv('mattAnusha.txt',sep='\t')
  # file.close()
data = []
with open("mattAnusha.txt") as file:
    tsv_file = csv.reader(file, delimiter="\t")
    for line in tsv_file:
        data.append(line)



extra_punct = [
    ',', '.', '"', ':', ')', '(', '!', '?', '|', ';', "'", '$', '&',
    '/', '[', ']', '>', '%', '=', '#', '*', '+', '\\', '•',  '~', '@', '£',
    '·', '_', '{', '}', '©', '^', '®', '`',  '<', '→', '°', '€', '™', '›',
    '♥', '←', '×', '§', '″', '′', 'Â', '█', '½', 'à', '…', '“', '★', '”',
    '–', '●', 'â', '►', '−', '¢', '²', '¬', '░', '¶', '↑', '±', '¿', '▾',
    '═', '¦', '║', '―', '¥', '▓', '—', '‹', '─', '▒', '：', '¼', '⊕', '▼',
    '▪', '†', '■', '’', '▀', '¨', '▄', '♫', '☆', 'é', '¯', '♦', '¤', '▲',
    'è', '¸', '¾', 'Ã', '⋅', '‘', '∞', '∙', '）', '↓', '、', '│', '（', '»',
    '，', '♪', '╩', '╚', '³', '・', '╦', '╣', '╔', '╗', '▬', '❤', 'ï', 'Ø',
    '¹', '≤', '‡', '√', '«', '»', '´', 'º', '¾', '¡', '§', '£', '₤']

stopword_list = stopwords.words('english')
stopword_list = stopword_list + extra_punct

# if("is" in stopword_list):
#    print("yes")
# print(data)
full = {}

#({'feature1': 1, 'feature2': 'A', 'feature3': True}, 'label1')
#((title, conclusion), label)
for value in data:
  temp = {"feature1": value[1], "feature2": value[4]}
  full[value[0]] = (temp, value[2])
  # print(temp)


def remove_stopwords(text):
  words = word_tokenize(text)
  # print(words)
  output = []
  for word in words:
    # if(word == "."):
        # print("This is a period.")
    if(word in stopword_list):
      if(word == "."):
        # print("This is a stopword.")
        # print(word)
        continue
    else:

      output.append(word)
  return output


#preprocessing
def clean_data(data):
  text = re.sub(r"\[[0-9]*\]"," ",data)
  text = text.lower()
  text = re.sub(r'\s+'," ",text)
  text = re.sub(r","," ",text)
  text = remove_stopwords(text)
  
  return text



for key,value in full.copy().items():
  # print(value[0])
  print(value)
  label = value[1]
  title = value[0]["feature1"]
  text = value[0]["feature2"]
  # print(value[0][0])
  # break
  temp1 = title.lower()
  temp2 = text.lower()
  # # print()
  # # print(temp1,temp2)
  temp1 = clean_data(temp1)
  temp2 = clean_data(temp2)
  # # print(temp1,temp2)
  full[key] = ((temp1,temp2), label)

# print(full[0])
print(full.values())

cv = CountVectorizer()
# vectorizing words and storing in variable X(predictor)
X = cv.fit_transform(full).toarray()
print(X)

classifier = NaiveBayesClassifier.train(full.values())
