from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options  
from datetime import date
import os.path
from os import path
import json
import sys
class switch_table:
    assets_directory = None
    json_file = None
    switch = None
    hrefs = None
    names = None
    def __init__(self):
        self.switch = {};
        self.assets_directory = "./scrape_assets"
        if not path.isdir(self.assets_directory):
            os.mkdir(self.assets_directory)
        self.json_file = self.assets_directory+"/dining_hall_hrefs.json"
        self.names = []
        self.hrefs= []
    def get_web(self, arg):
        try:
            return self.switch.get(arg)
        except:
            return None
    __instance = None

def pruneListOfhref(args):
    ret = []
    for i in args:
        temp = i.get_attribute("href")
        if temp not in ret:
            ret.append(temp)
    return ret

def build_table(table, debug = False):
        #update the stuff
        #read from a local file
    if not debug:
        #read from a file and use that
        if path.exists(table.json_file):
            try:
                with open(table.json_file,"r") as input_file:
                    table.switch = json.load(input_file)
                return True
            except:
                pass
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome("./chromedriver", chrome_options=options)
    driver.get("https://housing.utexas.edu/dining")
    list_of_names = driver.find_elements_by_css_selector(".promo-headline [href]")
    if not debug:
        table.names = list(map(lambda x: x.text, list_of_names))
        table.hrefs = list(map(lambda x: x.get_attribute("href"), list_of_names))
    if len(table.hrefs) != len(table.names):
        driver.quit()
        return False
    f = lambda x: table.switch.update({table.names[x]:table.hrefs[x]})
    [f(x) for x in range(0,len(table.names))]
    driver.quit()
    with open(table.json_file, 'w') as outfile:
        json.dump(table.switch, outfile)
    return False

def filter(args):
    ret = []
    for i in args:
        if any(char.isdigit() for char in i.text) and ("container" not in i.text) and ("%" not in i.text):
            string = None
            try:
                int(i.text)
                string = "calories "+i.text
            except:
                string = i.text
            ret.append(string.strip())
    return ret

def call(argument):
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    try:
        table = switch_table()
    except:
        return "failed"
    debug_possible = build_table(table)
    driver = webdriver.Chrome("./chromedriver", chrome_options=options)
    #argument would be structures like
    link = table.get_web(argument["dining_hall"])
    if link == None and debug_possible:
        build_table(table, debug = true)
        link = table.get_web(argument["dining_hall"])
    if(link == None):
        return "enter valid dining hall name"
    driver.get(link)
    #find the correct nutrition facts
    times = list(map(lambda x: x.text.lower(), driver.find_elements_by_class_name("shortmenumeals")))
    try:
        index = times.index(argument["meal_time"].lower())
    except:
        return ("%s doesn't serve %s" % (argument["dining_hall"], argument["meal_time"]))
    driver.get(driver.find_elements_by_xpath("//a[contains(@href, 'longmenu.aspx')]")[index].get_attribute("href"))
    #on the menu that we're looking for
    food = list(map(lambda x: x.get_attribute("href"), driver.find_elements_by_xpath("//a[contains(@href, 'label.aspx')]")))
    dictionary = {}
    for i in food:
        driver.get(i)
        all_nut_facts = driver.find_elements_by_xpath("//*[contains(@class,'nutfacts')]")
        name = driver.find_element_by_class_name("labelrecipe")
        dictionary.update({name.text:filter(all_nut_facts)})
        driver.back()
        #update database
    driver.quit()
    return dictionary
