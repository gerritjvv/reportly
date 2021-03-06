import React from "react";

import 'react-bulma-components/dist/react-bulma-components.min.css';
import Logo from '../../logo.svg'

const header = () => {

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img alt="Logo" src={Logo} width="112" height="28"/>
                </a>

                {/*<a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"*/}
                {/*   data-target="navbarBasicExample">*/}
                {/*    <span aria-hidden="true"></span>*/}
                {/*    <span aria-hidden="true"></span>*/}
                {/*    <span aria-hidden="true"></span>*/}
                {/*</a>*/}
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a href="/" className="navbar-item">
                        Home
                    </a>

                    <a href="/" className="navbar-item">
                        Documentation
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a href="/"  className="navbar-link">
                            More
                        </a>

                        <div href="/"  className="navbar-dropdown">
                            <a href="/" className="navbar-item">
                                About
                            </a>
                            <a href="/" className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider"/>
                                <a href="/"  className="navbar-item">
                                    Report an issue
                                </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a href="/" className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a href="/" className="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default header;
