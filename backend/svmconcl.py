from sklearn.svm import SVC
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import accuracy_score
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV, StratifiedKFold
import pandas as pd
import re
from nltk.corpus import stopwords
from sklearn.metrics import precision_score, classification_report
import numpy as np
from sklearn.model_selection import cross_val_predict

# Load the data
data = pd.read_csv('comb.txt', sep='\t', names=['id', 'title','label', 'category', 'body', 'link'])
data.drop(columns=['id','link','category'], inplace=True)

print(data['body'], data['title'])
data['body'] = data['body'].transpose()
data['title'] = data['title'].transpose()

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
    # 'vect__max_df': (0.5, 0.75, 1.0),
    'vect__max_features': (None, 5000, 10000),
    'vect__ngram_range': ((1, 1), (1, 2)),  # unigrams or bigrams
    'svm__C': [0.1, 1,3,5, 10],
    'svm__kernel': ['linear', 'rbf', 'sigmoid'],
    'svm__gamma': ['scale', 'auto'] + list(np.logspace(-3, 3, 7)),
    'svm__class_weight': [None, 'balanced']
}

scoring = {'accuracy': 'accuracy',
           'precision': 'precision_macro',
           'recall': 'recall_macro',
           'f1': 'f1_macro'}
# X = data[['body', 'title']]
# y = data['label']
# Perform grid search
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
grid_search = GridSearchCV(pipeline, parameters, cv=cv, n_jobs=-1, scoring='f1_micro', return_train_score=True)
grid_search.fit(data['title'] + ' ' + data['body'], data['label'])

# y_pred = cross_val_predict(grid_search, data['title'] + ' ' + data['body'], data['label'], cv=cv)

# # Generate classification report
# print(classification_report(data['label'], y_pred))
# Print the best parameters and accuracy
# Print the best parameters and evaluation metrics
print("Best parameters: ", grid_search.best_params_)
print("Best accuracy: ", grid_search.best_score_)
# best_precision = grid_search.cv_results_['mean_test_precision_macro'][grid_search.best_index_]
# if np.isnan(best_precision):
#     best_precision = 0
# print("Best precision: ", best_precision)
# best_recall = grid_search.cv_results_['mean_test_recall_macro'][grid_search.best_index_]
# if np.isnan(best_recall):
#     best_recall = 0
# print("Best recall: ", best_recall)
# best_f1 = grid_search.cv_results_['mean_test_f1_macro'][grid_search.best_index_]
# if np.isnan(best_f1):
#     best_f1 = 0
# print("Best f1-score: ", best_f1)

# grid_search = GridSearchCV(pipeline, parameters, cv=10, n_jobs=-1)
# grid_search.fit(data['body'], data['label'])

# # Print the best parameters and accuracy
# print("Best parameters: ", grid_search.best_params_)
# print("Best accuracy: ", grid_search.best_score_)
