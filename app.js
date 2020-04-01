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

//   $('#page-one').on('click', pickePageOne); //Attach a click event to the page-one (id) and call the fn
//   $('#page-two').on('click', pickePageTwo); //Attach a click event to the page-two (id) and call the fn


//   let pageOne=$.get('./data/page-1.json');
//   let pageTwo=$.get('./data/page-2.json');

//   // when the user press on the buttons will come here
//   //the user will goes to the page depends on what he press
//   let pickePageOne= () => {

//     $('section').hide(); //when he press on the button.firstly, will remove the template
//     getJsonPage(pageOne); //call this function to display the json file
//   };

//   let pickePageTwo = () => {
//     $('section').hide();
//     getJsonPage(pageTwo);
//   };


const jsonFile = () => {
  $.get('./data/page-1.json')//This method for get data from page-1.json
    .then (data => {
      console.log(data);
      data.forEach((val) => {
      // console.log(val); will give me the objects from 0 to 19

        let img= new Images(val.image_url,val.title,val.description,val.keyword,val.horns); //I create a new obj unsing constructor
        //console.log(img);
        img.render();//for feature one I want to render just these properties

      });

      renderList();
      filterTheKeyword();

    });
// console.log(theImages);
};

jsonFile();


//   function getJsonPage(ourPages){ //this function for the two pages

//     $.get(ourPages)//This method for get data from page-1.json
//       .then (data => {
//         data.forEach((val) => {
//           // console.log(val); will give me the objects from 0 to 19

//           let img= new Images(val.image_url,val.title,val.description,val.keyword,val.horns); //I create a new obj unsing constructor
//           //console.log(img);
//           img.renderImage();//for feature one I want to render just these properties

//         });

//         renderList();
//         filterTheKeyword();
//       });



Images.prototype.render=function(){
  let imgTemplate = $('horns-template');
  var html = Mustache.render(imgTemplate,this);
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




