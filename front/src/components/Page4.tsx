import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { scroller } from 'react-scroll';

const Page4: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
  const [calories, setCalories] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [allergies, setAllergies] = useState('');
  const [numberOfRecipes, setNumberOfRecipes] = useState('');
  const [custom, setCustom] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      calories: parseInt(calories, 10) || 0,
      preparationTime,
      allergies: allergies.split(',').map((allergy) => allergy.trim()),
      numberOfRecipes: parseInt(numberOfRecipes, 10) || 1,
      custom
    };

    onSubmit(data); // Pass the data to the parent component
  };

  const scrollToPrevious = () => {
    scroller.scrollTo('page3', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <Container className="container-custom">
      <Row className="text-section">
        <Col>
          <h2 style={{color:'white'}}>Enter your more detailed dietary preferences:</h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit} style={{color: 'white', fontSize: '20px'}}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="calories">
              <Form.Label>Calories number:</Form.Label>
              <Form.Control
                type="text"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="mb-3"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="preparationTime">
              <Form.Label>Preparation time:</Form.Label>
              <Form.Control
                type="text"
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
                className="mb-3"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="allergies">
              <Form.Label>Allergies list:</Form.Label>
              <Form.Control
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="mb-3"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfRecipes">
              <Form.Label>Recipes number:</Form.Label>
              <Form.Control
                type="text"
                value={numberOfRecipes}
                onChange={(e) => setNumberOfRecipes(e.target.value)}
                className="mb-3"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="custom">
              <Form.Label>Custom:</Form.Label>
              <Form.Control
                type="text"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                className="mb-3"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="navigation-buttons">
          <Col>
            <button type="button" onClick={scrollToPrevious} className="btn-custom">
              Back
            </button>
          </Col>
        </Row>
        <Row className="navigation-buttons">
          <Col>
            <button type="submit" className="btn-custom">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Page4;

