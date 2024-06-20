import React from 'react';
import TileSelector from './TileSelector';

import amerykanskaImg from '../assets/images/american.jpeg';
import azjatyckaImg from '../assets/images/asian.jpeg';
import bliskowschodniaImg from '../assets/images/middle-eastern.jpeg';
import indyjskaImg from '../assets/images/indian.jpeg';
import polskaImg from '../assets/images/polish.jpeg';
import wloskaImg from '../assets/images/italian.jpeg';
import { scroller } from 'react-scroll';

const Page2: React.FC<{ onTileSelect: (tiles: any) => void }> = ({ onTileSelect }) => {

  const tiles = [
    { id: 1, title: 'American', selected: false, imageUrl: amerykanskaImg },
    { id: 2, title: 'Asian', selected: false, imageUrl: azjatyckaImg },
    { id: 3, title: 'Middle Eastern', selected: false, imageUrl: bliskowschodniaImg },
    { id: 4, title: 'Indian', selected: false, imageUrl: indyjskaImg },
    { id: 5, title: 'Polish', selected: false, imageUrl: polskaImg },
    { id: 6, title: 'Italian', selected: false, imageUrl: wloskaImg },
  ];

  const scrollToPrevious = () => {
    scroller.scrollTo('page1', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const scrollToNext = () => {
    scroller.scrollTo('page3', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div>
      <TileSelector text="Select your favourite cuisine:" tiles={tiles} onTileSelect={onTileSelect} />
      <div className="navigation-buttons">
        <button onClick={scrollToPrevious} className="btn btn-custom">Back</button>
        <button onClick={scrollToNext} className="btn btn-custom">Next</button>
      </div>
    </div>
  );
};

export default Page2;
