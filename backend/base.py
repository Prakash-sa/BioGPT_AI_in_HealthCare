from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import flask

import os
import subprocess
import base64
from PIL import Image
# from flask_cors import CORS

api = Flask(__name__)
cors = CORS(api)


@api.route('/api/upload/', methods=['POST', 'GET'])
def imageupload():
    context = request.json['image']
    imgdata = base64.b64decode(context)
    with open("mj_stats.jpg", 'wb') as f:
        f.write(imgdata)
    os.system(
        "python3 multi_column_OCR.py --image mj_stats.jpg --output ../frontend/src/assets/results.csv")

    return "Done"


api.run()
