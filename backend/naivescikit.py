from pathlib import Path
import pandas as pd
import csv
import re
from nltk.tokenize import word_tokenize 
from nltk.corpus import stopwords
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

available = Path("comb.txt")
if(available.is_file()):
    data = pd.read_csv('comb.txt', sep='\t', names=['id', 'title','label', 'category', 'content', 'link'])
    data.drop(columns=['link','category'], inplace=True)
else:
    # data = pd.DataFrame(columns=["id", "title", "author", "category", "content", "label"])
    print("Error")

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
        temp = {"feature1": row["title"], "feature2": row["content"]}
        full[row["id"]] = (temp, row["label"])
        temp1 = clean_data(row["title"])
        temp2 = clean_data(row["content"])
        full[row["id"]] = ({"feature1":temp1,"feature2":temp2}, row["label"])

X = []
y = []

for key in full:
    X.append(full[key][0]["feature1"] + " " + full[key][0]["feature2"])
    y.append(full[key][1])


# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

# Create the pipeline
pipeline = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('classifier', MultinomialNB())
])


# Define the parameter grid to search over
param_grid = {
    'vectorizer__stop_words': ['english', stopword_list],
    'vectorizer__max_df': [0.5, 0.75, 1.0],
    'classifier__alpha': [0.1, 0.5, 1.0],
    'vectorizer__ngram_range': [(1, 1), (1, 2), (1, 3)]

}

# Perform the grid search using cross-validation
cv = StratifiedKFold(n_splits=10, shuffle=True, random_state=42)
grid_search = GridSearchCV(pipeline, param_grid=param_grid, cv=cv)
grid_search.fit(X_train, y_train)

print("Best parameters:", grid_search.best_params_)


# Get the best model
best_model = grid_search.best_estimator_

# Evaluate the best model on the test set
y_pred = best_model.predict(X_test)
print("Best validation accuracy:", grid_search.best_score_)
print(classification_report(y_test, y_pred))
print("Test accuracy: ", accuracy_score(y_test, y_pred))