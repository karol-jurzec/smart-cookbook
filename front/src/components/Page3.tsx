import React, { useState } from 'react';
import TileSelector from './TileSelector';

import meat from '../assets/images/meat.jpeg'
import vege from '../assets/images/vege.jpeg'
import vegan from '../assets/images/vegan.jpeg'
import keto from '../assets/images/keto.jpeg'
import paleo from '../assets/images/paleo.jpeg'
import lowcarb from '../assets/images/low-carb.jpeg'
import medi from '../assets/images/meditarenian.jpeg'


import { scroller } from 'react-scroll';

const Page3: React.FC<{ onTileSelect: (tiles: any) => void }> = ({ onTileSelect }) => {
  const tiles = [
    { id: 1, title: 'Meat-based', selected: false, imageUrl: meat},
    { id: 2, title: 'Vegetarian', selected: false, imageUrl: vege },
    { id: 3, title: 'Vegan', selected: false, imageUrl: vegan },
    { id: 4, title: 'Ketogenic', selected: false, imageUrl: keto },
    { id: 5, title: 'Paleo', selected: false, imageUrl: paleo },  
    { id: 6, title: 'Low-carb', selected: false, imageUrl: lowcarb },  
    { id: 7, title: 'Mediterranean', selected: false, imageUrl: medi} 
  ];


  const scrollToPrevious = () => {
    scroller.scrollTo('page2', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const scrollToNext = () => {
    scroller.scrollTo('page4', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div>
      <TileSelector text="Select your diet type:" tiles={tiles} onTileSelect={onTileSelect} />
      <div className="navigation-buttons">
        <button onClick={scrollToPrevious} className="btn btn-custom">Back</button>
        <button onClick={scrollToNext} className="btn btn-custom">Next</button>
      </div>
    </div>
  );
};

export default Page3;
