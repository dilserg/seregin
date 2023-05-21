const input = document.querySelector('#fileInput');
const inputTitle = document.querySelector('#inputTitle');
const result = document.querySelector('#result');
const spinner = document.querySelector('#spinner');
let file = null;

function makeNode(title, i) {
  return `<div>
  <div class="item">
    <div>
      ${title}
    </div>
    <label class="custom-checkbox">
      <input type="checkbox" checked value="value-${i}">
      <span></span>
    </label>
  </div>
  <hr />
</div>`;
}

async function myFetch(url, body) {
  result.classList.add('hidden');
  spinner.classList.remove('hidden');
  const data = new FormData();
  data.append('file', body.file);
  let response = await (
    await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'X-CSRFToken': csrftoken,
      },
    })
  ).json();
  spinner.classList.add('hidden');
  result.classList.remove('hidden');
  return response;
}

async function onFileChange(e) {
  if (e.target.files.length) {
    file = e.target.files[0];
    const response = await myFetch('/predict/', {
      file,
    });

    // inputTitle.innerHTML = 'Сменить файл';
    // const innerHTML = response.results.map(makeNode);
    // console.log(innerHTML);
    // result.innerHTML = response.results.map(makeNode);
  }
}

input.addEventListener('change', onFileChange);
