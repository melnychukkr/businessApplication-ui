import React from 'react';
import './App.css';
import AddForm from './cat/form/add/AddForm.js';
import CatList from './cat/list/CatList.js';
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isAddMode: true};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event) {
        // console.log(event.target.name)
        if(event.target.name === "list-cats"){
            this.setState({isAddMode: false});
        } else {
            this.setState({isAddMode: true});
        }
        // this.setState({isAddMode: true});
    }

    render() {
        
        return (
            <div>
                <Card className="text-center">
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link name="add-cat" href="#first" onClick={this.handleClick}>Add Cat</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link name="list-cats" href="#link" onClick={this.handleClick}>Available Cats</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        {this.state.isAddMode ?(<AddForm/>):<CatList/>}
                        
                    </Card.Body>
                    <Card.Footer className="text-muted">Created by Karolina Melnychuk</Card.Footer>
                </Card>
            </div>
        );
    }
}
