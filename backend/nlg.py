from gensim.test.utils import common_texts
import gensim
from gensim.models import Word2Vec
from multiprocessing import cpu_count
import gensim.downloader as api
import json
#https://www.machinelearningplus.com/nlp/gensim-tutorial/#14howtotrainword2vecmodelusinggensim
#https://datascience.stackexchange.com/questions/69209/generating-synonyms-or-similar-words-from-multiples-word-embeddings
#https://kavita-ganesan.com/easily-access-pre-trained-word-embeddings-with-gensim/#.Y8oQwuzMKdY
#https://rare-technologies.com/new-download-api-for-pretrained-nlp-models-and-datasets-in-gensim/


#gathers top 25 similar terms and appends to giant list, root is the "key" in the row, terms is a list of terms
def search(terms, root):
  temp = [root]
  for row in model.most_similar(positive=terms,topn=25):
    temp.append(row[0].replace("_", " "))
  gen.append(temp)
 
# dump 2d list into txt file in json format, gen is list being dumped
def dump(gen, filename):
  with open(filename, "w") as f:
  json.dump(gen, f, indent=4)

#load json array from txt file into python 2d list
def load2d(filename):
  with open(filename) as f:
    new = json.load(f)
  return new
  
  

# model = api.load("word2vec-google-news-300")

gen = []

# search(["fitness", "exercise"], "Fitness")
# search(["Smoking"], "Smoking")
# search(["alcoholism"], "Alcohol")
# search(["anxiety"], "Anxiety & Stress")
# search(["productivity"], "Productivity")
# search(["hair", "growth"], "Hair")
# search(["sleep"], "Sleep")
# search(["procrastination"], "Procrastination")
# search(["health"], "Health")
# search(["claustrophobia"], "Phobias")
# search(["diet"], "Diet & Nutrition")
# search(["paleo"], "Diet & Nutrition")
# search(["nutrition"], "Diet & Nutrition")
# search(["self", "care"], "Self-care")
# search(["breathe"], "Health")
# search(["frugal"], "Money")
# search(["learning", "language"], "Learning")
# search(["sickness"], "Health")
# search(["home", "remedies"], "Health")
# search(["compound", "exercises"], "Fitness")
# search(["isolation", "exercises"], "Fitness")
# search(["Skin"], "Skin")


new = load2d("generated.txt")

# print(new)
