'use strict';

let theImages=[]; //I push the objects inside it
// let keywords = [];//I push just the keywords

function Images(image_url,title,description,keyword,horns){
  this.image_url=image_url;
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.horns=horns;
  theImages.push(this);
  // keywords.push(keyword);
}
//console.log(keywords);



myJsonFile('data/page-1.json');

let pageOne='data/page-1.json';
let pageTwo='data/page-2.json';



let pickePageTwo = () => {
  $('section').hide();
  myJsonFile(pageTwo);
};

$('#page-one').on('click', pickePageOne); //Attach a click event to the page-one (id) and call the fn
$('#page-two').on('click', pickePageTwo); //Attach a click event to the page-two (id) and call the fn


// when the user press on the buttons will come here
//the user will goes to the page depends on what he press
function pickePageOne() {
  $('section').hide(); //when he press on the button.firstly, will remove the template
  myJsonFile(pageOne); //call this function to display the json file
}



function myJsonFile (ourPages){
  $.get(ourPages)//This method for get data from page-1.json
    .then (data => {
      // console.log(data);
      data.forEach((val) => {
      // console.log(val); will give me the objects from 0 to 19
        let img= new Images(val.image_url,val.title,val.description,val.keyword,val.horns); //I create a new obj unsing constructor
        // console.log(img);
        img.render();//for feature one I want to render just these properties

      });

      renderList();
      filterTheKeyword();

    });
  // console.log(theImages);

}
myJsonFile();



Images.prototype.render=function(){
  let imgTemplate = $('#horns-template').html();
  let html = Mustache.render(imgTemplate,this);
  $('#photos-templete').append(html);

}

function renderList(){
  let allTheKeywords=[];

  theImages.forEach(val=>{
    // console.log(val.keyword);
    if(!allTheKeywords.includes(val.keyword)){
      allTheKeywords.push(val.keyword);

    }
  });

  allTheKeywords.forEach((val)=>{
    $('#cataloge').append(`<option> ${val} </option>`);


  });

}

function filterTheKeyword(){

  $('select').on('change',function(){
    $('section').hide();
    console.log(this);
    let selected = $(this).val()

    $(`.${selected}`).fadeIn();

  });
}
