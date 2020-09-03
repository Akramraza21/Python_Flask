from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy, request



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mobiles.db'
db = SQLAlchemy(app)

class MobileData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ram = db.Column(db.String, nullable=False)
    storage = db.Column(db.String, nullable=False, default='unknown')

    def __repr__(self):
        return 'Mobile '+str(self.id)

mobileData = [{'name':'Nokia', 'ram':'4GB', 'storage':'16GB'},
                {'name':'Sumsung', 'ram':'6GB', 'storage':'32GB'},
                {'name':'Motorala', 'ram':'3GB'}]

@app.route('/')
def greeting():
    return 'hello world'

@app.route('/mobiles', methods=['GET','POST'])
def mobilePhone():
    mobileData = MobileData.query.all()
    if request.method == 'POST':
        mobile_name = request.form['name']
        mobile_ram = request.form['ram']
        mobile_storage = request.form['storage']
        new_mobile = MobileData(name = mobile_name, ram = mobile_ram, storage=mobile_storage)
        db.session.add(new_mobile)
        db.session.commit()
        return redirect('/mobiles')
    else:
        return render_template('base.html', mobiles=mobileData)

@app.route('/mobiles/delete/<int:id>')
def deleteMobile(id):
    delete_mobile = MobileData.query.get_or_404(id)
    db.session.delete(delete_mobile)
    db.session.commit()
    return redirect('/mobiles')

@app.route('/mobiles/edit/<int:id>',methods=['GET','POST'])
def editMobile(id):
    mobile = MobileData.query.get_or_404(id)
    if request.method == 'POST':
        mobile.name = request.form['name']
        mobile.ram = request.form['ram']
        mobile.storage = request.form['storage']
        db.session.commit()
        return redirect('/mobiles')
    else:
        return render_template('edit_mobile.html', mobile=mobile)

if __name__ == "__main__":
    app.run(debug=True, port=5000)