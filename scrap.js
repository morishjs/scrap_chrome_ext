const submit = document.querySelector('#submit');
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

let quill = new Quill('#editor', {
  modules: {
    syntax: true,
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

submit.addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const token_obj = JSON.parse(localStorage.getItem('jspark_token')) || {};
  const token = token_obj.token;

  if(!token) {
    alert("Token does not exist!");
    return;
  }

  const data = JSON.stringify({
    title,
    token,
    content: JSON.stringify(quill.getContents()),
    category_name: document.querySelector('#category_name').value || 'None'
  });

  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      window.close();
    }
  });

  xhr.open("POST", "http://jspark.me/api/v1/posts");
  xhr.setRequestHeader("Authorization", token);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Cache-Control", "no-cache");

  xhr.send(data);
});