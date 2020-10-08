from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from security import identity, authentication
from flask_jwt import JWT, jwt_required
from user import UserRegister

app = Flask(__name__)
app.secret_key = "akatswe"
api = Api(app)
jwt = JWT(app, authentication, identity)  # /auth

items = [{"name": "store1", "prise": 22.5, 'store': "open"},
         {"name": "popat", "prise": 21.5, 'store': "closed"},
         {"name": "boop bop", "prise": 12.5, 'store': "valid"}]

# 200 ok
# 201 created
# 202 accepted
# 400 bad request
# 404 not found


class Item(Resource):
    @jwt_required()
    def get(self, name):
        b = [item for item in items if item['name'] == name]
        return {"item": b}, 200 if len(b) else 404
        # return {'item': 'item not found'}, 404

    def post(self, name):
        b = [x for x in items if x["name"] == name]
        if len(b):
            return {"error": "item {} already exit".format(name)}, 400
        else:
            item = request.get_json(force=True)
            item["name"] = name
            items.insert(0, item)
            return {"item": "submitted"}, 201

    @jwt_required()
    def delete(self, name):
        for item in items:
            if item["name"] == name:
                items.remove(item)
                return {"item": "Deleted"}, 200
        return {"item": "store not found"}, 404

    def put(self, name):
        global items
        data = request.get_json()
        val = [x for x in items if x["name"] != name]
        data["name"] = name
        val.append(data)
        items = val
        return {'item': 'Updated'}, 201


class Items(Resource):
    def get(self):
        return {"items": items}, 200 if items else 404


api.add_resource(Item, '/item/<string:name>')
api.add_resource(Items, '/items')
api.add_resource(UserRegister, '/register')

if __name__ == "__main__":
    app.run(debug=True, port=5000)
