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
        comments: require('./projects/' + project + '/project.json' ).comments
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
app.listen(8080, ()=> console.log(`port 8080 is listening`) );
































// app.get('/projects/:projectName',function(req,res,next){
// var requestedProject=0;
//     myProjects.forEach(project =>{
//         if(req.params.projectName == project){
//             console.log('we have a match!!!!!!!!');
//             requestedProject=project;
//         }
//         else {
//             console.log('no such project try again!');
//         }
//     })
//     console.log(requestedProject);
//     if(requestedProject!=0){
//         var project = {
//                 dirName: requestedProject,
//                 displayName: require('./projects/' + requestedProject + '/project.json' ).displayName,
//                 description:  require('./projects/' + requestedProject + '/project.json' ).description
//             }
//         res.render('project',{
//             myProjectObjects : myProjectObjects,
//             project : project,
//             layout:'each_project_layout'
//         })
//     }else {
//         res.status(404).send(`<!doctype html><title></title><h1>Page  "${req.params.projectName}" not found boo :( !</h1>`);
//     }
// });
