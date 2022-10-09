import { Component } from "react";
import { fromEvent } from "rxjs";
import { map, filter } from "rxjs/operators";

let users = [
  { value: "", label: "---" },
  { value: "Nitesh", label: "Nitesh" },
  { value: "Madhav", label: "Madhav" },
  { value: "Pralay", label: "Pralay" },
  { value: "Somnath", label: "Somnath" }
];

const filterStream = fromEvent(document, "change").pipe(
  filter((e) => e.target.value !== ""),
  map((e) => e.target.value)
);

class RxjsDropdown extends Component {
    constructor() {
        super();
        this.state = {
            prevOption: " ",
            selectedOption: " ",
            allOption: " "
        };
    }

    componentDidMount() {
        this.subscription = filterStream.subscribe({
            next: (x) => {
                this.setState({prevOption: this.state.selectedOption})
                this.setState({ selectedOption: x });
                //this.setState({ allOption: this.state.selectedOption + " " + this.state.allOption });
                this.setState({ allOption: x + " " + this.state.allOption });
            },
            error: (err) => console.error("Observer got an error: " + err),
            complete: () => console.log("Observer got a complete notification")
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <div className="App">
                <select id="dropdown">
                    {users.map((user) => (
                    <option
                        key={user.value}
                        value={user.value}
                        label={user.label}
                    ></option>
                    ))}
                </select>
                <p>Previous Option: {this.state.prevOption}</p>
                <p>Selected Option is : {this.state.selectedOption}</p>
                <p>All Option: {this.state.allOption}</p>
            </div>
        );
    }
}

export default RxjsDropdown;