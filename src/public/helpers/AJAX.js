export default ({ path, success, error }) => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", path);

  xhr.addEventListener("readystatechange", ({ target }) => {
    if (target.readyState !== 4) return;

    if (target.status !== 200) error(target);
    else success(target.responseText);
  });

  xhr.send();
};
