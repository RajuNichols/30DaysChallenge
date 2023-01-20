from gensim.test.utils import common_texts
import gensim
from gensim.models import Word2Vec
from multiprocessing import cpu_count
import gensim.downloader as api
#https://www.machinelearningplus.com/nlp/gensim-tutorial/#14howtotrainword2vecmodelusinggensim
#https://datascience.stackexchange.com/questions/69209/generating-synonyms-or-similar-words-from-multiples-word-embeddings
#https://kavita-ganesan.com/easily-access-pre-trained-word-embeddings-with-gensim/#.Y8oQwuzMKdY
#https://rare-technologies.com/new-download-api-for-pretrained-nlp-models-and-datasets-in-gensim/

#commented out lines are another way to do compound words, positive= refers to sentiment of generated word
# sentences = [['hair', 'loss']]

model = api.load("word2vec-google-news-300")
# print(model.most_similar(sentences,topn=10))
print(model.most_similar(positive=['hair','growth'],topn=10))