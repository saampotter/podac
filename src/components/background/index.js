import React from "react";

import { AppContext } from "../../context";

import classes from "./background.module.css";

let fetchImageSrc = function() {
  return new Promise(resolve => {
    let backgroundCache = JSON.parse(localStorage.getItem("backgroundCache"));

    if (backgroundCache) {
      if (backgroundCache.urls.custom) {
        return resolve(backgroundCache.urls.custom);
      }
    }

    fetchUnsplashImage().then(image => resolve(image.urls.custom));
  });
};

let fetchUnsplashImage = function() {
  return new Promise(resolve => {
    let w = `&w=${window.innerWidth}`;
    let h = `&h=${window.innerHeight}`;
    let url = `https://sampotter-eval-prod.apigee.net/podac?collections=3688490`;

    fetch(url + w + h)
      .then(res => res.json())
      .then(res => resolve(res));
  });
};

let cacheNextImage = function() {
  fetchUnsplashImage().then(image => {
    localStorage.setItem("backgroundCache", JSON.stringify(image));
    fetch(image.urls.custom); // save to chrome cache
  });
};

export default class Background extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    let img = new Image();
    fetchImageSrc().then(src => {
      img.src = src;

      img.onload = function() {
        document.getElementsByClassName(classes.Background)[0].src = src;
        document.getElementsByClassName(classes.Overlay)[0].style.opacity = 0;
        cacheNextImage();
      };
    });
  }

  componentDidUpdate() {
    let opacity = this.context.editMode ? 1 : 0;
    document.getElementsByClassName(classes.Overlay)[0].style.opacity = opacity;
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Overlay} />
        <img className={classes.Background} alt="" />
      </div>
    );
  }
}
