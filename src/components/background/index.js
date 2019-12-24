import React from "react";

import { AppContext } from "../../context";

import classes from "./background.module.css";

let fetchImage = function() {
  return new Promise(resolve => {
    let backgroundCache = JSON.parse(localStorage.getItem("backgroundCache"));

    if (backgroundCache) {
      if (backgroundCache.urls.custom) {
        return resolve(backgroundCache);
      }
    }

    fetchUnsplashImage().then(image => resolve(image));
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
    let img = new Image();
    fetchImage().then(image => {
      let src = image.urls.custom;

      this.context.setPhoto({
        name: image.user.name,
        name_url: image.links.html,
        location: image.location.name
      });

      img.onload = () => {
        this.refs.image.src = src;
        this.refs.overlay.style.opacity = 0;
        cacheNextImage();
      };
      img.src = src;
    });
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Overlay} ref="overlay" />
        <img ref="image" alt="" />
      </div>
    );
  }
}
