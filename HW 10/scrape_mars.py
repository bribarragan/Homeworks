#!/usr/bin/env python
# coding: utf-8

# In[1]:

def scrape():
    from bs4 import BeautifulSoup
    from splinter import Browser
    import requests
    import os
    import pandas as pd
    import lxml.html as LH
    import time 


    # In[2]:


    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=False)


    # In[3]:


    url = 'https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
    browser.visit(url)


    # In[4]:


    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    news_title = soup.find('div', class_='content_title').text

    news_p = soup.find('div', class_="article_teaser_body").text


    # In[5]:


    print(news_title)


    # In[6]:


    # news_p=news_p.text
    print(news_p)


    # In[7]:


    url_jpl = 'https://www.jpl.nasa.gov'
    url_pic = url_jpl+'/spaceimages/?search=&category=Mars'
    browser.visit(url_pic)


    # In[8]:


    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')


    # In[9]:


    test = soup.find_all('a', class_="fancybox")


    # In[10]:


    image = test[1].get('data-fancybox-href')


    # In[11]:


    featured_image_url = url_jpl + image

    print(featured_image_url)


    # In[12]:


    # for link in soup.find_all('a', class_="fancybox"):
    #     print(link.get('data-fancybox-href'))


    # In[13]:


    url_tweet = "https://twitter.com/marswxreport?lang=en"
    browser.visit(url_tweet)


    # In[14]:


    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')


    # In[15]:


    #tweets = [p.text for p in soup.find_al('p', class="tweet-text")]


    # In[16]:


    tweets = soup.find_all('p', class_="tweet-text")


    # In[17]:


    mars_weather = tweets[0].text


    # In[18]:


    facts_url = "https://space-facts.com/mars/"


    # In[19]:


    facts_df = pd.read_html(facts_url, header=None, index_col=None)


    # In[20]:


    facts_df=facts_df[0]


    # In[21]:


    facts_df.columns=['Fact','Data']


    # In[22]:


    table = facts_df.to_html()


    # In[23]:


    table


    # In[24]:


    hemisphere_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(hemisphere_url)


    # In[25]:


    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    mars_hemis =[]


    # In[ ]:





    # In[26]:


    for x in range (4):
        time.sleep(5)
        title = browser.find_by_tag('h3')
        title[x].click()
        html = browser.html
        soup = BeautifulSoup(html, 'html.parser')
        link = soup.find("img", class_="wide-image")["src"]
        hem_title= soup.find('h2', class_="title").text
        mars_hemis.append({"img_url":"https://astrogeology.usgs.gov"+link, "title":hem_title})
        browser.back()


    # In[27]:


    mars_hemis


    # In[28]:


    mars_dict = {
        'hemis_pics':mars_hemis,
        'table': table,
        'weather':mars_weather,
        'feature_pic':featured_image_url,
        'title':news_title,
        'paragraph':news_p
    }
    return mars_dict

    # In[ ]:





    # In[ ]:





    # In[ ]:





    # In[ ]:




