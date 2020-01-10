import React from "react";
import c from "classnames";
import { AppContext } from "../../context";
import classes from "./modal.module.css";

export default class Modal extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    const { toggleModalOpen } = this.context;
    toggleModalOpen();

    // eslint-disable-next-line
    gsap.to(this.refs.container, 0.3, { autoAlpha: 1 });
    // eslint-disable-next-line
    gsap.fromTo(
      this.refs.modal,
      0.3,
      { delay: 0.1, autoAlpha: 0, top: 15 },
      { autoAlpha: 1, top: 0 }
    );

    window.addEventListener("keydown", this._handleKeyPress, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this._handleKeyPress, false);
  }

  _handleKeyPress = ({ key }) => (key === "Escape" ? this.close() : null);

  close = () => {
    const { toggleModalOpen } = this.context;
    toggleModalOpen();

    // eslint-disable-next-line
    gsap.to(this.refs.container, 0.3, { delay: 0.1, autoAlpha: 0 });
    // eslint-disable-next-line
    gsap.to(this.refs.modal, 0.3, { autoAlpha: 0, top: 15 });

    setTimeout(this.props.close, 300);
  };

  render() {
    return (
      <div
        ref="container"
        className={c(classes.Container, this.props.className)}
      >
        <div className={classes.Overlay} />
        <div ref="modal" className={classes.Modal} style={this.props.style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
