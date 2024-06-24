import React from "react";
import { Form, Button, Nav } from "react-bootstrap";
import DatePicker from "react-datepicker";

function CustomComponent({ data }) {
  // const [selectedDate, setSelectedDate] = React.useState(null);
  // const [selectedColor, setSelectedColor] = React.useState("#000000");
  // const [selectedOption, setSelectedOption] = React.useState("");

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  // const handleColorChange = (event) => {
  //   setSelectedColor(event.target.value);
  // };

  const data = [
    {
      value: "feild",
      label: "FEILD",
    },
  ];
  return (
    <div>
      <div>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Dropdown:</Form.Label>
          {data?.map((item) => (
            <Form.Select aria-label="Dropdown">
              <option value={item.value}>{item.label}</option>
            </Form.Select>
          ))}
        </Form.Group>
      </div>
{/* 
      <div>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Textarea:</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </div>

      <div>
        <Form.Check type="checkbox" id="checkbox">
          <Form.Check.Input type="checkbox" id="checkbox" />
          <Form.Check.Label htmlFor="checkbox">Checkbox</Form.Check.Label>
        </Form.Check>
      </div>

      <div>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Input:</Form.Label>
          <Form.Control type="text" id="input" />
        </Form.Group>
      </div>

      <div>
        <Form.Group controlId="exampleForm.ControlNumber">
          <Form.Label>Number:</Form.Label>
          <Form.Control type="number" id="number" />
        </Form.Group>
      </div>

      <div>
        <Button variant="primary">Click me</Button>
      </div>

      <div>
        <Form.Group controlId="exampleForm.ControlSelectMultiple">
          <Form.Label>Multiselect:</Form.Label>
          <Form.Select multiple>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Form.Select>
        </Form.Group>
      </div>

      <div>
        <label htmlFor="datepicker">Datepicker:</label>
        <DatePicker
          id="datepicker"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div>
        <Form.Group controlId="formColor">
          <Form.Label>Color Picker:</Form.Label>
          <Form.Control
            type="color"
            id="colorpicker"
            value={selectedColor}
            onChange={handleColorChange}
          />
        </Form.Group>
      </div>

      <div>
        <Form.Group controlId="formRadio">
          <Form.Label>Radio Buttons:</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="radio1"
              name="radio"
              label="Radio 1"
              value="radio1"
              checked={selectedOption === "radio1"}
              onChange={handleOptionChange}
            />
            <Form.Check
              type="radio"
              id="radio2"
              name="radio"
              label="Radio 2"
              value="radio2"
              checked={selectedOption === "radio2"}
              onChange={handleOptionChange}
            />
          </div>
        </Form.Group>
      </div>

      <div>
        <Nav.Link href="#">Hyperlink</Nav.Link>
      </div> */}
    </div>
  );
}

export default CustomComponent;
