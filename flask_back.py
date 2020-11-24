import os
import scrape
from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route('/get', methods = ['GET'])
def call_func():
    res = scrape.call(request.args)
    # res = lane_detection.call(request.get_json()['b64'])
    return res

app.run()
