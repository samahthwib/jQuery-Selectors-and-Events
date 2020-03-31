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


$.get('./data/page-1.json')//This method for get data from page-1.json
  .then (data => {
    console.log(data);
    data.forEach((val) => {
      // console.log(val); will give me the objects from 0 to 19

      let img= new Images(val.image_url,val.title,val.description,val.keyword,val.horns); //I create a new obj unsing constructor
      //console.log(img);
      img.renderImage();//for feature one I want to render just these properties

    });

    renderList();
    filterTheKeyword();
    //this iteration for the list
    // keywords.forEach((value) => {

    //   let listClone = $('option').clone();

    //   listClone.find('value').attr(value);
    //   listClone.text(value);
    //   console.log(listClone);
    //   $('select').append(listClone[0]); //when I try it gave me this exception:Maximum call stack size exceeded
    // });

  });
// console.log(theImages);

Images.prototype.renderImage=function(){
  let imgClone = $('#photos-templete').clone();
  //console.log(imgClone.html());

  imgClone.find('h2').text(this.title);//here i use find method to find h2 tag then return the content
  imgClone.find('img').attr('src', this.image_url);
  imgClone.find('p').text(this.description);
  imgClone.attr('class', this.keyword);
  $('#container').append(imgClone);//I should append it to the parent
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

    // $(`.${selected}`).fadeIn();

    theImages.forEach(val=>{
      if(val.keyword === selected){
        $(`section[class='${selected}']`).fadeIn();
      }

    })
  });
}
