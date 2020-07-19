const Controller = require('./Controller');

class HomeController extends Controller {
    constructor(request, response){
        super(request, response)
    }

    index(){
       return this.response.render('index',{
           title:'my first express app with nodemon'
       })
    }
    
    json(){
       return this.response.json({name:'jose'})
    }
}

module.exports = HomeController