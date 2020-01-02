import React from "react";
import {Link} from "react-router-dom";

export const breadCrumb = (Component, crumbs) => {
    return class extends React.Component{
        render() {

            const tail = crumbs.slice(0, crumbs.length-1);
            const last = crumbs.slice(crumbs.length-1,crumbs.length)[0];

            let crumbItems;

            if(tail.length > 0 && tail[0] !== last) {
                crumbItems = tail.map( c => (<li key={c.lbl}><Link to={c.to} >{c.lbl}</Link> </li>));
            }

            crumbItems.push(<li className="is-active" key={last.lbl}><Link to={last.to}>{last.lbl}</Link></li>);

            return (
                <div>
                    <nav className="container breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            {crumbItems}
                        </ul>
                    </nav>
                    <div className="">
                        <Component {... this.props}/>
                    </div>
                </div>
            );
        }
    }
}

export const routeTo = (props) =>  {
    return (path) => {
        return () => {
            console.log("Route TO : " + path);
            props.history.push(path);
        }
    };
};
