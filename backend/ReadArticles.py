#This program takes in ids from source.txt and pulls articles from the pubmed database through the BioC API
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET


if __name__ == '__main__':
    # Did this because it was easier and cleaner to copy and paste the ids into a file instead into an array in the code
    file = open('Source.txt', 'r')

    for line in file.readlines():
        ID = line.rstrip().split(',') #using split to form a list

    file.close()

    count = 0
    print(len(ID))
    for x in ID:
        r = requests.get('https://www.ncbi.nlm.nih.gov/research/bionlp/RESTful/pmcoa.cgi/BioC_xml/' + str(x) + '/unicode')
        count= count + 1
        # Change EffectArticles to wherever you are saving the files
        with open("EffectArticles/" + str(x) + ".xml", "wb") as fp:
            try:
                # print(str(count))
                # print(str(x))
                tree = ET.XML(r.content)
                ET.indent(tree)
                fp.write(ET.tostring(tree))
                fp.close()
            except:
                print("There was an error.")