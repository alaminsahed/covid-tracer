import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { findAllByDisplayValue } from "@testing-library/react";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries?sort=country"),
      ])
      .then((res) => {
        setLatest(res[0].data);
        setResults(res[1].data);
      });
  }, []);

  const date = new Date(); //build in function of current date and time
  const lastUpdated = date.toString();

  const filterCountry = results.filter((data) => {
    return searchCountry === ""
      ? data
      : data.country.toLowerCase().includes(searchCountry.toLowerCase());
  });

  const countries = filterCountry.map((data, i) => {
    return (
      <Card
        key={i}
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>

          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Recover {data.recovered}</Card.Text>
          <Card.Text>Today Cases {data.todayCases}</Card.Text>
          <Card.Text>Today Recover {data.todayRecovered}</Card.Text>
          <Card.Text>Today Death {data.todayDeaths}</Card.Text>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    );
  });

  return (
    <div className="container">
      <h1 text="center"> Covid Tracer</h1>
      <CardDeck>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Death</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recover</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search Your Country"
            onChange={(e) => {
              setSearchCountry(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <CardColumns>{countries}</CardColumns>
    </div>
  );
}

export default App;
