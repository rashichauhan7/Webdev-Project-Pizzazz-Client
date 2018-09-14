import React from "react";
import ReactBubbleChart from "react-d3-bubbles";
import UserService from "../services/UserService";
import $ from "jquery";
const center = {
    x: 700,
    y: 380
}
export default class Dashboard extends React.Component {
    constructor(props)
    {
        super(props);
        this.state =
            {
                data: [],
                cssLoaded: false,
                colors: [ "#f48fb1", "#ffab91", "#b87fe9", "#64b5f6", "#81c784","#f48fb1"]
            };
        this.userService = UserService.instance;
    }

    componentDidMount()
    {
        $('.sidebar').css('visibility','hidden');
        $('.logo1').css('visibility','hidden');
        var k = 0, currentuser;
        this.userService.findCurrentUser().then(user => { currentuser = user.username;
        this.userService.findAllUsers()
            .then((users) => {
                var d = users.map((user) =>
                {
                    var color;
                    if(user.username.localeCompare(currentuser) == 0)
                        color = 'black';
                    else
                        color = this.state.colors[k];

                        var u =
                            {
                                index: user.id,
                                name: user.username,
                                color: color,
                                radius: 50,
                                tooltip: 'click me',
                                link: "/profiles/" +user.id

                            };
                        k = (k + 1)% 6;
                        return u;
                });
                this.setState({data: d});
                this.render();
            });
        });
    }

    componentWillUnmount() {
        if (this.props.history !== undefined && this.props.history.action === 'POP') {
            window.location.reload();
        }
    }

    render() {
        if (this.state.cssLoaded === false) {
            this.state.cssLoaded = true;
            import('../css/Bubbles.css');
        }
        if(this.state.data.length > 0) {
        return (
            <div className="bubbles">
                <ReactBubbleChart data={this.state.data} height={1000} width={'100%'} center={center} />
            </div>
        );}
        else
            return <div>users</div>
    }
}