const api = (() => {
  let cached = null;

  const fetchData = () => {
    if (cached) {
      return Promise.resolve(cached);
    }

    const url =
      "https://ujghhtwj5ivbbhe3v52wf6afha0zehtq.lambda-url.eu-west-2.on.aws";

    return (
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cached = data;
          return data;
        })
        // .then(parse)
        .catch(() => {
          throw {
            msg: "Io fuŝiĝis dum ni ŝargis la datumon.",
          };
        })
    );
  };

  return {
    fetchData,
  };
})();
