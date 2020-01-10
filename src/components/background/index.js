import React from "react";
import { AppContext } from "../../context";
import classes from "./background.module.css";

let fetchImage = function() {
  return new Promise(resolve => {
    let backgroundCache = JSON.parse(localStorage.getItem("backgroundCache"));

    if (backgroundCache) {
      if (backgroundCache.urls.custom) {
        let url = backgroundCache.urls.custom;
        let params = url.split("&");

        for (let i = 0; i < params.length; i++) {
          const param = params[i];

          if (param.startsWith("w=")) {
            let w = parseInt(param.substring(2, param.length));
            if (w !== window.innerWidth) {
              return fetchUnsplashImage().then(image => resolve(image));
            }
          }

          if (param.startsWith("h=")) {
            let h = parseInt(param.substring(2, param.length));
            if (h !== window.innerHeight) {
              return fetchUnsplashImage().then(image => resolve(image));
            }
          }
        }

        return resolve(backgroundCache);
      }
    }

    return fetchUnsplashImage().then(image => resolve(image));
  });
};

let fetchUnsplashImage = function() {
  let w = `&w=${window.innerWidth}`;
  let h = `&h=${window.innerHeight}`;
  let url = `https://sampotter-eval-prod.apigee.net/podac?collections=3688490`;

  return fetch(url + w + h).then(res => res.json());
};

let cacheNextImage = function() {
  fetchUnsplashImage().then(image => {
    localStorage.setItem("backgroundCache", JSON.stringify(image));
    fetch(image.urls.custom); // save to chrome cache
  });
};

export default class Background extends React.Component {
  static contextType = AppContext;

  componentDidMount = () => {
    const { setPhoto } = this.context;

    let img = new Image();
    fetchImage().then(unsplash => {
      let src = unsplash.urls.custom;

      setPhoto({
        name: unsplash.user.name,
        name_url: unsplash.links.html,
        location: unsplash.location.name
      });

      img.onload = () => {
        this.refs.image.src = src;
        this.refs.overlay.style.opacity = 0;
        cacheNextImage();
      };
      img.src = src;
    });
  };

  componentDidUpdate() {
    const { editMode } = this.context;
    const opacity = editMode ? 0 : 1;
    // eslint-disable-next-line
    gsap.to(this.refs.image, 0.2, { opacity });
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Overlay} ref="overlay" />
        <img className={classes.Image} ref="image" alt="" />
      </div>
    );
  }
}
