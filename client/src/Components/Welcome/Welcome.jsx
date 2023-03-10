import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Navbar from "../Navbar/Navbar";


const CustomToggle = ({ children, eventKey })=> {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: 'White' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const Welcome =() =>{
  return (
    
    <Accordion defaultActiveKey="1">
      <Navbar/>
      <Card>
        <Card.Header>
          <CustomToggle eventKey="0">Click me!</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Bienvenido¡ Inicia sesión
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Welcome