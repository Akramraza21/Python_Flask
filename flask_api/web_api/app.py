from flask import Flask,request,jsonify
from flask_restful import Api, Resource
from pymongo import MongoClient

app = Flask(__name__)
api = Api(app)
client = MongoClient("mongodb://db:27017")

db = client.aNewDB
UserNum = db["UserNum"]

UserNum.insert({
    'num_of_user':0,
    "well":True
})

class Visited(Resource):
    def get(self):
        prev_num = UserNum.find({})[0]["num_of_user"]
        new_num = prev_num + 1
        UserNum.update({"well":True},{"$set":{"num_of_user":new_num}})
        return str("Hello visitor num is : "+str(new_num))




class Add(Resource):
    def post(self):
        resData = request.get_json()
        Status_Code = 200;
        if "x" in resData and "y" in resData:
            Status_Code = 200
        else :
            Status_Code = 301
            respData = {
                "message":"An error happened",
                "Status Code": Status_Code
            }
            return jsonify(respData)
            
        x = int(resData["x"])
        y = int(resData["y"])
        sum = x+y
        retjson = {
            "message":sum,
            "Status code":Status_Code
        }
        return jsonify(retjson)
    # def get(self):
    #     return jsonify({"message":"Get not allowed","Status code":301})

class Subtract(Resource):
    def post(self):
        resData = request.get_json()
        Status_Code = 200;
        if "x" in resData and "y" in resData:
            Status_Code = 200
        else :
            Status_Code = 301
            respData = {
                "message":"An error happened",
                "Status Code": Status_Code
            }
            return jsonify(respData)
            
        x = int(resData["x"])
        y = int(resData["y"])
        subtract = x-y
        retjson = {
            "message":subtract,
            "Status code":Status_Code
        }
        return jsonify(retjson)

class Multiply(Resource):
    def post(self):
        resData = request.get_json()
        Status_Code = 200;
        if "x" in resData and "y" in resData:
            Status_Code = 200
        else :
            Status_Code = 301
            respData = {
                "message":"An error happened",
                "Status Code": Status_Code
            }
            return jsonify(respData)
            
        x = int(resData["x"])
        y = int(resData["y"])
        multiply = x*y
        retjson = {
            "message":multiply,
            "Status code":Status_Code
        }
        return jsonify(retjson)
class Divide(Resource):
    def post(self):
        resData = request.get_json()
        Status_Code = 200;
        if "x" not in resData or "y" not in resData:
            Status_Code = 301
            respData = {
                "message":"An error happened something missing",
                "Status Code": Status_Code
            }
            return jsonify(respData)
            
        elif resData["y"] == 0:
            Status_Code = 302
            respData = {
                "message":"An error happened divide by zero",
                "Status Code": Status_Code
            }
            return jsonify(respData)
            
        else :
            x = int(resData["x"])
            y = int(resData["y"])
            division = x/y
            retjson = {
                "message":division,
                "Status code":Status_Code
            }
            return jsonify(retjson)

api.add_resource(Add, '/add')
api.add_resource(Subtract,'/sub')
api.add_resource(Multiply,'/multiply')
api.add_resource(Divide,'/divide')
api.add_resource(Visited, '/visit')


@app.route('/')
def home():
    return 'hello there'

if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')  