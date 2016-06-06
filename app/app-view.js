import React from "react"
import NavMenu from "./nav-menu"

if (typeof window !== 'undefined')
  require("./styles/app-view.scss")

export default class AppView extends React.Component {
  render() {
    return (
      <div id="app-view">
        <h1>webpack-react-es6-backend-scaffold</h1>
        <NavMenu />
        <hr />

        {this.props.children}

        <div className='page-footer'>
          webpack-react-es6-backend-scaffold
        </div>
      </div>
    )
  }
}
