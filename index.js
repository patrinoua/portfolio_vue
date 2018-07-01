const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const fs = require('fs');

let myProjects = fs.readdirSync(__dirname+'/projects');

var myProjectObjects = myProjects.map(function(project){
    return {
        dirName: project,
        displayName: require('./projects/' + project + '/project.json' ).displayName,
        description: require('./projects/' + project + '/project.json' ).description,
        tryMsg: require('./projects/' + project + '/project.json' ).tryMsg,
        heroku_url: require('./projects/' + project + '/project.json' ).heroku_url,
        codeMsg: require('./projects/' + project + '/project.json' ).codeMsg,
        github_url: require('./projects/' + project + '/project.json' ).github_url,
        createdWith: require('./projects/' + project + '/project.json' ).createdWith,
        comment: require('./projects/' + project + '/project.json' ).comment,
        comment_link: require('./projects/' + project + '/project.json' ).comment_link,
        comment_url: require('./projects/' + project + '/project.json' ).comment_url,
    }
})

app.engine('handlebars',hb());

app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public'));

app.use(express.static(__dirname+'/projects'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.get('/',function(req,res){
    res.render('projectData',{
        myProjectObjects : myProjectObjects,
        layout:'welcome'
    })
})
app.listen(process.env.PORT || 8080, ()=> console.log(`port 8080 is listening`) );
