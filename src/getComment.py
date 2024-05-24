import time

from selenium import webdriver
from selenium.common import NoSuchElementException, ElementClickInterceptedException, WebDriverException, ElementNotInteractableException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import chromedriver_autoinstaller
from datetime import datetime
from selenium.webdriver.common.keys import Keys

def get_comment(url):
    driver.get(url)
    time.sleep(3)

    # 스크롤 다운하여 모든 댓글 로드
    last_height = driver.execute_script("return document.documentElement.scrollHeight")
    while True:
        driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
        time.sleep(3)  # 동적 로드 시간을 기다림
        new_height = driver.execute_script("return document.documentElement.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    scripts = driver.find_elements(By.CSS_SELECTOR, "#content-text > span")

    result = []
    for script in scripts:
        result.append(script.text)
        result.append("\n")

    # 결과값을 텍스트 파일로 저장하기
    with open("script_comments.txt", 'a', encoding='utf8') as f:
        f.writelines(result)
        f.writelines('\n')


chromedriver_autoinstaller.install()
opt = Options()
opt.add_argument('--user-data-dir=C:/WORK/cache')
driver =webdriver.Chrome(options=opt)

get_comment("https://www.youtube.com/watch?v=I8IK3ZeWOjU")

'''
#txt 파일에 있는 값들 가져다가 쓰기
with open('url_emma_watson.txt', 'r') as file:
    # Read each line in the file
    for line in file:
        print(datetime.now())
        get_script(line.strip())
        driver.quit()
        driver = webdriver.Chrome(options=opt)
'''