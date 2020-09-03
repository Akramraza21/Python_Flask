from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
import json

app = Flask(__name__)
CORS(app)
api = Api(app)
client = MongoClient('mongodb://localhost:27017/')

db = client.test_database
blogs = db.Blogs
contacts = db.Contact
signin = db.Signin


# collection.insert_one({"name":"akatsuki"})

class Contact(Resource):
    def post(self):
        data = request.get_json()
        contacts.insert_one(data)
        return {"insert":"true"} ,200

class Blog(Resource):
    def get(self):
        data = dumps(blogs.find())
        return json.loads(data)
            
        # return jsonify(array)
    def post(self):
        data = request.get_json()
        blogs.insert_one(data)
        return {"insert":True},200
    
    def delete(self):
        data = request.get_json()
        print('___________________________',data)
        idNumber = data["_id"]["$oid"]
        x = ObjectId(str(idNumber)) 
        if blogs.find_one({"_id": x}):
            # print('_____________________________',data["_id"])
            blogs.delete_one({"_id":x})
            return {"message":"done"}, 200
        else:
            return "data not present",200

class Signin(Resource):
    # def get(self):
    #     data = dumps(signin.find())
    #     return json.loads(data)
    def post(self):
        data = request.get_json()
        # print('__________________',data)
        if (signin.find_one({"email":data["email"]}) or (not data["password"] or not data["email"])):
            if signin.find_one({"email":data["email"]}):
                return {"data":"error","message": "Email already exist"}
            return {"data":"error", "message": "Please insert email and password correctly"}
        else:
            json.dumps(data)
            signin.insert_one(data)
            return {"data":"done","message":"Account created successful"}, 200
        # return 200

class Login(Resource):
    def post(self):
        loginInfo = request.get_json()
        databaseInfo = signin.find_one({"email":loginInfo["email"]})
        if (loginInfo["email"] ==  ""):
            return {"data":"error","message":"Please enter an email "}
        elif (loginInfo["password"] == ""):
            return {"data":"error","message":"Please enter the password"}
        elif databaseInfo == None:
            return {"data":"error","message":"Email or password is incorrect"}
        elif (databaseInfo["email"]!=loginInfo["email"] or  databaseInfo["password"]!=loginInfo["password"]):
            return {"data":"error","message": "Email id or password is incorrect"}
        elif (databaseInfo["email"]==loginInfo["email"] and  databaseInfo["password"]==loginInfo["password"]):
            return {"data":"done","message": "Login successful /n"+str(databaseInfo["name"])+" Welcome to the Codiocity"}
        else:
            pass

api.add_resource(Blog,'/blog')
api.add_resource(Contact,'/contact')
api.add_resource(Signin,'/sign')
api.add_resource(Login, '/login')

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")