import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Slider from 'react-slick';

type Tile = {
  id: number;
  title: string;
  selected: boolean;
  imageUrl: string;
};

type TileSelectorProps = {
  text: string;
  tiles: Tile[];
  onTileSelect: (selectedTiles: Tile[]) => void;
};

const TileSelector: React.FC<TileSelectorProps> = ({ text, tiles, onTileSelect }) => {
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>(tiles);

  const handleTileClick = (tileId: number) => {
    const updatedTiles = selectedTiles.map(tile =>
      tile.id === tileId ? { ...tile, selected: !tile.selected } : tile
    );
    setSelectedTiles(updatedTiles);
    onTileSelect(updatedTiles);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="p-3"> 
            <h2 style={{ color: 'white', fontSize: '50px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{text}</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Slider {...settings}>
            {selectedTiles.map(tile => (
              <div key={tile.id} className="p-2">
                <Card
                  onClick={() => handleTileClick(tile.id)}
                  className={`cursor-pointer ${tile.selected ? 'border-selected' : ''}`}
                  style={{ borderRadius: '10px', overflow: 'hidden' }}
                >
                  <Card.Img variant="top" src={tile.imageUrl} style={{ width: '500px', height: '350px' }} />
                  <Card.Body>
                    <Card.Title className="card-title">{tile.title}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </Container>
  );
};

export default TileSelector;
