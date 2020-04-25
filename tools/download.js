const content = {
  a: 'some content'
}
const file = new Blob(
  [JSON.stringify(content)], {
    type: 'application/json'
  }
);

const fileURL = URL.createObjectURL(file);

const link = document.createElement("a");

link.setAttribute('href', fileURL);
link.setAttribute('download', 'content.json');
link.innerHTML = 'download';

// link.click();

document.body.appendChild(link);