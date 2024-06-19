import React, { useState, useEffect } from 'react';
import { Element, scroller } from 'react-scroll';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Page5 from './components/Page5';
import './index.css';

const App: React.FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const isStateCleared = localStorage.getItem('isStateCleared');
    if (!isStateCleared) {
      localStorage.clear();
      localStorage.setItem('isStateCleared', 'true');
    }
  }, []);
  
  useEffect(() => {
    const appState = { formData, recipes };
    localStorage.setItem('appState', JSON.stringify(appState));
  }, [formData, recipes]);

  useEffect(() => {
    if (formData.page4) {
      handleSubmit();
    }
  }, [formData.page4]);

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTileSelect = (page: string, tiles: any) => {
    setFormData(prevData => ({
      ...prevData,
      [page]: tiles,
    }));
  };

  const handleFormSubmit = (data: any) => {
    setFormData(prevData => ({
      ...prevData,
      page4: data,
    }));
  };


  const transformFormData = (data: any) => {
    const page1Selected = data.page1?.find((tile: any) => tile.selected)?.title.toLowerCase() || '';
    const page2Selected = data.page2?.filter((tile: any) => tile.selected).map((tile: any) => tile.title) || [];
    const page3Selected = data.page3?.filter((tile: any) => tile.selected).map((tile: any) => tile.title) || [];
    const page4Data = data.page4 || {};

    return {
      cuisine_type: page2Selected,
      dish_type: page1Selected,
      allergies: page4Data.allergies || [],
      number_of_recipes: page4Data.numberOfRecipes || 1,
      calories: page4Data.calories || 0,
      diet: page3Selected || [],
      max_preparation_time: page4Data.preparationTime || '60 min',
      custom: page4Data.custom || '',
    };
  };

  const handleSubmit = async () => {
    const transformedData = transformFormData(formData);
    console.log(JSON.stringify(transformedData));
    try {
      const response = await fetch('http://localhost:4000/api/recipes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (response.ok) {
        const result = await response.json();
        setRecipes(result.data);
        scrollToPage('page5');
      } else {
        console.error('Failed to generate recipes');
      }
    } catch (error) {
      console.error('Error while generating recipes:', error);
    }
  };

  const handleGenerateAgain = () => {
    const recipeNames = recipes.map(recipe => recipe.name).join(', ');
    setFormData(prevData => ({
      ...prevData,
      page4: {
        ...prevData.page4,
        custom: `${prevData.page4.custom || ''} + Don't create the same recipes as: ${recipeNames}`,
      },
    }));
    handleSubmit();
  };


  const handleExportPDF = () => {
    if (selectedRecipe) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Recipe PDF</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { text-align: center; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 5px; }
                ol { padding-left: 20px; }
              </style>
            </head>
            <body>
              <h1>${selectedRecipe.name}</h1>
              <h3>Ingredients:</h3>
              <ul>
                ${selectedRecipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
              <h3>Instructions:</h3>
              <ol>
                ${selectedRecipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
              </ol>
              ${selectedRecipe.change_desc ? `<h3>Change Description:</h3><p>${selectedRecipe.change_desc}</p>` : ''}
              <p><strong>Calories:</strong> ${selectedRecipe.calories}</p>
              <p><strong>Preparation Time:</strong> ${selectedRecipe.execution_time}</p>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleUpdateRecipe = async (recipe: Recipe, updateInfo: string) => {
    const updatedRecipeData = {
      recipe: JSON.stringify(recipe) || '',
      instructions: updateInfo || '',
    };

    try {
      const response = await fetch('http://localhost:4000/api/recipes/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipeData),
      });

      if (response.ok) {
        const updatedRecipe = await response.json();
        console.log('Recipe updated successfully', updatedRecipe);

        const { change_desc, ...updatedRecipeData } = updatedRecipe.data;

        const recipeIndex = recipes.findIndex(r => r.name === recipe.name);

        if (recipeIndex !== -1) {
          const updatedRecipes = [...recipes];
          updatedRecipes[recipeIndex] = { 
            ...recipes[recipeIndex], 
            ...updatedRecipeData,
            change_desc
          };

          setRecipes(updatedRecipes);
          console.log(updatedRecipes);

          setSelectedRecipe(updatedRecipes[recipeIndex]);
        }
      } else {
        console.error('Failed to update recipe');
      }
    } catch (error) {
      console.error('Error while updating recipe:', error);
    }
  };

  const scrollToPage = (page: string) => {
    scroller.scrollTo(page, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div>
      <Element name="page1" className="element">
        <Page1 onTileSelect={(tiles) => handleTileSelect('page1', tiles)} />
      </Element>
      <Element name="page2" className="element">
        <Page2 onTileSelect={(tiles) => handleTileSelect('page2', tiles)} />
      </Element>
      <Element name="page3" className="element">
        <Page3 onTileSelect={(tiles) => handleTileSelect('page3', tiles)} />
      </Element>
      <Element name="page4" className="element">
        <Page4 onSubmit={handleFormSubmit} />
      </Element>
      <Element name="page5" className="element">
        <Page5
          recipes={recipes}
          onGenerateAgain={handleGenerateAgain}
          onExportPDF={handleExportPDF}
          onUpdateRecipe={handleUpdateRecipe}
          selectedRecipe={selectedRecipe}
          setSelectedRecipe={setSelectedRecipe}
        />
      </Element>
      <div className="navigation-buttons">
        <button onClick={() => scrollToPage('page1')} className="btn btn-custom">Page 1</button>
        <button onClick={() => scrollToPage('page2')} className="btn btn-custom">Page 2</button>
        <button onClick={() => scrollToPage('page3')} className="btn btn-custom">Page 3</button>
        <button onClick={() => scrollToPage('page4')} className="btn btn-custom">Page 4</button>
      </div>
    </div>
  );
};

export default App;
