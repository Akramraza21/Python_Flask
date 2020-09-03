from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///posts.db'
db = SQLAlchemy(app)

class Blogs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    article = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), default='N/A' )

    def __repr__(self):
        return 'Blog Post ' + str(self.id)

posts = [{'article':'this is article 1','author':'nikhil'},
        {'article':'this is article 2','author':'binod'},
        {'article':'this is article 3','author':'rahul'},
        {'article':'this is article 4'}]

@app.route('/json',methods = ['GET','POST'])
def jeson():
    data = {
        'name': 'akatsuki',
        'age':26,
        'address':{
            'street':'imaambara',
            'village': 'taragarh',
            'city':'mirzapur',
            'state':'Uttar Pradesh',
            'Pin code': 213245
        },

        'mobile no.':[2112231,2342334,4523534,2534544]
    }
    return jsonify(data)

@app.route('/', methods=['POST', 'GET'])
def home():
    if request.method == "POST":
        New_article = request.form['article']
        Author = request.form['author']
        new_session = Blogs(article=New_article, author=Author)
        db.session.add(new_session)
        db.session.commit()
        return redirect('/')
    else:
        posts = Blogs.query.all()  
        return render_template('index.html',posts=posts)

@app.route('/post/delete/<int:id>')
def deletePost(id):
    delete_post = Blogs.query.get(id)
    db.session.delete(delete_post)
    db.session.commit()
    return redirect('/')

@app.route('/nums',methods=['POST'])
def nums():
    dataN = request.get_json()
    fname = dataN["first name"]
    lname = dataN["last name"]
    age = dataN["age"]
    return jsonify({'Person info':"This is "+fname+' '+lname+' and He is of '+str(age)})

@app.route('/post/edit/<int:id>', methods=['POST','GET'])
def editPost(id):
    edit_post = Blogs.query.get(id)
    if request.method == 'POST':
        edit_post.article = request.form['article']
        edit_post.author = request.form['author']
        db.session.commit()
        return redirect('/')
    
    else:
        return render_template('form.html', post=edit_post)

if __name__ == "__main__":
    app.run(debug=True, port=5000)