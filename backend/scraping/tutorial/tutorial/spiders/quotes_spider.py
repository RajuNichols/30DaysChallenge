from pathlib import Path

import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"
    tag = ""
    def start_requests(self):
        urls = ['/Smoking', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+Smoking+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+cigarette+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+Secondhand+Smoke+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+passive+smoking+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+Nicotine+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+on+Vaping+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+E-cigarettes+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+Tobacco+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+Electronic+cigarettes+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effect+on+Smoking+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effect+on+cigarette+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Passive+smoking+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+on+Nicotine+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Obesity+and+Smoking+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Vaping+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=E-cigarettes+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Tobacco+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Electronic+cigarettes+cessation+pmc+open+access%5Bfilter%5D', '/Alcohol', 'https://pubmed.ncbi.nlm.nih.gov/?term=Alcohol+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+substance+abuse+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+of+alcohol+addiction+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Effects+on+alcohol+addiction+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=alcoholic+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=chemical+dependency+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=alcholism+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=alcohol+addiction+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=Alcohol+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=substance+abuse+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=addiction+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=alcohol+addictions+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=alcoholic+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=chemical+dependency+cessation+pmc+open+access%5Bfilter%5D', 'https://pubmed.ncbi.nlm.nih.gov/?term=alcholism+cessation+pmc+open+access%5Bfilter%5D']
        for url in urls:
            if(url.startswith("/")):
                self.tag = url
                continue
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        for re in response.css('.docsum-pmid').getall():
            ind = re.find(">")
            re = re[ind+1:]
            re = re[:re.find("<")]
            print(self.tag)

            #APPENDS comma-separated ids to given filename, keyword APPENDS
            #run using scrapy runspider quotes_spider

            #change the filename to be wherever you want the pmids to go
            filename = 'alcoholpmids.txt'
            with Path(filename).open("a") as f:
                f.write(self.tag+","+re+ ",")

            yield{"ids": re}
