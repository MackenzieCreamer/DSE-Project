#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import requests
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time 


# In[ ]:


flag = True
URL = 'https://5e.tools/bestiary.html'
driver = webdriver.Chrome('./chromedriver')
driver.get(URL)
element2 = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "div.list.list--stats.monsters"))
)
page = element2.get_attribute('innerHTML')
driver.close()

soup = BeautifulSoup(page,'html.parser')

hrefList = []
for a in soup.find_all('a', href=True):
    hrefList.append(a['href'])

print(hrefList)
driver = webdriver.Chrome('./chromedriver')
for href in hrefList:
    newURL = URL + href
    driver.get(newURL)
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//th[contains(@class,'rnd-name')]/../.."))
    )
    page = element.get_attribute('innerHTML')
    soup = BeautifulSoup(page,'html.parser')
    print(soup)
driver.close()


# In[ ]:




