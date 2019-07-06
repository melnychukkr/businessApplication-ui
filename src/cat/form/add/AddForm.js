import React from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ndjsonStream from 'can-ndjson-stream'

function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            name: '',
            coatColor: 'BLACK',
            coatType: 'BOLD',
            age: 'KITTEN',
            requiresTreatment: false,
            isUsesCuvette: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        console.log(event.target.name);
        console.log(event.target.type);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Start sending:');
        const data = { 
            name:this.state.name,
            coatColor:this.state.coatColor,
            coatType:this.state.coatType,
            age:this.state.age,
            requiresTreatment:this.state.requiresTreatment,
            isUsesCuvette:this.state.isUsesCuvette
        };
        console.log(data);
        fetch('http://localhost:8080/cat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        event.preventDefault();
    }

    handleClick() {
        this.setState({isLoading: true}, () => {
            simulateNetworkRequest().then(() => {
                this.setState({isLoading: false});
            });
        });
    }

    render() {
        const {isLoading} = this.state;

        return (
            <div>
                <Container style={{marginTop: "1em"}}>

                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="name-input">Name</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        name="name"
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>
                                <Form.Group controlId="formCoatColor">
                                    <Form.Label>Pick coat color</Form.Label>
                                    <Form.Control as="select" name="coatColor" value={this.state.coatColor}
                                                  onChange={this.handleChange}>
                                        <option value="BLACK">Black</option>
                                        <option value="GRAY">Gray</option>
                                        <option value="BLUE_GRAY">Blue Gray</option>
                                        <option value="WHITE">White</option>
                                        <option value="GINGER">Ginger</option>
                                        <option value="CREAM">Cream</option>
                                        <option value="BROWN">Brown</option>
                                        <option value="CINNAMON">Cinnamon</option>
                                        <option value="FAWN">Fawn</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formPetsAge">
                                    <Form.Label>Pick pet's age</Form.Label>
                                    <Form.Control as="select" name="age" value={this.state.age}
                                                  onChange={this.handleChange}>
                                        <option value="KITTEN">Kitten</option>
                                        <option value="TEEN">Teen</option>
                                        <option value="ADULT">Adult</option>
                                        <option value="SENIOR">Senior</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formCoatType">
                                    <Form.Label>Pick coat type</Form.Label>
                                    <Form.Control as="select" name="coatType" value={this.state.coatType} onChange={this.handleChange}>
                                        <option value="BOLD">Bold</option>
                                        <option value="LONG_HEARD">Long haired</option>
                                        <option value="SHORT_HEARD">Short haired</option>
                                    </Form.Control>
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formRequiresTreatment">
                                            <Form.Check name="requiresTreatment"
                                                        type="checkbox"
                                                        checked={this.state.requiresTreatment}
                                                        onChange={this.handleChange}
                                                        label="Requires treatment?"/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formIsUsesCuvette">
                                            <Form.Check name="isUsesCuvette"
                                                        type="checkbox"
                                                        checked={this.state.isUsesCuvette}
                                                        onChange={this.handleChange}
                                                        label="Uses cuvette?"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="outline-success"
                                        type="submit"
                                        size="lg"
                                        disabled={isLoading}
                                        onClick={!isLoading ? this.handleClick && this.handleSubmit : null}>
                                    {isLoading ? 'Loading…' : 'Submit form'}
                                </Button>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
