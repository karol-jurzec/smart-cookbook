import React from 'react';
import TileSelector from './TileSelector';
import kolacjaImg from '../assets/images/kolacja.jpg';
import obiadImg from '../assets/images/obiad.jpg';
import przekaskaImg from '../assets/images/przekaska.jpg';
import sniadanieImg from '../assets/images/sniadanie.jpg';
import { scroller } from 'react-scroll';

const Page1: React.FC<{ onTileSelect: (tiles: any) => void }> = ({ onTileSelect }) => {
  const tiles = [
    { id: 1, title: 'Dinner', selected: false, imageUrl: kolacjaImg },
    { id: 2, title: 'Lunch', selected: false, imageUrl: obiadImg },
    { id: 3, title: 'Snack', selected: false, imageUrl: przekaskaImg },
    { id: 4, title: 'Breakfast', selected: false, imageUrl: sniadanieImg },
  ];

  const scrollToNext = () => {
    scroller.scrollTo('page2', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
      <div className="title-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '60px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Do you want something to eat? </h2>
      </div>
      <TileSelector text="Select your dish type:" tiles={tiles} onTileSelect={onTileSelect} />
      <div className="navigation-buttons" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <button onClick={scrollToNext} className="btn btn-custom">Next</button>
      </div>
    </div>
  );
};

export default Page1;
