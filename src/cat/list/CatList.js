import React from 'react';
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ndjsonStream from "can-ndjson-stream";


export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {catList: []};
        this.deleteCat = this.deleteCat.bind(this);
    }
    
    deleteCat(id) {
        console.log(`Remove cat with id ${id}`);
        fetch(`http://localhost:8080/cat/${id}`, {method: 'DELETE'})
            .then(() => {
                console.log(`removed cat with id ${id}`);
            }).catch(err => {
            console.error(err)
        });

        const catsWithoutDeletedOne = this.state.catList.filter(function( obj ) {
            return obj.id !== id;
        });

        this.setState({
            catList: catsWithoutDeletedOne
        });
    }

    render() {
        return (
            <div>
                <CardColumns>
                {this.state.catList
                    .map((cat, index) =>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{cat.name}</Card.Title>
                                <Card.Text>
                                    <li>The cat is a {cat.age.toLowerCase()}</li>
                                    <li>{cat.coatColor.charAt(0).toUpperCase() + cat.coatColor.slice(1).toLowerCase().replace("_", " ")} coat color</li>
                                    <li>{cat.coatType.charAt(0).toUpperCase() + cat.coatType.slice(1).toLowerCase().replace("_", " ")} coat type</li>
                                    <li>{cat.requiresTreatment?'Requires':'Doesn\'t require'} threatment </li>
                                    <li>{cat.isUsesCuvette?'Uses':'Doesn\'t use'} cuvette </li>
                                </Card.Text>
                                <Button variant="primary" onClick={() => this.deleteCat(cat.id)}>Remove</Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated {cat.timestamp}</small>
                            </Card.Footer>
                        </Card>
                    )
                }
                </CardColumns>
            </div>
        );
    }
    
    

    componentDidMount() {
        const fetchNdjson = async () => {
            const response = await fetch('http://localhost:8080/cat');
            const exampleReader = ndjsonStream(response.body).getReader();

            let result;
            while (!result || !result.done) {
                result = await exampleReader.read();

                if (typeof result.value !== 'undefined') {
                    console.log(result.value)
                    this.setState({catList: [...this.state.catList, result.value]})
                }
            }
        };

        fetchNdjson();
    }
}
