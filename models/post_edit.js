var tinymceOptions={
  selector: 'textarea',
  height: 200,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
  ],
  toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
  toolbar2: 'forecolor backcolor emoticons | link image',
  valid_elements:"*[*]",
  images_upload_url: 'postAcceptor.php',
  images_upload_base_path: '/some/basepath',
  images_upload_credentials: true,
  images_upload_handler: function (blobInfo, success, failure) {
    var xhr, formData;
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', 'postAcceptor.php');
    xhr.onload = function() {
      var json;

      if (xhr.status != 200) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }
      json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }
      success(json.location);
    };
    formData = new FormData();
    formData.append('file', blobInfo.blob(), fileName(blobInfo));
    xhr.send(formData);
  },
  image_title: true, 
  // enable automatic uploads of images represented by blob or data URIs
  automatic_uploads: true,
  // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
  images_upload_url: 'postAcceptor.php',
  // here we add custom filepicker only to Image dialog
  file_picker_types: 'image', 
  // and here's our custom image picker
  file_picker_callback: function(cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    // Note: In modern browsers input[type="file"] is functional without 
    // even adding it to the DOM, but that might not be the case in some older
    // or quirky browsers like IE, so you might want to add it to the DOM
    // just in case, and visually hide it. And do not forget do remove it
    // once you do not need it anymore.

    input.onchange = function() {
      var file = this.files[0];
      
      // Note: Now we need to register the blob in TinyMCEs image blob
      // registry. In the next release this part hopefully won't be
      // necessary, as we are looking to handle it internally.
      var id = 'blobid' + (new Date()).getTime();
      var blobCache = tinymce.activeEditor.editorUpload.blobCache;
      var blobInfo = blobCache.create(id, file);
      blobCache.add(blobInfo);
      
      // call the callback and populate the Title field with the file name
      cb(blobInfo.blobUri(), { title: file.name });
    };
    
    input.click();
  }
};

Vue.component("vue-tinymce",{
  template:"<textarea>{{value}}</textarea>",
  props:["value","options"],
  mounted:function(){
    var vm=this,
       options=$.extend(true, {}, tinymceOptions); // use jquery temporary
    
    // make an deep copy of options;should not modify tinymceOptions
    options.selector=undefined;
    options.target=vm.$el; // use options.target instand of options.selector
    var oldSetup=options.setup||function(){};
    
    options.setup=function(editor){
      console.log("setup");
      
      //Decorate origni one
      oldSetup(editor);
      
      // Bind keyup
      editor.on("keyup",function(e){
        // update model value;
        var value=editor.getContent();
        // Dom to model,this was a problem,when input in editor ? it will focus in the first line first word;
        vm.$emit("input",value); // who recieve this event?
      });
      
      editor.on("blur",function(){
        vm.allowSetContent=true;
      });
      
      editor.on("focus",function(){
         vm.allowSetContent=false;
      })
    };
    
    tinymce.init(options).then(function(editors){
      vm.editor=editors[0];
    })
  },
  watch:{
    value:function(content)
    {
      if(this.editor&&this.allowSetContent)
      {
        // setContent will let editor focus in first line and first world
        this.editor.setContent(content);
      }
    }
  }
});

var vm=new Vue({
  el:"#textedit",
  data:{
    content:"Edit your post here",
    tinymceOptions:tinymceOptions
   }
});