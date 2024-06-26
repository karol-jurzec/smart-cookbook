import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Slider from 'react-slick';
import LoadingButton from './LoadingButton';

interface Page5Props {
  recipes: Recipe[];
  onGenerateAgain: () => void;
  onExportPDF: () => void;
  onUpdateRecipe: (recipe: Recipe, updatedIngredients: string) => void;
  selectedRecipe: Recipe | null;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  isLoading: boolean;
}

const Page5: React.FC<Page5Props> = ({ recipes, onGenerateAgain, onExportPDF, onUpdateRecipe, selectedRecipe, setSelectedRecipe, isLoading }) => {
  const [updatedIngredients, setUpdatedIngredients] = useState('');

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  if (!recipes || recipes.length === 0) {
    return (
      <Container className="container-custom">
        <Row>
          <Col>
            <h2 className="my-4">Recipes found:</h2>
            <p>No recipes available. Please generate recipes.</p>
            <LoadingButton onClick={onGenerateAgain} isLoading={isLoading} className="d-block mx-auto btn-custom">
              Generate Again
            </LoadingButton>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="container-custom">
      {!selectedRecipe && (
        <>
          <Row className="justify-content-between align-items-center mb-3">
            <Col>
              <h2 style={{color:'white'}}className="my-4">Recipes found:</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Slider {...settings}>
                {recipes.map((recipe, index) => (
                  <div key={index} className="p-2">
                    <Card
                      className="recipe-tile"
                      onClick={() => handleRecipeSelect(recipe)}
                      style={{ height: '200px', width: '400px', borderRadius: '10px' }}
                    >
                      <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Text>
                          <strong>Preparation Time:</strong> {recipe.execution_time}<br />
                          <strong>Calories:</strong> {recipe.calories}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <LoadingButton onClick={onGenerateAgain} isLoading={isLoading} className="btn-custom">
                Generate Again
              </LoadingButton>
            </Col>
          </Row>
        </>
      )}
      {selectedRecipe && (
        <>
          <Row>
            <Col>
              <Card className="recipe-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title>{selectedRecipe.name}</Card.Title>
                    <Button variant="primary" onClick={onExportPDF}>
                      Export to PDF
                    </Button>
                  </div>
                  <Card.Text>
                    <strong>Ingredients:</strong>
                    <ul>
                      {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <strong>Instructions:</strong>
                    <ol>
                      {selectedRecipe.instructions.map((instruction: string, index: number) => (
                        <li key={index}>{instruction.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                    {selectedRecipe.change_desc && (
                    <p><strong>Change Description:</strong> {selectedRecipe.change_desc}</p>
                  )}
                    <p>Calories: {selectedRecipe.calories}</p>
                    <p>Preparation Time: {selectedRecipe.execution_time}</p>
                  </Card.Text>
                  <Button variant="primary" onClick={handleBackToList}>
                    Back to Recipes
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <input
                type="text"
                value={updatedIngredients}
                onChange={(e) => setUpdatedIngredients(e.target.value)}
                placeholder="Give feedback..."
                className="form-control mb-2"
              />
              <LoadingButton
                onClick={() => onUpdateRecipe(selectedRecipe, updatedIngredients)}
                isLoading={isLoading}
                className="mt-3 mb-3 btn-custom"
              >
                Update Recipe
              </LoadingButton>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Page5;
