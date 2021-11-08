import React, { useEffect, useState } from 'react'
import axios from 'axios';

import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }) => {
  // optionType is 'scoops' or 'toppings'
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
    .then((response) => setItems(response.data))
    .catch((error) => {
      // TODO: handle error here
    })
  }, [optionType]);

  // TODO: replace 'null' with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent 
      key={item.name} 
      name={item.name} 
      imagePath={item.imagePath} 
    />
  ));

  return (
    <div>
      {optionItems}
    </div>
  )
}

export default Options
