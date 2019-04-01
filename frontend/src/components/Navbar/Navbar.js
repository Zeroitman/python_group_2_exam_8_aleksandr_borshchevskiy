import React, {Component, Fragment} from 'react'
import {NavLink} from "react-router-dom";


class Navbar extends Component {
    state = {
        collapse: true
    };

    toggle = () => {
        this.setState({collapse: !this.state.collapse});
    };

    render() {
        return <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="container">
                    <NavLink to='/' className="navbar-brand"> Canban-доска</NavLink>
                    <button onClick={this.toggle} className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={(this.state.collapse ? "collapse" : "") + " navbar-collapse"}
                         id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to='/tasks/add' className="nav-link"> Добавить задачу</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
         </Fragment>
    }
}

export default Navbar;