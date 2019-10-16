const express = require('express');

const app = express();
app.use(express.json());


let numberOfRequests = 0;
function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`N de Requisições: ${numberOfRequests}`);

  return next();
}

app.use(logRequests);
const projects = [];

//middlewares

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

//metodo get
app.get('/projects',(req,res) => {
  return res.json(projects);
  
  });

app.post('/projects',(req,res) => {
  //cria objeto
const {id, title} = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  
 projects.push(project);

return res.json(project);
});




  


  
//update



  app.put('/projects/:id',checkProjectExists,(req,res) => {
    const { id } = req.params;
    const { title } = req.body;
    
    const project = projects.find(p => p.id == id);
    project.title = title;
    
    return res.json(project);

    });





//metodo delete
    app.delete('/projects/:id',(req,res) => {
    //  const id = req.params.id;
      const id = projects.findIndex(p => p.id == id);
      projects.splice(id,1);
      return res.send();
      //return res.send();
      });


      // cmetodo post criar
  app.post('/projects/:id/tasks',checkProjectExists,(req,res) => {
    const { id } = req.params;
  const { title } = req.body;
  //obter o objeto procurando o id
    const project = projects.find(p => p.id == id);

    project.tasks.push(title);
  
  
    return res.json(project);
    });




app.listen(3000);