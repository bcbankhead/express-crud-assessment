module.exports = {

  validate: function(data){
    var errors = {};
        errors.title = '';
        errors.count = 0;


    //title validation
      if(data.title.trim() === ''){
        errors.title += 'Title cannot be blank. '
        errors.count += 1;
      };
      if(data.title.length < 3){
        errors.title += 'Title must be atleast 3 characters. '
        errors.count += 1;
      };
    //bkg validation
      if(!data.bkg){
        data.bkg = "images/default.jpg";
      } else if(data.bkg.indexOf('http') < 0){
        errors.bkg = 'Image URL should look something like \"http://website.com/images/myImage.png\"'
        errors.count += 1;
      };

    if(!data.excerpt || data.excerpt.trim() === ''){
      errors.excerpt = 'Excerpt cannot be empty.'
      errors.count += 1;
    };
    if(!data.text || data.text.trim() === ''){
      errors.text = 'Body cannot be empty.'
      errors.count += 1;
    };
    return errors;
  },
  checkData: function(data){
    console.log(data);
  }
}
