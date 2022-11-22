const info = (() => {
  const show = (data) => {
    if (!data) {
      return hide();
    }

    const noun = data.total === 1 ? "aliĝinto" : "aliĝintoj";
    const title = `${data.total} ${noun} de ${data.country}`;

    document.querySelector(".info").innerText = title;
    document.querySelector(".info").style.display = "block";
  };

  const hide = (e) => {
    document.querySelector(".info").style.display = "none";

    if (e) {
      e.preventDefault();
    }
  };

  const init = () => {
    document.querySelector(".info").addEventListener("click", hide);
  };

  return {
    init,
    show,
    hide,
  };
})();
