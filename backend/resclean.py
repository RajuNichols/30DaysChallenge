import pickle

#get the pickled data from the pickle file of your specification
def decode(filename):
    file = open(filename, "rb")
    data = {}
    data = pickle.load(file)
    file.close()
    return data


#clean up the extra things from the conclusion texts in pickle dict
def clean(d):
    for key,value in d.copy().items():
        sep = str(" ||| " + key)
        d[key][0] = d[key][0].replace(sep,"")
        d[key][0] = d[key][0].replace(str(key+" "),"")
        # print(d[key][0])
    return d

#rewrite the new pickle dictionary to a pickle file, data is the dictionary you are serializing into the pickle file
def rewrite(filename, data):
    file = open(filename, "wb")
    pickle.dump(data, file)
    file.close()




data = decode("outputs.txt")

data = clean(data)

#prints out the data with the removed article id and ||| separators from the conclusion texts in our pickle dictionaries. 
print(data)
