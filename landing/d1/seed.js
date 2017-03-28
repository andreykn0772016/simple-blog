var mongoose = require("mongoose");
var working = require("./models/works");
var comment = require("./models/comment");

var data = [
    {
        name:"Новый пост",
        image:"http://www.strou-dom.net/image/Fasad/batarei-solnechnye-dlia-doma.jpg",
        description:"Чтобы построить свой загородный дом с комфортной и располагающей атмосферой, надежно защищающей вас от внешних неблагоприятных воздействий, стрессов и проблем, следует запастись необходимыми знаниями о строительстве. Наши статьи о строительстве дома помогут вам разобраться во многих возникших вопросах и придадут силы и уверенность во время производства строительных работ."
    },
    {
        name:"САЛАТ С МАКАРОНАМИ И КРАБОВЫМИ ПАЛОЧКАМИ",
        image:"http://pyrex.in.ua/photos/4076_.jpg",
        description:"Предлагаю приготовить простой и вкусный салат с макаронами и крабовыми палочками. Такой салат отлично подойдёт для завтрака или ужина как самостоятельное блюдо. Макаронные изделия лучше выбирать мелкие твёрдых сортов. Готовится салатик быстро и не требует особых навыков."
    },
    {
        name:"МАРИНАД ДЛЯ ШАШЛЫКА С СОЕВЫМ СОУСОМ",
        image:"http://freelance.ru/img/portfolio/pics/00/07/26/468531.jpg",
        description:"Маринад для шашлыка с соевым соусом и томатным соком я увидела в блоге Сталика, автора популярных кулинарных книг и известного мастера на тему шашлыков. Такой соевый маринад рекомендуется для свинины и для куриного мяса. Правда, томатный сок в идеале готовится из свежих томатов, а у меня использовался готовый покупной сок."
    }
];

function seedDB(){
//remove all works
    working.remove({}, function(err){
        if(err){
            console.log("ERROR");
        }else {
            console.log("removed works");
        }
        data.forEach(function(seed){
        working.create(seed, function(err, working){
            if(err){
                console.log(err);
            }else {
                console.log("Добавлена статья");
                //create comment
                comment.create({
                    text:"New comet",
                    author:"Andrey"
                }, function(err, comment){
                    if(err){
                        console.log("ERROR");
                    }else {working.comments.push(comment);
                        working.save();
                        console.log("edede");

                    }

                });

            }

        });
    });
});


//add comments

}
module.exports = seedDB;


