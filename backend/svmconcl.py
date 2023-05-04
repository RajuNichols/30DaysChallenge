from sklearn.svm import SVC
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import accuracy_score
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV
import pandas as pd
import re
from nltk.corpus import stopwords
import numpy as np

# Load the data
data = pd.read_csv('new.txt', sep='\t', names=['id', 'title','label', 'category', 'body', 'link'])
data.drop(columns=['id','link','category'], inplace=True)

print(data)

# Define preprocessing function
extra_punct = [',', '.', '"', ':', ')', '(', '!', '?', '|', ';', "'", '$', '&',
               '/', '[', ']', '>', '%', '=', '#', '*', '+', '\\', '•', '~', '@', '£',
               '·', '_', '{', '}', '©', '^', '®', '`', '<', '→', '°', '€', '™', '›',
               '♥', '←', '×', '§', '″', '′', 'Â', '█', '½', 'à', '…', '“', '★', '”',
               '–', '●', 'â', '►', '−', '¢', '²', '¬', '░', '¶', '↑', '±', '¿', '▾',
               '═', '¦', '║', '―', '¥', '▓', '—', '‹', '─', '▒', '：', '¼', '⊕', '▼',
               '▪', '†', '■', '’', '▀', '¨', '▄', '♫', '☆', 'é', '¯', '♦', '¤', '▲',
               'è', '¸', '¾', 'Ã', '⋅', '‘', '∞', '∙', '）', '↓', '、', '│', '（', '»',
               '，', '♪', '╩', '╚', '³', '・', '╦', '╣', '╔', '╗', '▬', '❤', 'ï', 'Ø',
               '¹', '≤', '‡', '√', '«', '»', '´', 'º', '¾', '¡', '§', '£', '₤']
stopword_list = stopwords.words('english') + extra_punct
def preprocess(text):
    # Lowercase
    text = text.lower()
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove punctuation and stopwords
    text = ' '.join([word for word in text.split() if word not in stopword_list])
    return text

# Preprocess the data
data['title'] = data['title'].apply(preprocess)
data['body'] = data['body'].apply(preprocess)

# Define the pipeline
pipeline = Pipeline([
    ('vect', CountVectorizer()),
    ('svm', SVC(random_state=42))
])
print(pipeline.get_params().keys())
# Define the hyperparameters to search
parameters = {
    'vect__max_df': (0.5, 0.75, 1.0),
    'vect__max_features': (None, 5000, 10000),
    'vect__ngram_range': ((1, 1), (1, 2)),  # unigrams or bigrams
    'svm__C': [0.1, 1, 10],
    'svm__kernel': ['linear', 'rbf', 'sigmoid'],
    'svm__gamma': ['scale', 'auto'] + list(np.logspace(-3, 3, 7)),
    'svm__class_weight': [None, 'balanced']
}

# Perform grid search
grid_search = GridSearchCV(pipeline, parameters, cv=5, n_jobs=-1)
grid_search.fit(data['body'], data['label'])

# Print the best parameters and accuracy
print("Best parameters: ", grid_search.best_params_)
print("Best accuracy: ", grid_search.best_score_)
