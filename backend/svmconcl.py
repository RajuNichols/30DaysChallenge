from sklearn.svm import SVC
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import accuracy_score
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV, StratifiedKFold
import pandas as pd
import re
from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split, cross_val_predict
from sklearn.metrics import precision_score, classification_report
from nltk.tokenize import word_tokenize
import numpy as np

# Load the data
data = pd.read_csv('comb.txt', sep='\t', names=['id', 'title','label', 'category', 'body', 'link'])
data.drop(columns=['link','category'], inplace=True)

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

def remove_stopwords(text):
    words = word_tokenize(text)
    output = []
    for word in words:
        if word not in stopword_list:
            output.append(word)
    return " ".join(output)

def clean_data(data):
    text = data.lower()
    text = re.sub(r'\s+'," ",text)
    text = re.sub(r","," ",text)
    text = remove_stopwords(text)
    return text

full = {}
if not data.empty:
    for i, row in data.iterrows():
        temp = {"feature1": row["title"], "feature2": row["body"]}
        # full[row["id"]] = (temp, row["label"])
        temp1 = clean_data(row["title"])
        temp2 = clean_data(row["body"])
        full[row["id"]] = ({"feature1":temp1,"feature2":temp2}, row["label"])

X = []
y = []

for key in full:
    X.append(full[key][0]["feature1"] + " " + full[key][0]["feature2"])
    y.append(full[key][1])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

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
cv = StratifiedKFold(n_splits=14, shuffle=True, random_state=42)
grid_search = GridSearchCV(pipeline, parameters, cv=cv, n_jobs=-1, return_train_score=True)
grid_search.fit(X_train, y_train)

# Print the best hyperparameters and accuracy
print("Best parameters:", grid_search.best_params_)
print("Best accuracy:", grid_search.best_score_)

# Get the best model
best_model = grid_search.best_estimator_

# Make predictions on the test data using the best model
y_pred = best_model.predict(X_test)

# Print the classification report
print(classification_report(y_test, y_pred))
print("Test accuracy: ", accuracy_score(y_test, y_pred))
