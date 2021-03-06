import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeadBlock } from '../../HeadBlock';
import { RecipesFormat } from './RecipesFormat';

const ConditionalSearchResult = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (location.state){
      setRecipes(location.state.recipes);
    }
  }, [])
  return (
    <>
      <HeadBlock title={"条件を絞って検索"}/>
      <RecipesFormat sectionTitle={"条件に一致する検索結果一覧"} recipes={recipes}/>
    </>
  );
};

export default ConditionalSearchResult;
