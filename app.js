const app = (() => {
  const setStat = (id, value) => {
    document.querySelector(`#${id}`).innerText = value;
  };

  const render = () => {
    showMessage("Ŝargante aliĝintojn...");

    api
      .fetchData()
      .then((data) => {
        setStat("stat-homoj", data.total);
        setStat("stat-kasxitaj", data.hidden);
        setStat("stat-landoj", data.countriesTotal);
        setStat("stat-plej", data.mostFromName);
        setStat("stat-plej-value", data.mostFromTotal);
        return map.render(".content .map", getWindowWidth(), data, info.show);
      })
      .then(hideMessage)
      .catch((err) => {
        console.error(err);
        showError(err.msg);
      });
  };

  return {
    render,
  };
})();

onReady(() => {
  info.init();
  app.render();
  window.addEventListener("resize", debounce(app.render, 500));
});
